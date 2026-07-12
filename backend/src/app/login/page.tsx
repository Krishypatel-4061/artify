import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Brush } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="container mx-auto flex h-screen w-full flex-col items-center justify-center -mt-16">
      <Link href="/" className="flex items-center space-x-2 mb-8">
        <Brush className="h-8 w-8 text-primary" />
        <span className="font-bold text-3xl">Artify Cloud</span>
      </Link>
      
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl">Welcome back</CardTitle>
          <CardDescription>
            Enter your email and password to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="m@example.com" />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <Link href="#" className="text-xs text-primary hover:underline">Forgot password?</Link>
            </div>
            <Input id="password" type="password" />
          </div>
          <Link href="/dashboard/artist" className={buttonVariants({ className: "w-full h-11" })}>Login</Link>
        </CardContent>
        <CardFooter className="flex flex-col text-center">
          <div className="text-sm text-muted-foreground mt-2">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-primary hover:underline">
              Sign up
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
