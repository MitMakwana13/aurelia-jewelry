import Link from "next/link";

interface LogoProps {
  variant?: "light" | "dark";
  className?: string;
}

/**
 * Radharani Gemstone - ultra-premium typographic logo component.
 *
 * Uses a refined gold metallic gradient on the brand name and mark to match
 * the luxury aesthetic requested. Crisp at any resolution.
 */
export function Logo({ variant = "light", className = "" }: LogoProps) {
  // Ultra-chic monochromatic/platinum gradient for the structural logo
  const primaryColor = variant === "dark" ? "#f6f3ee" : "#1a1a1a";
  const secondaryColor = variant === "dark" ? "rgba(246,243,238,0.5)" : "rgba(26,26,26,0.5)";

  return (
    <Link
      href="/"
      aria-label="Radha Rani - Home"
      className={`group inline-flex flex-col items-center select-none ${className}`}
    >
      {/* Render the custom 3D gold logo uploaded by the user */}
      <div className="mb-4 transition-transform duration-[1.5s] ease-out-smooth group-hover:scale-110">
        <img 
          src="/logo.png" 
          alt="Radha Rani Gemstone Logo" 
          className="h-14 w-auto object-contain"
        />
      </div>

      {/* Brand name - Classic Heritage Serif */}
      <span
        style={{
          fontFamily: '"Cormorant Garamond", Georgia, serif',
          fontWeight: 400,
          fontSize: "1.8rem",
          letterSpacing: "0.08em",
          color: primaryColor,
          lineHeight: 1,
          display: "block",
          whiteSpace: "nowrap",
          textTransform: "uppercase",
          transition: "opacity 0.5s ease",
        }}
        className="group-hover:opacity-70"
      >
        RADHA RANI
      </span>

      {/* New Refined Tagline */}
      <span
        style={{
          fontFamily: '"Inter", sans-serif',
          fontWeight: 300,
          fontSize: "0.5rem",
          letterSpacing: "0.6em",
          color: secondaryColor,
          lineHeight: 1,
          display: "block",
          marginTop: "12px",
          marginLeft: "0.6em", // visual centering for wide tracking
          whiteSpace: "nowrap",
          textTransform: "uppercase",
          transition: "color 0.5s ease",
        }}
        className={variant === "light" ? "group-hover:text-ink" : "group-hover:text-white"}
      >
        Heritage Collection
      </span>
    </Link>
  );
}
