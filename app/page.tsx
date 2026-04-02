import Navbar from "@/components/navbar";

export default function Home() {
  return (
    <div className="">
      <Navbar />

      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center">
        <div className="flex flex-col w-full max-w-2xl gap-8 px-6">
          <button type="button" className="flex-1 rounded-md border border-border bg-background px-6 py-4 text-base font-medium shadow-sm transition hover:bg-accent">
            Sign in as Viewer
          </button>
          <button type="button" className="flex-1 rounded-md bg-primary px-6 py-4 text-base font-semibold text-black shadow-sm transition hover:opacity-80">
            Sign in as Admin
          </button>
        </div>
      </div>
    </div>
  );
}
