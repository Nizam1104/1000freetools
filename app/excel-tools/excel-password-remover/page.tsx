import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import ExcelPasswordRemover from "@/components/excel-tools/excel-password-remover";
import ExcelPasswordRemoverSeo from "@/components/seo-content/excel-tools/excel-password-remover";

export const metadata: Metadata = {
  title: `Remove Excel Password Protection | Free Unlock Tool`,
  description: `Unlock password-protected Excel sheets for editing. Remove read-only or sheet protection from .xlsx/.xls files. Secure, client-side processing.`,
  alternates: {
    canonical: `https://1000freetools.com/excel-tools/excel-password-remover`,
  },
};

const tools = [
  {
    name: `Excel to PDF Converter`,
    description: `Convert Excel to PDF Online for Free`,
    href: `/excel-tools/excel-to-pdf-converter`,
  },
  {
    name: `CSV to Excel Converter`,
    description: `Convert CSV to Excel Spreadsheet Online`,
    href: `/excel-tools/csv-to-excel-converter`,
  },
  {
    name: `Excel Formula Generator`,
    description: `Generate Excel Formulas from Plain English`,
    href: `/excel-tools/excel-formula-generator`,
  },


  {
    name: `ASCII to Hex Converter`,
    description: `ASCII to Hex Converter: Text to Hexadecimal Translator`,
    href: `/ascii-tools/ascii-to-hex-converter`,
  },
  {
    name: `Barcode Generator`,
    description: `Free Barcode Generator`,
    href: `/barcode-tools/barcode-generator`,
  },
  {
    name: `Binary to Text Converter`,
    description: `Binary to Text Converter`,
    href: `/binary-tools/binary-to-text-converter`,
  },
  {
    name: `Free Printable Calendar Maker`,
    description: `Create & Print Your Custom Calendar`,
    href: `/calendar-tools/printable-calendar-maker`,
  },
  {
    name: `Pie Chart Maker`,
    description: `Free Pie Chart Maker Online`,
    href: `/chart-tools/pie-chart-maker`,
  },
];

export default function ExcelPasswordRemoverPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">
          Unlock Password Protected Excel Files
        </h1>
        <p className="text-muted-foreground">
          Forgot the password to edit your Excel sheet? Our free tool can remove
          sheet protection, letting you modify your workbook again. Your file
          never leaves your browser.
        </p>
      </header>
      <div className="mt-8">
        <ExcelPasswordRemover />
      </div>
      <div className="mt-8">
        <ExcelPasswordRemoverSeo />
      </div>
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Other Free Tools
        </h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
