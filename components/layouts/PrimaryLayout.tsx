import Footer from "@/components/layouts/Footer";
import Header from "@/components/layouts/Header";
import MeshGridBackground from "@/components/layouts/MeshGridBackground";

export default function PrimaryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen">
      <MeshGridBackground />
      <Header />
      <main className="flex-1 overflow-auto w-full flex justify-center items-center w-screen pb-2 md:pb-8 relative z-10">
        {children}
      </main>
      <Footer />
    </div>
  );
}
