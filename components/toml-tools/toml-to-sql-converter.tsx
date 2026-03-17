"use client";

import React, { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Download, Copy, RotateCcw, Database } from "lucide-react";

const TomlToSqlConverter: React.FC = () => {
  const [tomlInput, setTomlInput] = useState("");
  const [sqlOutput, setSqlOutput] = useState("");
  const [tableName, setTableName] = useState("configurations");
  const [dialect, setDialect] = useState<"mysql" | "postgresql" | "sqlite">("mysql");
  const [converted, setConverted] = useState(false);

  const sampleToml = `app_name = "My Application"
version = "1.0.0"
debug = true

[database]
host = "localhost"
port = 5432
username = "admin"
password = "secret"

[features]
max_users = 100
timeout = 30`;

  const convertTomlToSql = (input: string): string => {
    const lines = input.split("\n");
    const columns: { name: string; type: string; value: string; section: string }[] = [];
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
        const sqlType = tomlValueToSqlType(value);
        columns.push({
          name: currentSection ? `${currentSection}_${key}` : key,
          type: sqlType,
          value: value,
          section: currentSection,
        });
      }
    });

    let sql = "";
    
    if (dialect === "mysql") {
      sql += `-- MySQL Schema\n`;
      sql += `CREATE TABLE \`${tableName}\` (\n`;
      sql += `  \`id\` INT AUTO_INCREMENT PRIMARY KEY,\n`;
      columns.forEach((col, i) => {
        const comma = i < columns.length - 1 ? "," : "";
        sql += `  \`${col.name}\` ${col.type}${comma}\n`;
      });
      sql += `);\n\n`;
      sql += `-- Insert sample data\n`;
      sql += `INSERT INTO \`${tableName}\` (`;
      sql += columns.map(c => `\`${c.name}\``).join(", ");
      sql += `) VALUES (\n  `;
      sql += columns.map(c => tomlValueToSqlValue(c.value, c.type)).join(", ");
      sql += `);\n`;
    } else if (dialect === "postgresql") {
      sql += `-- PostgreSQL Schema\n`;
      sql += `CREATE TABLE ${tableName} (\n`;
      sql += `  id SERIAL PRIMARY KEY,\n`;
      columns.forEach((col, i) => {
        const comma = i < columns.length - 1 ? "," : "";
        sql += `  ${col.name} ${col.type}${comma}\n`;
      });
      sql += `);\n\n`;
      sql += `-- Insert sample data\n`;
      sql += `INSERT INTO ${tableName} (`;
      sql += columns.map(c => c.name).join(", ");
      sql += `) VALUES (\n  `;
      sql += columns.map(c => tomlValueToSqlValue(c.value, c.type)).join(", ");
      sql += `);\n`;
    } else {
      sql += `-- SQLite Schema\n`;
      sql += `CREATE TABLE ${tableName} (\n`;
      sql += `  id INTEGER PRIMARY KEY AUTOINCREMENT,\n`;
      columns.forEach((col, i) => {
        const comma = i < columns.length - 1 ? "," : "";
        sql += `  ${col.name} ${col.type}${comma}\n`;
      });
      sql += `);\n\n`;
      sql += `-- Insert sample data\n`;
      sql += `INSERT INTO ${tableName} (`;
      sql += columns.map(c => c.name).join(", ");
      sql += `) VALUES (\n  `;
      sql += columns.map(c => tomlValueToSqlValue(c.value, c.type)).join(", ");
      sql += `);\n`;
    }

    return sql;
  };

  const tomlValueToSqlType = (value: string): string => {
    if (value === "true" || value === "false") {
      return dialect === "mysql" ? "BOOLEAN" : "BOOLEAN";
    }
    if (/^-?\d+$/.test(value)) {
      return "INT";
    }
    if (/^-?\d+\.\d+$/.test(value)) {
      return "DECIMAL(10,2)";
    }
    return dialect === "mysql" ? "VARCHAR(255)" : "TEXT";
  };

  const tomlValueToSqlValue = (value: string, type: string): string => {
    if (value === "true" || value === "false") return value;
    if (/^-?\d+$/.test(value) || /^-?\d+\.\d+$/.test(value)) return value;
    return `'${value.replace(/^"|"$/g, "").replace(/'/g, "''")}'`;
  };

  const handleConvert = useCallback(() => {
    if (!tomlInput.trim()) return;
    
    const sql = convertTomlToSql(tomlInput);
    setSqlOutput(sql);
    setConverted(true);
  }, [tomlInput]);

  const handleClear = useCallback(() => {
    setTomlInput("");
    setSqlOutput("");
    setTableName("configurations");
    setDialect("mysql");
    setConverted(false);
  }, []);

  const handleCopy = useCallback(() => {
    if (sqlOutput) {
      navigator.clipboard.writeText(sqlOutput);
    }
  }, [sqlOutput]);

  const handleDownload = useCallback(() => {
    if (!sqlOutput) return;
    
    const blob = new Blob([sqlOutput], { type: "text/plain" });
    const link = document.createElement("a");
    link.download = `${tableName}.sql`;
    link.href = URL.createObjectURL(blob);
    link.click();
  }, [sqlOutput, tableName]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="w-5 h-5" />
            TOML to SQL Converter
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
                  <Label htmlFor="tableName" className="text-xs">Table Name</Label>
                  <Input
                    id="tableName"
                    value={tableName}
                    onChange={(e) => setTableName(e.target.value)}
                    placeholder="configurations"
                  />
                </div>

                <div>
                  <Label className="text-xs">SQL Dialect</Label>
                  <select
                    value={dialect}
                    onChange={(e) => setDialect(e.target.value as "mysql" | "postgresql" | "sqlite")}
                    className="w-full p-2 border rounded-md"
                  >
                    <option value="mysql">MySQL</option>
                    <option value="postgresql">PostgreSQL</option>
                    <option value="sqlite">SQLite</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2 mt-4">
                <Label>Output</Label>
                <Textarea
                  value={sqlOutput}
                  readOnly
                  placeholder="SQL output will appear here..."
                  rows={15}
                  className="font-mono text-sm"
                />
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <Button onClick={handleConvert} disabled={!tomlInput.trim()}>
              <Database className="w-4 h-4 mr-2" />
              Convert to SQL
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

export default TomlToSqlConverter;
