import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Image Compressor - Reduce File Size Without Losing Quality",
  description:
    "Looking to compress your images without sacrificing quality? Our free online image compressor is here, supports many image formats.",
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

      <div className="w-full">{children}</div>
    </div>
  );
}
