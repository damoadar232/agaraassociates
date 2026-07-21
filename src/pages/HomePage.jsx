import { lazy, Suspense } from "react";
const AgaraLandingPage = lazy(() => import("@/components/marketing/agara-landing-page").then((mod) => ({
    default: mod.AgaraLandingPage,
})));
export function HomePage() {
    return (<Suspense fallback={<div className="agara-page min-h-screen animate-pulse bg-agara-cream"/>}>
      <AgaraLandingPage />
    </Suspense>);
}
