import { Link, Outlet } from "react-router-dom";
import { APP_NAME, APP_TAGLINE } from "@/lib/constants";
import { AppLogo } from "@/components/atoms/app-logo";

export function AuthLayout() {
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <div className="hidden lg:flex flex-col justify-between p-12 bg-gradient-to-br from-primary via-primary/90 to-secondary text-white">
        <Link to="/">
          <AppLogo size="lg" showName tagline={APP_TAGLINE} variant="light" />
        </Link>
        <div className="space-y-6">
          <h2 className="text-4xl font-bold leading-tight">
            Manage projects.
            <br />
            Deliver excellence.
            <br />
            Grow your practice.
          </h2>
          <p className="text-lg text-white/80 max-w-md">
            The premium business management platform for architecture, interior design, and construction firms.
          </p>
          <div className="flex gap-8 text-sm">
            <div>
              <p className="text-3xl font-bold">500+</p>
              <p className="text-white/70">Projects managed</p>
            </div>
            <div>
              <p className="text-3xl font-bold">₹120Cr+</p>
              <p className="text-white/70">Revenue tracked</p>
            </div>
            <div>
              <p className="text-3xl font-bold">40%</p>
              <p className="text-white/70">Faster delivery</p>
            </div>
          </div>
        </div>
        <p className="text-sm text-white/60">© 2026 {APP_NAME}. Built for design professionals.</p>
      </div>
      <div className="flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-md">
          <div className="lg:hidden flex justify-center mb-8">
            <AppLogo size="md" showName />
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
