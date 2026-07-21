import { Outlet } from "react-router-dom";
import { MarketingNavbar } from "@/components/marketing/marketing-navbar";
import { MarketingFooter } from "@/components/marketing/marketing-footer";

export function MainLayout() {
  return (
    <div className="agara-page min-h-screen font-inter text-agara-charcoal">
      <MarketingNavbar />
      <main>
        <Outlet />
      </main>
      <MarketingFooter />
    </div>
  );
}
