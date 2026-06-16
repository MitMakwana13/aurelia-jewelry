import { Suspense } from "react";
import { ConfirmationContent } from "./ConfirmationContent";

export default function ConfirmationPage() {
  return (
    <Suspense
      fallback={
        <div className="container-x py-24 text-center">
          <p className="font-serif text-3xl animate-pulse">Verifying payment…</p>
        </div>
      }
    >
      <ConfirmationContent />
    </Suspense>
  );
}
