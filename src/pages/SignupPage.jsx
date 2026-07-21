import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
export function SignupPage() {
    const navigate = useNavigate();
    return (<Card className="border-0 shadow-none lg:glass lg:shadow-card lg:border">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">Create your studio</CardTitle>
        <CardDescription>Start your 14-day free trial</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <form onSubmit={(e) => {
            e.preventDefault();
            navigate("/login");
        }} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="studio">Studio Name</Label>
            <Input id="studio" placeholder="Atelier Design Co."/>
          </div>
          <div className="space-y-2">
            <Label htmlFor="name">Your Name</Label>
            <Input id="name" placeholder="Rahul Sharma"/>
          </div>
          <div className="space-y-2">
            <Label htmlFor="role">Role</Label>
            <select id="role" className="flex h-10 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm">
              <option>Architect</option>
              <option>Interior Designer</option>
              <option>Construction Consultant</option>
            </select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="you@studio.com"/>
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password"/>
          </div>
          <Button type="submit" className="w-full rounded-xl h-11">
            Create account
          </Button>
        </form>
        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link to="/login" className="text-primary font-medium hover:underline">
            Sign in
          </Link>
        </p>
      </CardContent>
    </Card>);
}
