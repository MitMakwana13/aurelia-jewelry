"use client";

import { useRef, useState } from "react";
import html2canvas from "html2canvas";
import { Logo } from "@/components/ui/Logo";

export default function LogoExport() {
  const logoRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<"idle" | "generating" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const generateLogo = async () => {
    if (!logoRef.current) return;
    setStatus("generating");
    setMessage("Generating high-res JPG...");

    try {
      // 1. Capture the logo using html2canvas
      const canvas = await html2canvas(logoRef.current, {
        scale: 4, // 4x resolution for print quality
        backgroundColor: "#faf8f4",
        useCORS: true,
        logging: false,
      });

      // 2. Convert to JPG base64
      const jpegUrl = canvas.toDataURL("image/jpeg", 1.0);

      // 3. Send to our local API to save directly in the project folder
      const response = await fetch("/api/admin/save-logo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: jpegUrl }),
      });

      const result = await response.json();

      if (result.success) {
        setStatus("success");
        setMessage("Success! The JPG is saved in your 'soham website' folder as 'Radharani_Gemstone_Logo.jpg'!");
      } else {
        throw new Error(result.error);
      }
    } catch (err) {
      console.error(err);
      setStatus("error");
      setMessage("Failed to save the logo. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-ink flex flex-col items-center justify-center p-8">
      <div className="mb-8 text-center">
        <h1 className="font-serif text-3xl text-cream">Logo Generator</h1>
        <p className="text-cream/50 mt-2 text-sm max-w-md">
          Generate an ultra-high-resolution JPG. This will automatically save it directly into your project folder so you can find it instantly.
        </p>
      </div>

      {/* The actual node we capture */}
      <div 
        ref={logoRef}
        className="bg-cream-light flex items-center justify-center"
        style={{ width: "1200px", height: "800px" }}
      >
        <div style={{ transform: "scale(2.5)" }}>
          <Logo variant="light" />
        </div>
      </div>

      <div className="mt-8 flex flex-col items-center">
        <button 
          onClick={generateLogo} 
          disabled={status === "generating"}
          className="bg-gold hover:bg-gold-dark text-white px-8 py-4 uppercase tracking-[0.2em] text-sm transition disabled:opacity-50"
        >
          {status === "generating" ? "Saving to Project Folder..." : "Save JPG to Folder"}
        </button>

        {message && (
          <p className={`mt-4 text-sm ${status === "success" ? "text-green-400" : "text-red-400"}`}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
