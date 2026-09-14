import { ArrowUpRight, CirclePlay } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";

export default function Hero() {
  return (
    <section className="border-b bg-background">
      <div className="mx-auto grid min-h-[calc(100vh-4rem)] w-full max-w-7xl lg:grid-cols-2">
        <div className="flex flex-col justify-center px-8 py-16 lg:px-12">
          <Badge
            className="w-fit rounded-full border-emerald-200 bg-emerald-50 py-1 text-emerald-700"
            variant="secondary"
          >
            <Link href="/plants">
              Built for growing collections <ArrowUpRight className="ml-1 size-4" />
            </Link>
          </Badge>
          <h1 className="mt-6 max-w-[12ch] text-5xl font-semibold leading-[1.05] md:text-6xl">
            Your plants,
            <br /> beautifully organized
          </h1>
          <p className="mt-6 max-w-[50ch] text-lg leading-8 text-foreground/60 sm:text-xl">
            Keep every plant, image, price, and stock count in one calm,
            searchable workspace.
          </p>
          <div className="mt-8 flex items-center gap-4 sm:mt-12">
            <Link
              href="/plants"
              className={buttonVariants({ size: "lg", className: "rounded-full" })}
            >
              Open catalog <ArrowUpRight className="h-5! w-5!" />
            </Link>
            <Link
              href="#catalog"
              className={buttonVariants({
                size: "lg",
                variant: "outline",
                className: "rounded-full shadow-none",
              })}
            >
              <CirclePlay className="h-5! w-5!" /> See collection
            </Link>
          </div>
        </div>
        <div className="relative min-h-[360px] overflow-hidden bg-zinc-100 lg:min-h-0 dark:bg-zinc-900">
          <img
            src="https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&w=1400&q=85"
            alt="Green plants in a bright indoor collection"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-x-8 bottom-8 rounded-2xl border border-white/50 bg-white/85 p-5 shadow-lg backdrop-blur-sm dark:border-white/10 dark:bg-zinc-950/80">
            <p className="text-sm font-medium text-emerald-700 dark:text-emerald-400">Plantventory</p>
            <p className="mt-1 text-lg font-semibold">A clearer view of what is growing.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
