"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface FieldTypesDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelectFieldType: (fieldType: string) => void;
}

const fieldCategories = [
  {
    category: "Most Useful",
    fields: [
      { type: "Full Name" },
      { type: "Email Address" },
      { type: "Age" },
      { type: "Phone Number" },
      { type: "Street Address" },
      { type: "City" },
      { type: "State / Province" },
      { type: "Postal Code / Zip Code" },
      { type: "Country" },
      { type: "Company Name" },
      { type: "Job Title" },
      { type: "Username" },
      { type: "Password" },
      { type: "URL" },
      { type: "IP Address v4" },
      { type: "Datetime" },
      { type: "Date (Past)" },
      { type: "Date (Future)" },
      { type: "Boolean" },
      { type: "Number (Integer / Float)" },
      { type: "Product Name" },
      { type: "Product Price" },
      { type: "Money Amount" },
      { type: "Credit Card Number" },
      { type: "Word" },
      { type: "Sentence" },
      { type: "Paragraph" },
      { type: "GUID / UUID" },
      { type: "File Name" },
      { type: "Database Column Name" },
    ],
  },
  {
    category: "Personal & Identity",
    fields: [
      { type: "First Name" },
      { type: "Last Name" },
      { type: "Full Name" },
      { type: "Gender" },
      { type: "Title (Mr/Ms/Dr)" },
      { type: "Suffix (Jr/Sr/III)" },
      { type: "Job Title" },
      { type: "Username" },
      { type: "Password" },
      { type: "GUID / UUID" },
      { type: "Phone Number" },
    ],
  },
  {
    category: "Contact & Digital Presence",
    fields: [
      { type: "Email Address" },
      { type: "Domain Name" },
      { type: "Top Level Domain (TLD)" },
      { type: "URL" },
      { type: "IP Address v4" },
      { type: "IP Address v6" },
      { type: "MAC Address" },
      { type: "User Agent" },
      { type: "Avatar Image URL" },
      { type: "Dummy Image URL" },
    ],
  },
  {
    category: "Address & Location",
    fields: [
      { type: "Street Address" },
      { type: "Street Name" },
      { type: "Street Number" },
      { type: "Address Line 2 (Room/Apt/Floor/Suite)" },
      { type: "City" },
      { type: "State / Province" },
      { type: "State / Province Abbreviation" },
      { type: "Postal Code / Zip Code" },
      { type: "Country" },
      { type: "Country Code (Alpha-2)" },
      { type: "Latitude" },
      { type: "Longitude" },
      { type: "Time Zone" },
    ],
  },
  {
    category: "Business & Professional",
    fields: [
      { type: "Company Name" },
      { type: "Buzzword" },
      { type: "Catch Phrase" },
      { type: "Slogan" },
    ],
  },
  {
    category: "Commerce & Products",
    fields: [
      { type: "Product Name" },
      { type: "Product Price" },
      { type: "Product Description" },
      { type: "Product Category" },
      { type: "ISBN" },
    ],
  },
  {
    category: "Finance & Banking",
    fields: [
      { type: "Bank Name" },
      { type: "Money Amount" },
      { type: "Currency" },
      { type: "Currency Code" },
      { type: "Credit Card Number" },
      { type: "Credit Card Type" },
      { type: "Bank SWIFT BIC" },
      { type: "IBAN" },
      { type: "Bank Routing Number (US)" },
      { type: "Bitcoin Address" },
      { type: "Ethereum Address" },
    ],
  },
  {
    category: "Time & Date",
    fields: [
      { type: "Datetime" },
      { type: "Time" },
      { type: "Date (Past)" },
      { type: "Date (Future)" },
      { type: "Birthdate" },
    ],
  },
  {
    category: "Text & Content",
    fields: [
      { type: "Word" },
      { type: "Sentence" },
      { type: "Paragraph" },
      { type: "Hacker Phrase" },
    ],
  },
  {
    category: "Data Types & Generics",
    fields: [
      { type: "Boolean" },
      { type: "Number (Integer / Float)" },
      { type: "Character Sequence" },
      { type: "Digit Sequence" },
      { type: "Hexadecimal String" },
      { type: "Random Element from Array" },
      { type: "Template String (Formula-like)" },
      { type: "MD5 Hash" },
      { type: "SHA1 Hash" },
      { type: "SHA256 Hash" },
    ],
  },
  {
    category: "System & Files",
    fields: [
      { type: "File Name" },
      { type: "File Extension" },
      { type: "MIME Type" },
      { type: "App Version (Semantic Versioning)" },
    ],
  },
  {
    category: "Vehicles",
    fields: [
      { type: "Car Make (Manufacturer)" },
      { type: "Car Model" },
      { type: "Car VIN" },
      { type: "Car Type" },
      { type: "Car Color" },
    ],
  },
  {
    category: "Animals",
    fields: [
      { type: "Animal Type" },
      { type: "Animal Common Name (Specific)" },
    ],
  },
  {
    category: "Colors",
    fields: [
      { type: "Color Name" },
      { type: "Hex Color" },
      { type: "RGB Color" },
      { type: "RGBA Color" },
    ],
  },
  {
    category: "Music",
    fields: [{ type: "Song Name" }, { type: "Music Genre" }],
  },
  {
    category: "Development & Database",
    fields: [{ type: "Database Column Name" }, { type: "Database Type" }],
  },
];

