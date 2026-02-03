import Footer from "@/components/layouts/Footer";
import Header from "@/components/layouts/Header";

export default function PrimaryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <div className="flex-1 overflow-auto w-full flex justify-center items-center">
        {children}
      </div>
      <Footer />
    </>
  );
}
