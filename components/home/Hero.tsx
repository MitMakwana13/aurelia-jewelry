import Link from "next/link";
import { ArrowRightIcon } from "@/components/ui/Icons";

export function Hero() {
  return (
    <section className="relative bg-cream-warm">
      <div className="relative grid min-h-[640px] grid-cols-1 lg:grid-cols-12">
        <div className="order-2 flex flex-col justify-end px-6 pb-16 pt-10 lg:order-1 lg:col-span-5 lg:px-16 lg:pb-24 lg:pt-32">
          <p className="eyebrow">The Stacking Event</p>
          <h1 className="mt-5 font-serif text-display">
            Build a stack<br />you'll never<br /><em className="italic">take off.</em>
          </h1>
          <p className="mt-6 max-w-md text-base leading-relaxed text-ink-soft">
            Up to 25% off when you spend $250 or more. Solid 14k gold, recycled silver,
            and ethically sourced stones — designed to layer, made to last.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Link href="/shop" className="btn-primary">
              Shop the Edit
            </Link>
            <Link
              href="/collections"
              className="text-xs uppercase tracking-[0.2em] inline-flex items-center gap-2 link-underline"
            >
              Explore Collections <ArrowRightIcon width={14} height={14} />
            </Link>
          </div>
        </div>

        <div className="relative order-1 aspect-[4/5] lg:order-2 lg:col-span-7 lg:aspect-auto">
          <img
            src="https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&w=1800&q=85"
            alt="A model wearing layered gold jewelry"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}
