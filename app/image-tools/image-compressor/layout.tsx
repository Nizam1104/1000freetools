import { Metadata } from "next";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export const metadata: Metadata = {
  title: "Free Image Compressor - Reduce File Size Without Losing Quality",
  description:
    "Looking to compress your images without sacrificing quality? Our free online image compressor is here, supports many image formats.",
  keywords: [
    "image compressor",
    "free image compressor online",
    "image comprssor online",
    "photo comressor",
    "jpg compressor online",
    "png compressor online",
    "image compress to 100kb",
    "Free jpg compressor",
    "avif image compressor",
  ],
  alternates: {
    canonical: "https://1000freetools.com/image-tools/image-compressor",
  },
};
export default function ImageCompressorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full p-1 sm:p-2 md:p-3 lg:p-4">
      <div>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/image-tools">Image Tools</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/image-tools/image-compressor">
                Image Compressor
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="w-full">{children}</div>
    </div>
  );
}