export default function FieldTypesDialog({
  open,
  onOpenChange,
  onSelectFieldType,
}: FieldTypesDialogProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredCategories = fieldCategories
    .map((category) => ({
      ...category,
      fields: category.fields.filter((field) =>
        field.type.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    }))
    .filter((category) => category.fields.length > 0);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[95vw] sm:max-w-[90vw] lg:max-w-[80vw] max-h-[90vh] sm:max-h-[85vh] flex flex-col p-4 sm:p-6">
        <DialogHeader>
          <DialogTitle>Select Field Type</DialogTitle>
        </DialogHeader>

        <div className="flex gap-4 overflow-hidden flex-1">
          {/* Left Sidebar - Categories */}
          <div className="w-36 sm:w-44 lg:w-48 flex-shrink-0 border-r pr-2 sm:pr-4 hidden md:block overflow-y-auto">
            <div className="flex flex-col gap-1">
              <Button
                variant={selectedCategory === null ? "default" : "ghost"}
                size="sm"
                onClick={() => setSelectedCategory(null)}
                className="justify-start"
              >
                All Fields
              </Button>
              {fieldCategories.map((category) => (
                <Button
                  key={category.category}
                  variant={
                    selectedCategory === category.category ? "default" : "ghost"
                  }
                  size="sm"
                  onClick={() => setSelectedCategory(category.category)}
                  className="justify-start text-xs"
                >
                  {category.category}
                </Button>
              ))}
            </div>
          </div>

          {/* Right Content */}
          <div className="flex flex-col gap-4 overflow-hidden flex-1 w-full">
            {/* Search */}
            <div className="relative flex-shrink-0">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search field types..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Content */}
            <ScrollArea className="flex-1 overflow-auto">
              <div className="space-y-4 pr-4">
                {(selectedCategory === null
                  ? filteredCategories
                  : filteredCategories.filter(
                      (c) => c.category === selectedCategory,
                    )
                ).map((category, index) => (
                  <div key={category.category}>
                    {index > 0 && <Separator className="mb-4" />}
                    <h3 className="font-semibold mb-3 text-sm uppercase tracking-wide text-muted-foreground">
                      {category.category}
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-2">
                      {category.fields.map((field) => (
                        <Badge
                          key={field.type}
                          variant="secondary"
                          className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors p-2 text-sm justify-start"
                          onClick={() => {
                            onSelectFieldType(field.type);
                            onOpenChange(false);
                          }}
                        >
                          {field.type}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
