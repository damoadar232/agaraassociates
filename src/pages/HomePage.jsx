import { lazy, Suspense } from "react";

const AgaraLandingPage = lazy(() =>
  import("@/components/marketing/agara-landing-page").then((mod) => ({
    default: mod.AgaraLandingPage,
  }))
);

export function HomePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[60vh] animate-pulse bg-agara-cream" />
      }
    >
      <AgaraLandingPage />
    </Suspense>
  );
}
