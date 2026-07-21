import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { findUserByCredentials } from "@/lib/auth/users";
import { setSessionCookie, signSession } from "@/lib/auth/session";
export function LoginPage() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const redirect = searchParams.get("redirect") || "/dashboard";
    const [loading, setLoading] = useState(false);
    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        const form = new FormData(e.currentTarget);
        const email = String(form.get("email") ?? "");
        const password = String(form.get("password") ?? "");
        try {
            const user = findUserByCredentials(email, password);
            if (!user) {
                toast.error("Invalid email or password.");
                return;
            }
            const token = await signSession({
                userId: user.id,
                email: user.email,
                name: user.name,
            });
            setSessionCookie(token);
            toast.success("Welcome back to ArchiFlow.");
            navigate(redirect, { replace: true });
        }
        catch {
            toast.error("Unable to sign in.");
        }
        finally {
            setLoading(false);
        }
    }
    return (<Card className="border-0 shadow-none lg:glass lg:shadow-card lg:border">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">Welcome back</CardTitle>
        <CardDescription>Sign in to your ArchiFlow workspace</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" placeholder="you@studio.com" defaultValue="adarsh@agaraassociates.com" required/>
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" name="password" type="password" defaultValue="agara2026" required/>
          </div>
          <Button type="submit" className="w-full rounded-xl h-11" disabled={loading}>
            {loading ? "Signing in..." : "Sign in"}
          </Button>
        </form>
        <p className="text-center text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link to="/signup" className="text-primary font-medium hover:underline">
            Create one
          </Link>
        </p>
      </CardContent>
    </Card>);
}
