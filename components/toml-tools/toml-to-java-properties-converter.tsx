"use client";

import React, { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Download, Copy, RotateCcw, Code } from "lucide-react";

const TomlToJavaPropertiesConverter: React.FC = () => {
  const [tomlInput, setTomlInput] = useState("");
  const [javaOutput, setJavaOutput] = useState("");
  const [packageName, setPackageName] = useState("com.example.config");
  const [className, setClassName] = useState("AppConfig");
  const [outputFormat, setOutputFormat] = useState<"properties" | "class">("properties");
  const [converted, setConverted] = useState(false);

  const sampleToml = `app_name = "My Java App"
version = "1.0.0"

[database]
host = "localhost"
port = 3306
username = "root"

[server]
port = 8080
debug = true`;

  const convertTomlToJava = (input: string): string => {
    const lines = input.split("\n");
    const properties: { key: string; value: string; section: string }[] = [];
    let currentSection = "";

    lines.forEach(line => {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) return;

      const sectionMatch = trimmed.match(/^\[(.+)\]$/);
      if (sectionMatch) {
        currentSection = sectionMatch[1];
        return;
      }

      const kvMatch = trimmed.match(/^([^=]+)=(.*)$/);
      if (kvMatch) {
        const key = kvMatch[1].trim();
        const value = kvMatch[2].trim();
        properties.push({
          key: currentSection ? `${currentSection}.${key}` : key,
          value: value,
          section: currentSection,
        });
      }
    });

    if (outputFormat === "properties") {
      let output = "# Java Properties File\n";
      output += `# Generated from TOML\n`;
      output += `# ${new Date().toISOString()}\n\n`;
      
      properties.forEach(prop => {
        const javaValue = tomlValueToJavaValue(prop.value);
        output += `${prop.key}=${javaValue}\n`;
      });
      
      return output;
    } else {
      let output = `package ${packageName};\n\n`;
      output += `import java.util.Properties;\n`;
      output += `import java.io.InputStream;\n`;
      output += `import java.io.IOException;\n\n`;
      output += `public class ${className} {\n`;
      output += `    private static Properties props = new Properties();\n\n`;
      output += `    static {\n`;
      output += `        try (InputStream input = ${className}.class.getClassLoader().getResourceAsStream("config.properties")) {\n`;
      output += `            props.load(input);\n`;
      output += `        } catch (IOException e) {\n`;
      output += `            e.printStackTrace();\n`;
      output += `        }\n`;
      output += `    }\n\n`;
      
      properties.forEach(prop => {
        const javaType = getJavaType(prop.value);
        const getterName = "get" + prop.key.split(".").map(s => s.charAt(0).toUpperCase() + s.slice(1)).join("");
        const defaultValue = getDefaultValue(prop.value);
        
        output += `    public static ${javaType} ${getterName}() {\n`;
        if (javaType === "String") {
          output += `        return props.getProperty("${prop.key}", "${defaultValue}");\n`;
        } else if (javaType === "boolean") {
          output += `        return Boolean.parseBoolean(props.getProperty("${prop.key}", "${defaultValue}"));\n`;
        } else {
          output += `        return ${javaType}.parse${javaType}(props.getProperty("${prop.key}", "${defaultValue}"));\n`;
        }
        output += `    }\n\n`;
      });
      
      output += `    public static Properties getProperties() {\n`;
      output += `        return props;\n`;
      output += `    }\n`;
      output += `}\n`;
      
      return output;
    }
  };

  const tomlValueToJavaValue = (value: string): string => {
    if (value.startsWith('"') && value.endsWith('"')) {
      return value.slice(1, -1).replace(/"/g, '\\"');
    }
    return value;
  };

  const getJavaType = (value: string): string => {
    if (value === "true" || value === "false") return "boolean";
    if (/^-?\d+$/.test(value)) return "Integer";
    if (/^-?\d+\.\d+$/.test(value)) return "Double";
    return "String";
  };

  const getDefaultValue = (value: string): string => {
    if (value === "true" || value === "false") return value;
    if (/^-?\d+$/.test(value)) return value;
    if (/^-?\d+\.\d+$/.test(value)) return value;
    if (value.startsWith('"') && value.endsWith('"')) return value.slice(1, -1);
    return value;
  };

  const handleConvert = useCallback(() => {
    if (!tomlInput.trim()) return;
    
    const java = convertTomlToJava(tomlInput);
    setJavaOutput(java);
    setConverted(true);
  }, [tomlInput]);

  const handleClear = useCallback(() => {
    setTomlInput("");
    setJavaOutput("");
    setPackageName("com.example.config");
    setClassName("AppConfig");
    setOutputFormat("properties");
    setConverted(false);
  }, []);

  const handleCopy = useCallback(() => {
    if (javaOutput) {
      navigator.clipboard.writeText(javaOutput);
    }
  }, [javaOutput]);

  const handleDownload = useCallback(() => {
    if (!javaOutput) return;
    
    const blob = new Blob([javaOutput], { type: "text/plain" });
    const link = document.createElement("a");
    link.download = outputFormat === "properties" ? "config.properties" : `${className}.java`;
    link.href = URL.createObjectURL(blob);
    link.click();
  }, [javaOutput, outputFormat, className]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code className="w-5 h-5" />
            TOML to Java Properties Converter
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="tomlInput">TOML Input</Label>
              <Textarea
                id="tomlInput"
                value={tomlInput}
                onChange={(e) => setTomlInput(e.target.value)}
                placeholder="Paste TOML content here..."
                rows={15}
              />
              <Button 
                onClick={() => setTomlInput(sampleToml)} 
                variant="outline" 
                size="sm"
              >
                Load Sample TOML
              </Button>
            </div>

            <div className="space-y-2">
              <Label>Options</Label>
              <div className="space-y-3">
                <div>
                  <Label className="text-xs">Output Format</Label>
                  <select
                    value={outputFormat}
                    onChange={(e) => setOutputFormat(e.target.value as "properties" | "class")}
                    className="w-full p-2 border rounded-md"
                  >
                    <option value="properties">Properties File</option>
                    <option value="class">Java Class</option>
                  </select>
                </div>

                {outputFormat === "class" && (
                  <>
                    <div>
                      <Label htmlFor="packageName" className="text-xs">Package Name</Label>
                      <Input
                        id="packageName"
                        value={packageName}
                        onChange={(e) => setPackageName(e.target.value)}
                        placeholder="com.example.config"
                      />
                    </div>

                    <div>
                      <Label htmlFor="className" className="text-xs">Class Name</Label>
                      <Input
                        id="className"
                        value={className}
                        onChange={(e) => setClassName(e.target.value)}
                        placeholder="AppConfig"
                      />
                    </div>
                  </>
                )}
              </div>

              <div className="space-y-2 mt-4">
                <Label>Output</Label>
                <Textarea
                  value={javaOutput}
                  readOnly
                  placeholder="Java output will appear here..."
                  rows={15}
                  className="font-mono text-sm"
                />
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <Button onClick={handleConvert} disabled={!tomlInput.trim()}>
              <Code className="w-4 h-4 mr-2" />
              Convert to Java
            </Button>
            <Button onClick={handleCopy} variant="outline" disabled={!converted}>
              <Copy className="w-4 h-4 mr-2" />
              Copy
            </Button>
            <Button onClick={handleDownload} variant="outline" disabled={!converted}>
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
            <Button onClick={handleClear} variant="outline">
              <RotateCcw className="w-4 h-4 mr-2" />
              Clear
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TomlToJavaPropertiesConverter;
