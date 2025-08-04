import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="py-20">
      <div className="relative z-10 mx-auto w-full max-w-2xl px-6 lg:px-0">
        <div className="relative text-center">
          <p className="text-3xl">✨</p>
          <h1 className="mx-auto mt-12 max-w-xl text-balance text-5xl font-medium">
            Your Personal AI Skin Coach
          </h1>
          <p className="text-muted-foreground mx-auto mb-6 mt-4 text-balance text-xl">
            Get a personalized skin analysis and routine, powered by AI. We
            respect your privacy and will never share your data.
          </p>
          <div className="flex flex-col items-center gap-2 *:w-full sm:flex-row sm:justify-center sm:*:w-auto">
            <Button asChild variant="default" size="sm">
              <Link href="/sign-up" prefetch={true}>
                <span className="text-nowrap">Get Your Free Analysis</span>
              </Link>
            </Button>
          </div>
        </div>

        <div className="relative mt-8 overflow-hidden rounded-3xl">
          <Image
            src="/iphone.png"
            alt="iPhone with app screenshot"
            className="relative mx-auto"
            width={300}
            height={600}
          />
        </div>
      </div>
    </section>
  );
}
