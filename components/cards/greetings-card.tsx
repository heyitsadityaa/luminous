import { Card, CardHeader } from "../ui/card";
import { cn } from "@/lib/utils";

const GreetingsCard = ({ className }: { className?: string }) => {
  const currentMonthYear = new Intl.DateTimeFormat("en-IN", {
    month: "long",
    year: "numeric",
  }).format(new Date());

  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good Morning" : hour < 17 ? "Good Afternoon" : "Good Evening";

  return (
    <Card
      className={cn("relative overflow-hidden border-border py-6", className)}
    >
      {/* background grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "radial-gradient(circle, currentColor 1px, transparent 1px)",
          backgroundSize: "18px 18px",
        }}
      />

      {/* lime glow blobs */}
      <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-primary opacity-10 blur-2xl" />
      <div className="absolute -bottom-8 -left-8 w-28 h-28 rounded-full bg-primary opacity-5 blur-xl" />

      {/* corner brackets */}
      <div className="absolute top-3 right-3 w-5 h-5 border-t-2 border-r-2 border-primary opacity-40 rounded-tr-sm" />
      <div className="absolute bottom-3 left-3 w-5 h-5 border-b-2 border-l-2 border-primary opacity-40 rounded-bl-sm" />

      <CardHeader className="pb-2 relative z-10">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-0.5">
            <span className="text-xs uppercase tracking-widest text-muted-foreground font-medium">
              {greeting},
            </span>
            <h2 className="text-2xl tracking-wide font-bold leading-none">
              Welcome, Aditya
            </h2>
          </div>

          <div className="flex items-center gap-2 rounded-full border border-border bg-muted/50 px-3 py-1.5 shrink-0">
            <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            <span className="text-xs font-medium text-muted-foreground">
              {currentMonthYear}
            </span>
          </div>
        </div>
      </CardHeader>

      {/* <CardContent className="relative z-10 pt-0">
                <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
                    Let's review how your months is looking financially.
                </p>
            </CardContent> */}
    </Card>
  );
};

export default GreetingsCard;
