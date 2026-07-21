import { Outlet } from "react-router-dom";
import { MarketingNavbar } from "@/components/marketing/marketing-navbar";
import { MarketingFooter } from "@/components/marketing/marketing-footer";
import "@/assets/styles/layout/MainLayout.scss";

export function MainLayout() {
  return (
    <div className="main-layout">
      <MarketingNavbar />
      <main>
        <Outlet />
      </main>
      <MarketingFooter />
    </div>
  );
}
