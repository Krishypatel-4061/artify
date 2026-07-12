"use client";

import * as React from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Brush, ArrowRight, ShieldCheck, Mail, Lock } from "lucide-react";
import { useRouter } from "next/navigation";
import { auth } from "@/services/auth.service";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = React.useState("artist@artify.cloud");
  const [password, setPassword] = React.useState("password");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      await auth.login(email, password);
      router.push("/dashboard/artist");
    } catch (err: any) {
      setError(err.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto flex flex-col items-center justify-center min-h-[80vh] px-4 py-12 bg-background">
      
      {/* Brand logo header */}
      <Link href="/" className="flex items-center gap-2 group mb-8">
        <div className="h-9 w-9 rounded-lg bg-primary flex items-center justify-center text-primary-foreground shadow-lg shadow-primary/20 group-hover:scale-105 transition-transform duration-200">
          <Brush className="h-5 w-5" />
        </div>
        <span className="font-extrabold text-2xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-violet-500">
          Artify Cloud
        </span>
      </Link>
      
      <Card className="w-full max-w-md border-border/40 rounded-3xl shadow-xl bg-card">
        <CardHeader className="space-y-1.5 text-center">
          <CardTitle className="text-xl sm:text-2xl font-black text-foreground">Welcome back</CardTitle>
          <CardDescription className="text-xs text-muted-foreground font-semibold">
            Enter your email and password to log in to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4.5 text-sm font-semibold">
            {error && (
              <div className="p-3 bg-destructive/10 border border-destructive/20 text-destructive rounded-xl text-xs font-bold">
                {error}
              </div>
            )}
            
            {/* Email */}
            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-xs text-foreground font-bold uppercase tracking-wider">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="artist@artify.cloud" 
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  className="h-10 pl-10 rounded-xl bg-muted/20 border-border/40 focus-visible:ring-primary/20 text-sm font-medium"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-xs text-foreground font-bold uppercase tracking-wider">Password</Label>
                <Link href="#" className="text-[10px] text-primary font-bold hover:underline">Forgot password?</Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  id="password" 
                  type="password" 
                  placeholder="••••••••"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  className="h-10 pl-10 rounded-xl bg-muted/20 border-border/40 focus-visible:ring-primary/20 text-sm font-medium"
                />
              </div>
            </div>

            <Button type="submit" disabled={loading} className="w-full h-11 rounded-xl text-xs font-bold shadow-lg shadow-primary/25 mt-2">
              {loading ? "Authenticating..." : "Login to Studio"} <ArrowRight className="ml-1.5 h-4 w-4" />
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col text-center border-t border-border/10 pt-4 pb-6">
          <div className="text-xs text-muted-foreground font-semibold">
            Don&apos;t have an account yet?{" "}
            <Link href="/register" className="text-primary font-bold hover:underline">
              Create an account
            </Link>
          </div>
          <div className="flex items-center gap-1 mt-4 text-[10px] text-muted-foreground/80 font-semibold justify-center">
            <ShieldCheck className="h-3.5 w-3.5 text-primary" /> Securing connections via Azure Authentication
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
