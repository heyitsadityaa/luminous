"use client";

import { useRouter } from "next/navigation";
import { Lock, Eye, ArrowRight } from "lucide-react";
import Navbar from "@/components/navbar";

export default function Home() {
  const router = useRouter();

  const setRoleAndRedirect = async (role: "viewer" | "admin") => {
    localStorage.setItem("ledger-role", role);

    const cookieStore = (
      window as unknown as {
        cookieStore?: {
          set: (options: {
            name: string;
            value: string;
            path: string;
          }) => Promise<void>;
        };
      }
    ).cookieStore;

    if (cookieStore) {
      await cookieStore.set({
        name: "ledger-role",
        value: role,
        path: "/",
      });
    }

    router.push("/dashboard");
  };

  const signInAsViewer = async () => {
    await setRoleAndRedirect("viewer");
  };

  const signInAsAdmin = async () => {
    await setRoleAndRedirect("admin");
  };

  return (
    <div>
      <Navbar />

      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-6">
        <div className="flex flex-col lg:flex-row gap-6 w-full mx-auto max-w-4xl">
          {/* Admin Card */}
          <button
            type="button"
            onClick={signInAsAdmin}
            className="group relative overflow-hidden rounded-2xl border border-border bg-card backdrop-blur-sm p-8 cursor-pointer transition-all hover:border-foreground flex-1 text-left"
          >
            <div className="flex flex-col h-full justify-between">
              <div>
                <div className="mb-6 inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary">
                  <Lock className="w-6 h-6 text-black" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Sign in as Admin</h3>
                <p className="text-sm text-muted-foreground">
                  Full-access to Transaction details, Portfolio Performance and Market Insights.
                </p>
              </div>
              <div className="flex items-center gap-2 mt-6 text-foreground font-medium text-sm group-hover:gap-3 transition-all">
                ENTER DASHBOARD
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </button>

          {/* Viewer Card */}
          <button
            type="button"
            onClick={signInAsViewer}
            className="group relative overflow-hidden rounded-2xl border border-border bg-card backdrop-blur-sm p-8 cursor-pointer transition-all hover:border-foreground flex-1 text-left"
          >
            <div className="flex flex-col h-full justify-between">
              <div>
                <div className="mb-6 inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary">
                  <Eye className="w-6 h-6 text-black" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Sign in as Viewer</h3>
                <p className="text-sm text-muted-foreground">
                  Read-only access to Transaction details, Portfolio Performance and Market Insights.
                </p>
              </div>
              <div className="flex items-center gap-2 mt-6 text-foreground font-medium text-sm group-hover:gap-3 transition-all">
                ENTER DASHBOARD
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

