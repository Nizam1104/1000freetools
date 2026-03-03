'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Editor, { EditorProps } from '@monaco-editor/react';
import type * as monaco from 'monaco-editor';
import { Play, RotateCcw, Copy, Check, Download, Trash2, Terminal, Save, FolderOpen, Maximize2, Minimize2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Faqs from '@/components/utils/Faqs';
import ToolLinkCards from '@/components/utils/ToolLinkCards';

const relatedTools = [
  {
    name: "JSON Formatter",
    description: "Format and validate JSON online",
    href: "/developer-tools/json-formatter",
  },
  {
    name: "Base64 Encoder Decoder",
    description: "Encode and decode Base64 strings",
    href: "/developer-tools/base64-encoder-decoder",
  },
  {
    name: "Regex Tester",
    description: "Test and debug regular expressions",
    href: "/developer-tools/regex-tester",
  },
];

interface ConsoleOutput {
  type: 'log' | 'error' | 'warn' | 'info';
  content: string;
  timestamp: number;
}

interface SavedCode {
  id: string;
  code: string;
  name: string;
  createdAt: number;
}

const defaultCode = `// Welcome to JS Playground 🚀
// Write your JavaScript code here and click Run

const greeting = "Hello, World!";
console.log(greeting);

// Try async/await
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
await delay(100);
console.log('Async completed!');
`;

export default function JSOnlineCompiler() {
  const [code, setCode] = useState<string>(defaultCode);
  const [output, setOutput] = useState<ConsoleOutput[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [copied, setCopied] = useState(false);
  const [savedSnippets, setSavedSnippets] = useState<SavedCode[]>([]);
  const [snippetName, setSnippetName] = useState('');
  const [showSaveInput, setShowSaveInput] = useState(false);
  const [activeTab, setActiveTab] = useState<'console' | 'snippets'>('console');
  const [isFullscreen, setIsFullscreen] = useState(false);

  const consoleRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);

  // Load saved snippets from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('js-playground-snippets');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setSavedSnippets(parsed);
      } catch {
        console.error('Failed to load snippets');
      }
    }
  }, []);

  // Auto-scroll console
  useEffect(() => {
    if (consoleRef.current) {
      consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
    }
  }, [output]);

  const captureConsole = useCallback(() => {
    const originalLog = console.log;
    const originalError = console.error;
    const originalWarn = console.warn;
    const originalInfo = console.info;

    const createWriter = (type: ConsoleOutput['type']) => {
      return (...args: unknown[]) => {
        const content = args.map(arg => {
          if (typeof arg === 'object' && arg !== null) {
            try {
              return JSON.stringify(arg, null, 2);
            } catch {
              return String(arg);
            }
          }
          return String(arg);
        }).join(' ');

        setOutput(prev => [...prev, {
          type,
          content,
          timestamp: Date.now()
        }]);
      };
    };

    console.log = createWriter('log');
    console.error = createWriter('error');
    console.warn = createWriter('warn');
    console.info = createWriter('info');

    return () => {
      console.log = originalLog;
      console.error = originalError;
      console.warn = originalWarn;
      console.info = originalInfo;
    };
  }, []);

  const runCode = useCallback(async () => {
    setIsRunning(true);
    setOutput([]);

    const restoreConsole = captureConsole();

    try {
      const asyncFn = new Function('return (async () => {\n' + code + '\n})()');
      const result = await asyncFn();

      if (result !== undefined) {
        setOutput(prev => [...prev, {
          type: 'info',
          content: `→ ${String(result)}`,
          timestamp: Date.now()
        }]);
      }
    } catch (error) {
      setOutput(prev => [...prev, {
        type: 'error',
        content: error instanceof Error ? error.message : String(error),
        timestamp: Date.now()
      }]);
    } finally {
      restoreConsole();
      setIsRunning(false);
    }
  }, [code, captureConsole]);

  const clearConsole = () => {
    setOutput([]);
  };

  const copyCode = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadCode = () => {
    const blob = new Blob([code], { type: 'text/javascript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'snippet.js';
    a.click();
    URL.revokeObjectURL(url);
  };

  const saveSnippet = () => {
    if (!snippetName.trim()) return;

    const newSnippet: SavedCode = {
      id: Date.now().toString(),
      code,
      name: snippetName.trim(),
      createdAt: Date.now()
    };

    const updated = [newSnippet, ...savedSnippets];
    setSavedSnippets(updated);
    localStorage.setItem('js-playground-snippets', JSON.stringify(updated));
    setSnippetName('');
    setShowSaveInput(false);
  };

  const loadSnippet = (snippet: SavedCode) => {
    setCode(snippet.code);
    setActiveTab('console');
  };

  const deleteSnippet = (id: string) => {
    const updated = savedSnippets.filter(s => s.id !== id);
    setSavedSnippets(updated);
    localStorage.setItem('js-playground-snippets', JSON.stringify(updated));
  };

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const handleEditorMount = (editor: monaco.editor.IStandaloneCodeEditor) => {
    editorRef.current = editor;

    editor.updateOptions({
      minimap: { enabled: false },
      fontSize: 14,
      lineNumbers: 'on',
      automaticLayout: true,
      scrollBeyondLastLine: false,
      padding: { top: 16, bottom: 16 },
      renderWhitespace: 'none',
      wordWrap: 'on',
      tabSize: 2,
      bracketPairColorization: { enabled: true },
      suggestOnTriggerCharacters: true,
      quickSuggestions: {
        other: true,
        comments: false,
        strings: false,
      },
    });
  };

  const editorOptions: EditorProps['options'] = {
    minimap: { enabled: false },
    fontSize: 14,
    lineNumbers: 'on',
    automaticLayout: true,
    scrollBeyondLastLine: false,
    renderWhitespace: 'none',
    wordWrap: 'on',
    tabSize: 2,
    bracketPairColorization: { enabled: true },
    suggestOnTriggerCharacters: true,
    quickSuggestions: {
      other: true,
      comments: false,
      strings: false,
    },
  };

  return (
    <div className={`${isFullscreen ? 'fixed inset-0 z-50 bg-background' : 'min-h-screen bg-background'} w-screen`}>
      <div className={`${isFullscreen ? 'h-screen p-0' : 'mx-auto py-8'} w-screen`}>
        {!isFullscreen && (
          <div className="mb-6">
            <h1 className="text-3xl font-semibold mb-2">JavaScript Online Compiler</h1>
            <p className="text-muted-foreground">
              Write, run, and test JavaScript code directly in your browser
            </p>
          </div>
        )}

        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'console' | 'snippets')} className={`${isFullscreen ? 'hidden' : 'space-y-4'}`}>
          <TabsList>
            <TabsTrigger value="console">Console</TabsTrigger>
            <TabsTrigger value="snippets">
              Saved Snippets
              {savedSnippets.length > 0 && (
                <span className="ml-1.5 px-1.5 py-0.5 text-xs bg-primary text-primary-foreground rounded-full">
                  {savedSnippets.length}
                </span>
              )}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="console" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Editor Panel */}
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">Code Editor</CardTitle>
                    <div className="flex items-center gap-2">
                      <Button
                        onClick={runCode}
                        disabled={isRunning}
                        className="w-fit"
                      >
                        {isRunning ? (
                          <>
                            <RotateCcw className="w-4 h-4 animate-spin" />
                            Running...
                          </>
                        ) : (
                          <>
                            <Play className="w-4 h-4" />
                            Run Code
                          </>
                        )}
                      </Button>
                      <Button
                        variant="ghost"
                        size="xs"
                        onClick={toggleFullscreen}
                        title="Fullscreen mode"
                      >
                        <Maximize2 className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="xs"
                        onClick={copyCode}
                      >
                        {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                        {copied ? 'Copied' : 'Copy'}
                      </Button>
                      <Button
                        variant="ghost"
                        size="xs"
                        onClick={downloadCode}
                      >
                        <Download className="w-3.5 h-3.5" />
                        Download
                      </Button>
                      <Button
                        variant="ghost"
                        size="xs"
                        onClick={() => setShowSaveInput(!showSaveInput)}
                      >
                        <Save className="w-3.5 h-3.5" />
                        Save
                      </Button>
                    </div>
                  </div>

                  {showSaveInput && (
                    <div className="flex items-center gap-2 mt-3">
                      <Input
                        value={snippetName}
                        onChange={(e) => setSnippetName(e.target.value)}
                        placeholder="Snippet name..."
                        onKeyDown={(e) => e.key === 'Enter' && saveSnippet()}
                        className="flex-1 h-8"
                        autoFocus
                      />
                      <Button size="sm" onClick={saveSnippet}>Save</Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setShowSaveInput(false);
                          setSnippetName('');
                        }}
                      >
                        Cancel
                      </Button>
                    </div>
                  )}
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="h-[500px] border rounded-md overflow-hidden">
                    <Editor
                      height="100%"
                      language="javascript"
                      theme="vs-dark"
                      value={code}
                      onChange={(value) => setCode(value || '')}
                      onMount={handleEditorMount}
                      options={editorOptions}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Output Panel */}
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Terminal className="w-4 h-4 text-muted-foreground" />
                      <CardTitle className="text-base">Console Output</CardTitle>
                      {output.length > 0 && (
                        <span className="px-2 py-0.5 text-xs bg-muted text-muted-foreground rounded-full">
                          {output.length}
                        </span>
                      )}
                    </div>
                    <Button
                      variant="ghost"
                      size="xs"
                      onClick={clearConsole}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      Clear
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div
                    ref={consoleRef}
                    className="h-[500px] border rounded-md bg-muted p-4 overflow-y-auto font-mono text-sm"
                  >
                    {output.length === 0 ? (
                      <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
                        <Terminal className="w-12 h-12 mb-3 opacity-30" />
                        <p className="text-sm">Run your code to see output here</p>
                      </div>
                    ) : (
                      <div className="space-y-1">
                        {output.map((item, index) => (
                          <div
                            key={index}
                            className="flex items-start gap-3 py-1.5 px-2 rounded hover:bg-accent/50 transition-colors"
                          >
                            <span className="flex-shrink-0 text-xs text-muted-foreground">
                              {formatTime(item.timestamp)}
                            </span>
                            <span className={`flex-shrink-0 ${
                              item.type === 'error' ? 'text-destructive' :
                              item.type === 'warn' ? 'text-yellow-500 dark:text-yellow-400' :
                              item.type === 'info' ? 'text-accent-foreground' :
                              'text-muted-foreground'
                            }`}>
                              {item.type === 'error' ? '✕' : item.type === 'warn' ? '⚠' : item.type === 'info' ? 'ℹ' : '●'}
                            </span>
                            <pre className={`flex-1 whitespace-pre-wrap break-words ${
                              item.type === 'error' ? 'text-destructive' :
                              item.type === 'warn' ? 'text-yellow-500 dark:text-yellow-400' :
                              item.type === 'info' ? 'text-accent-foreground' :
                              'text-foreground'
                            }`}>
                              {item.content}
                            </pre>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="mt-3 p-3 bg-muted rounded-md text-xs text-muted-foreground">
                    <div className="flex items-center gap-4">
                      <span>💡 Supports async/await</span>
                      <span>•</span>
                      <span>ES6+ syntax supported</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="snippets" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Saved Snippets</CardTitle>
                <CardDescription>
                  Your saved code snippets are stored locally in your browser
                </CardDescription>
              </CardHeader>
              <CardContent>
                {savedSnippets.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
                    <FolderOpen className="w-12 h-12 mb-3 opacity-30" />
                    <p>No saved snippets yet</p>
                    <p className="text-sm mt-1">Save your code from the editor to see it here</p>
                  </div>
                ) : (
                  <div className="grid gap-2">
                    {savedSnippets.map((snippet) => (
                      <div
                        key={snippet.id}
                        className="flex items-center justify-between p-4 border rounded-md hover:bg-accent/50 transition-colors"
                      >
                        <button
                          onClick={() => loadSnippet(snippet)}
                          className="flex-1 text-left"
                        >
                          <div className="font-medium text-sm text-foreground">
                            {snippet.name}
                          </div>
                          <div className="text-xs text-muted-foreground mt-1">
                            {new Date(snippet.createdAt).toLocaleDateString()} {formatTime(snippet.createdAt)}
                          </div>
                        </button>
                        <Button
                          variant="ghost"
                          size="icon-xs"
                          onClick={() => deleteSnippet(snippet.id)}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {!isFullscreen && (
          <div className="max-w-4xl mx-auto mt-12 space-y-12 px-4">
            {/* Intro Section */}
            <section>
              <p className="text-muted-foreground leading-relaxed">
                Need to test a quick JavaScript function but don't want to fire up your entire development environment? This JavaScript online compiler lets you write, run, and debug code instantly in your browser. No installation, no setup, no sign-up required. Everything runs locally on your machine, so your code never leaves your browser.
              </p>
            </section>

            {/* How It Works */}
            <section>
              <h2 className="text-2xl font-semibold mb-4">How to Use This JavaScript Compiler</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  <strong className="text-foreground">Step 1:</strong> Write your JavaScript code in the editor on the left. You get full IntelliSense, syntax highlighting, and error detection powered by Monaco Editor.
                </p>
                <p>
                  <strong className="text-foreground">Step 2:</strong> Click the "Run Code" button or use the keyboard shortcut to execute your code instantly.
                </p>
                <p>
                  <strong className="text-foreground">Step 3:</strong> Check the console output panel on the right to see results, logs, errors, and warnings in real time.
                </p>
              </div>
            </section>

            {/* Features Section */}
            <section>
              <h2 className="text-2xl font-semibold mb-4">Why Use This Online JS Editor?</h2>
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <h3 className="font-medium text-lg mb-2">No Installation Required</h3>
                  <p className="text-muted-foreground">
                    Skip the Node.js setup and package installations. Open the page and start coding immediately.
                  </p>
                </div>
                <div>
                  <h3 className="font-medium text-lg mb-2">Full ES6+ Support</h3>
                  <p className="text-muted-foreground">
                    Write modern JavaScript with async/await, arrow functions, destructuring, classes, and modules syntax.
                  </p>
                </div>
                <div>
                  <h3 className="font-medium text-lg mb-2">Real-Time Console Output</h3>
                  <p className="text-muted-foreground">
                    See console.log, console.error, console.warn, and console.info output instantly with timestamps.
                  </p>
                </div>
                <div>
                  <h3 className="font-medium text-lg mb-2">Save Snippets Locally</h3>
                  <p className="text-muted-foreground">
                    Store code snippets in your browser's localStorage for quick access later. They persist between sessions.
                  </p>
                </div>
                <div>
                  <h3 className="font-medium text-lg mb-2">Privacy First</h3>
                  <p className="text-muted-foreground">
                    Your code runs entirely in your browser. Nothing is sent to servers or stored remotely.
                  </p>
                </div>
                <div>
                  <h3 className="font-medium text-lg mb-2">VS Code Experience</h3>
                  <p className="text-muted-foreground">
                    Powered by Monaco Editor, you get the same IntelliSense and syntax highlighting as VS Code.
                  </p>
                </div>
              </div>
            </section>

            {/* FAQ Section */}
            <section>
              <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
              <Faqs
                faqs={[
                  {
                    question: "Is this JavaScript compiler free to use?",
                    answer: "Yes, this JavaScript online compiler is completely free. No sign-up, no limits, and it runs entirely in your browser."
                  },
                  {
                    question: "Do I need to install anything to use this JS editor?",
                    answer: "No installation required. This online JavaScript compiler runs 100% in your browser using Monaco Editor (the same engine behind VS Code)."
                  },
                  {
                    question: "Does this support async/await and ES6 features?",
                    answer: "Yes, the compiler supports modern JavaScript including async/await, arrow functions, destructuring, modules syntax, and all ES6+ features."
                  },
                  {
                    question: "Is my code saved or sent to a server?",
                    answer: "No. Your code runs locally in your browser and is never sent to any server. You can optionally save snippets to your browser's localStorage."
                  },
                  {
                    question: "Can I save my JavaScript code for later?",
                    answer: "Yes, you can save code snippets directly in the editor. They're stored in your browser's localStorage and persist between sessions."
                  }
                ]}
              />
            </section>

            {/* Related Tools */}
            <section>
              <h2 className="text-2xl font-semibold mb-6">Related Developer Tools</h2>
              <ToolLinkCards tools={relatedTools} />
            </section>
          </div>
        )}

        {isFullscreen && (
          <div className="h-full flex flex-col">
            <div className="flex flex-row h-full">
              {/* Editor Panel - 60% */}
              <Card className="rounded-none h-full border-r w-[60%]">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">Code Editor</CardTitle>
                    <div className="flex items-center gap-2">
                      <Button
                        onClick={runCode}
                        disabled={isRunning}
                        className="w-fit"
                      >
                        {isRunning ? (
                          <>
                            <RotateCcw className="w-4 h-4 animate-spin" />
                            Running...
                          </>
                        ) : (
                          <>
                            <Play className="w-4 h-4" />
                            Run Code
                          </>
                        )}
                      </Button>
                      <Button
                        variant="ghost"
                        size="xs"
                        onClick={toggleFullscreen}
                        title="Exit fullscreen"
                      >
                        <Minimize2 className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="xs"
                        onClick={copyCode}
                      >
                        {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                        {copied ? 'Copied' : 'Copy'}
                      </Button>
                      <Button
                        variant="ghost"
                        size="xs"
                        onClick={downloadCode}
                      >
                        <Download className="w-3.5 h-3.5" />
                        Download
                      </Button>
                      <Button
                        variant="ghost"
                        size="xs"
                        onClick={() => setShowSaveInput(!showSaveInput)}
                      >
                        <Save className="w-3.5 h-3.5" />
                        Save
                      </Button>
                    </div>
                  </div>

                  {showSaveInput && (
                    <div className="flex items-center gap-2 mt-3">
                      <Input
                        value={snippetName}
                        onChange={(e) => setSnippetName(e.target.value)}
                        placeholder="Snippet name..."
                        onKeyDown={(e) => e.key === 'Enter' && saveSnippet()}
                        className="flex-1 h-8"
                        autoFocus
                      />
                      <Button size="sm" onClick={saveSnippet}>Save</Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setShowSaveInput(false);
                          setSnippetName('');
                        }}
                      >
                        Cancel
                      </Button>
                    </div>
                  )}
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="h-[calc(100vh-120px)] border rounded-md overflow-hidden">
                    <Editor
                      height="100%"
                      language="javascript"
                      theme="vs-dark"
                      value={code}
                      onChange={(value) => setCode(value || '')}
                      onMount={handleEditorMount}
                      options={editorOptions}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Console Panel - 40% */}
              <Card className="rounded-none h-full w-[40%]">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Terminal className="w-4 h-4 text-muted-foreground" />
                      <CardTitle className="text-base">Console Output</CardTitle>
                      {output.length > 0 && (
                        <span className="px-2 py-0.5 text-xs bg-muted text-muted-foreground rounded-full">
                          {output.length}
                        </span>
                      )}
                    </div>
                    <Button
                      variant="ghost"
                      size="xs"
                      onClick={clearConsole}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      Clear
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div
                    ref={consoleRef}
                    className="h-[calc(100vh-120px)] border rounded-md bg-muted p-4 overflow-y-auto font-mono text-sm"
                  >
                    {output.length === 0 ? (
                      <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
                        <Terminal className="w-12 h-12 mb-3 opacity-30" />
                        <p className="text-sm">Run your code to see output here</p>
                      </div>
                    ) : (
                      <div className="space-y-1">
                        {output.map((item, index) => (
                          <div
                            key={index}
                            className="flex items-start gap-3 py-1.5 px-2 rounded hover:bg-accent/50 transition-colors"
                          >
                            <span className="flex-shrink-0 text-xs text-muted-foreground">
                              {formatTime(item.timestamp)}
                            </span>
                            <span className={`flex-shrink-0 ${
                              item.type === 'error' ? 'text-destructive' :
                              item.type === 'warn' ? 'text-yellow-500 dark:text-yellow-400' :
                              item.type === 'info' ? 'text-accent-foreground' :
                              'text-muted-foreground'
                            }`}>
                              {item.type === 'error' ? '✕' : item.type === 'warn' ? '⚠' : item.type === 'info' ? 'ℹ' : '●'}
                            </span>
                            <pre className={`flex-1 whitespace-pre-wrap break-words ${
                              item.type === 'error' ? 'text-destructive' :
                              item.type === 'warn' ? 'text-yellow-500 dark:text-yellow-400' :
                              item.type === 'info' ? 'text-accent-foreground' :
                              'text-foreground'
                            }`}>
                              {item.content}
                            </pre>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
