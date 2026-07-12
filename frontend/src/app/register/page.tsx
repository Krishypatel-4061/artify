"use client";

import * as React from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Brush, ArrowRight, ShieldCheck, Mail, Lock, User } from "lucide-react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [role, setRole] = React.useState("buyer");
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate register
    setTimeout(() => {
      setLoading(false);
      router.push("/dashboard/artist");
    }, 1000);
  };

  return (
    <div className="container mx-auto flex flex-col items-center justify-center min-h-[90vh] px-4 py-12 bg-background">
      
      {/* Brand Logo header */}
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
          <CardTitle className="text-xl sm:text-2xl font-black text-foreground">Create your account</CardTitle>
          <CardDescription className="text-xs text-muted-foreground font-semibold">
            Enter your details to join the premium art ecosystem
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4 text-sm font-semibold">
            
            {/* Full Name */}
            <div className="space-y-1.5">
              <Label htmlFor="name" className="text-xs text-foreground font-bold uppercase tracking-wider">Full Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  id="name" 
                  type="text" 
                  placeholder="Victor Hugo"
                  required
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="h-10 pl-10 rounded-xl bg-muted/20 border-border/40 focus-visible:ring-primary/20 text-sm font-medium"
                />
              </div>
            </div>

            {/* Email Address */}
            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-xs text-foreground font-bold uppercase tracking-wider">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="victor@artify.cloud"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="h-10 pl-10 rounded-xl bg-muted/20 border-border/40 focus-visible:ring-primary/20 text-sm font-medium"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <Label htmlFor="password" className="text-xs text-foreground font-bold uppercase tracking-wider">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  id="password" 
                  type="password" 
                  placeholder="••••••••"
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="h-10 pl-10 rounded-xl bg-muted/20 border-border/40 focus-visible:ring-primary/20 text-sm font-medium"
                />
              </div>
            </div>

            {/* Account Intention */}
            <div className="space-y-1.5">
              <Label htmlFor="role" className="text-xs text-foreground font-bold uppercase tracking-wider">I want to...</Label>
              <select 
                id="role" 
                value={role}
                onChange={e => setRole(e.target.value)}
                className="flex h-10 w-full rounded-xl border border-border/40 bg-muted/20 px-3 py-2 text-sm font-medium text-foreground outline-none focus:ring-1 focus:ring-primary/30"
              >
                <option value="buyer">Buy Artworks & Collectibles</option>
                <option value="artist">Showcase & Sell Artworks</option>
              </select>
            </div>

            <Button type="submit" disabled={loading} className="w-full h-11 rounded-xl text-xs font-bold shadow-lg shadow-primary/25 mt-2">
              {loading ? "Creating Account..." : "Create Account"} <ArrowRight className="ml-1.5 h-4 w-4" />
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col text-center border-t border-border/10 pt-4 pb-6">
          <div className="text-xs text-muted-foreground font-semibold">
            Already have an account?{" "}
            <Link href="/login" className="text-primary font-bold hover:underline">
              Log in
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
