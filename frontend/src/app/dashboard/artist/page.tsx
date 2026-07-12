import { db } from "@/services/database.service";
import { auth } from "@/services/auth.service";
import Link from "next/link";
import Image from "next/image";
import { Button, buttonVariants } from "@/components/ui/button";
import { 
  PlusCircle, 
  DollarSign, 
  Image as ImageIcon, 
  TrendingUp, 
  Users, 
  Eye, 
  LayoutGrid, 
  Palette, 
  Upload, 
  BarChart3, 
  Settings, 
  Bell, 
  MoreVertical,
  Activity,
  Heart,
  Sparkles,
  Briefcase,
  Wallet,
  Clock
} from "lucide-react";

export default async function ArtistDashboard() {
  const user = await auth.getCurrentUser() || { id: "68c2e21d-1618-4b16-845a-bf6ee1cc3c80", name: "CyberPunkDude" };
  const artworks = await db.getArtworksByArtist(user.id);

  const stats = [
    {
      label: "Total Revenue",
      value: "$12,845.50",
      change: "+12.5%",
      icon: <DollarSign className="h-4.5 w-4.5 text-primary" />,
      iconBg: "bg-primary/10",
      // Sparkline coordinates (SVG Path)
      sparkline: "M0,25 Q15,5 30,20 T60,5 T90,15 T120,2"
    },
    {
      label: "Artworks Sold",
      value: "142",
      change: "+8.2%",
      icon: <Briefcase className="h-4.5 w-4.5 text-blue-600" />,
      iconBg: "bg-blue-500/10",
      sparkline: "M0,28 Q15,25 30,12 T60,18 T90,2 T120,10"
    },
    {
      label: "Total Followers",
      value: "2,840",
      change: "+15.3%",
      icon: <Users className="h-4.5 w-4.5 text-violet-600" />,
      iconBg: "bg-violet-500/10",
      sparkline: "M0,28 Q15,22 30,18 T60,8 T90,5 T120,2"
    },
    {
      label: "Views",
      value: "45.2K",
      change: "+22.1%",
      icon: <ImageIcon className="h-4.5 w-4.5 text-pink-600" />,
      iconBg: "bg-pink-500/10",
      sparkline: "M0,28 Q15,26 30,15 T60,20 T90,8 T120,2"
    }
  ];

  const quickActions = [
    {
      label: "Upload Artwork",
      desc: "Add a new piece to your store",
      icon: <Upload className="h-4.5 w-4.5" />,
      href: "/dashboard/artist/upload"
    },
    {
      label: "Manage Portfolio",
      desc: "Edit existing listings and tags",
      icon: <Palette className="h-4.5 w-4.5" />,
      href: "#"
    },
    {
      label: "View Earnings",
      desc: "Payout history and tax info",
      icon: <Wallet className="h-4.5 w-4.5" />,
      href: "#"
    },
    {
      label: "Studio Settings",
      desc: "Configure your brand profile",
      icon: <Settings className="h-4.5 w-4.5" />,
      href: "#"
    }
  ];

  const recentActivity = [
    {
      user: "Alice Chen",
      action: 'purchased "Neon Serenity"',
      time: "2m ago",
      icon: <DollarSign className="h-3.5 w-3.5 text-green-600" />,
      iconBg: "bg-green-500/10",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=60&q=80"
    },
    {
      user: "Marc Studio",
      action: "liked your collection",
      time: "15m ago",
      icon: <Heart className="h-3.5 w-3.5 text-pink-600" />,
      iconBg: "bg-pink-500/10",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=60&q=80"
    },
    {
      user: "Artify Bot",
      action: "Your profile is trending!",
      time: "1h ago",
      icon: <TrendingUp className="h-3.5 w-3.5 text-primary" />,
      iconBg: "bg-primary/10",
      avatar: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=60&q=80"
    },
    {
      user: "Davin K.",
      action: "sent you a commission req",
      time: "3h ago",
      icon: <Activity className="h-3.5 w-3.5 text-blue-600" />,
      iconBg: "bg-blue-500/10",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=60&q=80"
    }
  ];

  return (
    <div className="flex min-h-screen bg-background border-b border-border/10">
      
      {/* 1. Sidebar Panel (Left Column) */}
      <aside className="w-64 shrink-0 bg-card border-r border-border/40 hidden md:flex flex-col justify-between p-6">
        <div className="space-y-6">
          <span className="text-[10px] text-muted-foreground uppercase font-extrabold tracking-widest px-3">
            Studio Controls
          </span>
          <nav className="space-y-1.5">
            <Link href="#" className="flex items-center gap-3 px-3 py-2 text-sm font-bold text-primary bg-primary/10 rounded-xl">
              <LayoutGrid className="h-4.5 w-4.5" /> Overview
            </Link>
            <Link href={`/profile/${user.id}`} className="flex items-center gap-3 px-3 py-2 text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors rounded-xl">
              <Palette className="h-4.5 w-4.5" /> My Artworks
            </Link>
            <Link href="/dashboard/artist/upload" className="flex items-center gap-3 px-3 py-2 text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors rounded-xl">
              <Upload className="h-4.5 w-4.5" /> Upload New
            </Link>
            <Link href="#" className="flex items-center gap-3 px-3 py-2 text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors rounded-xl">
              <BarChart3 className="h-4.5 w-4.5" /> Analytics
            </Link>
            <Link href="#" className="flex items-center gap-3 px-3 py-2 text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors rounded-xl">
              <Settings className="h-4.5 w-4.5" /> Settings
            </Link>
          </nav>
        </div>

        <div>
          <Link href="#" className="flex items-center gap-3 px-3 py-2.5 text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors rounded-xl border border-border/20 bg-muted/20">
            <Bell className="h-4.5 w-4.5 text-primary" /> Notifications
          </Link>
        </div>
      </aside>

      {/* 2. Main Dashboard Area (Right Column) */}
      <main className="flex-1 p-6 md:p-8 lg:p-10 space-y-8 overflow-x-hidden">
        
        {/* Header Block */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 pb-6 border-b border-border/20">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight mb-2">Artist Dashboard</h1>
            <p className="text-muted-foreground text-sm">
              Welcome back, <span className="font-bold text-foreground">{user.name}</span>. Here&apos;s what&apos;s happening with your studio today.
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="inline-flex items-center gap-1.5 bg-muted/40 border border-border/40 px-3 py-1.5 rounded-xl text-xs font-bold text-foreground">
              <Wallet className="h-4 w-4 text-primary" /> $2,450.00 Available
            </div>
            <Link href="/dashboard/artist/upload" className={`${buttonVariants({})} rounded-xl h-9.5 text-xs font-bold gap-1.5 shadow-lg shadow-primary/20`}>
              <PlusCircle className="h-4 w-4" /> Upload Artwork
            </Link>
          </div>
        </div>

        {/* 4 Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-card border border-border/40 p-5 rounded-2xl flex flex-col justify-between gap-4">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">{stat.label}</span>
                  <span className="text-2xl font-black text-foreground block mt-1.5">{stat.value}</span>
                </div>
                <div className={`h-9 w-9 rounded-xl ${stat.iconBg} flex items-center justify-center`}>
                  {stat.icon}
                </div>
              </div>
              
              <div className="flex items-center justify-between pt-1 border-t border-border/10 mt-1">
                <span className="text-xs font-bold text-green-600 flex items-center gap-0.5">{stat.change}</span>
                {/* SVG Sparkline */}
                <svg className="w-24 h-6 text-primary overflow-visible shrink-0" stroke="currentColor" strokeWidth="1.5" fill="none">
                  <path d={stat.sparkline} className="stroke-primary" />
                </svg>
              </div>
            </div>
          ))}
        </div>

        {/* Middle Section Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Revenue Analytics (Left 2/3) */}
          <div className="lg:col-span-8 bg-card border border-border/40 p-6 rounded-3xl space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-extrabold text-base text-foreground">Revenue Analytics</h3>
                <p className="text-xs text-muted-foreground">Monthly performance and sales volume</p>
              </div>
              
              <div className="inline-flex rounded-lg border border-border/40 bg-muted/40 p-0.5 text-[10px] font-bold">
                <button className="px-2.5 py-1 rounded-md text-muted-foreground">7D</button>
                <button className="px-2.5 py-1 rounded-md bg-background text-primary shadow-sm border border-border/20">1M</button>
                <button className="px-2.5 py-1 rounded-md text-muted-foreground">1Y</button>
              </div>
            </div>

            {/* Custom SVG Line Chart */}
            <div className="relative aspect-[21/9] w-full pt-4">
              <svg viewBox="0 0 700 240" className="w-full h-full text-muted-foreground overflow-visible">
                {/* Grids */}
                <line x1="40" y1="20" x2="680" y2="20" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4" className="text-border/40" />
                <line x1="40" y1="70" x2="680" y2="70" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4" className="text-border/40" />
                <line x1="40" y1="120" x2="680" y2="120" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4" className="text-border/40" />
                <line x1="40" y1="170" x2="680" y2="170" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4" className="text-border/40" />
                <line x1="40" y1="210" x2="680" y2="210" stroke="currentColor" strokeWidth="1" className="text-border/60" />

                {/* Y-Axis Labels */}
                <text x="30" y="24" textAnchor="end" className="text-[9px] fill-muted-foreground font-semibold">9800</text>
                <text x="30" y="74" textAnchor="end" className="text-[9px] fill-muted-foreground font-semibold">7370</text>
                <text x="30" y="124" textAnchor="end" className="text-[9px] fill-muted-foreground font-semibold">4940</text>
                <text x="30" y="174" textAnchor="end" className="text-[9px] fill-muted-foreground font-semibold">2510</text>
                <text x="30" y="214" textAnchor="end" className="text-[9px] fill-muted-foreground font-semibold">80</text>

                {/* X-Axis Labels */}
                <text x="50" y="230" textAnchor="middle" className="text-[10px] fill-muted-foreground font-semibold">Jan</text>
                <text x="150" y="230" textAnchor="middle" className="text-[10px] fill-muted-foreground font-semibold">Feb</text>
                <text x="250" y="230" textAnchor="middle" className="text-[10px] fill-muted-foreground font-semibold">Mar</text>
                <text x="350" y="230" textAnchor="middle" className="text-[10px] fill-muted-foreground font-semibold">Apr</text>
                <text x="450" y="230" textAnchor="middle" className="text-[10px] fill-muted-foreground font-semibold">May</text>
                <text x="550" y="230" textAnchor="middle" className="text-[10px] fill-muted-foreground font-semibold">Jun</text>
                <text x="650" y="230" textAnchor="middle" className="text-[10px] fill-muted-foreground font-semibold">Jul</text>

                {/* Sales curve lines */}
                {/* Sales Count Line (Light blue) */}
                <path d="M 50 205 L 150 203 L 250 202 L 350 204 L 450 201 L 550 203 L 650 202" fill="none" stroke="oklch(0.75 0.12 200)" strokeWidth="2.5" />
                <circle cx="250" cy="202" r="3.5" fill="oklch(0.75 0.12 200)" />
                <circle cx="550" cy="203" r="3.5" fill="oklch(0.75 0.12 200)" />

                {/* Revenue Line (Purple, wavy) */}
                <path d="M 50 170 C 100 190, 120 180, 150 160 C 200 120, 220 20, 250 25 C 280 30, 310 110, 350 125 C 390 140, 420 100, 450 110 C 490 120, 520 125, 550 130 C 590 135, 620 120, 650 115" 
                      fill="none" stroke="var(--primary)" strokeWidth="3" />
                
                {/* Revenue Points */}
                <circle cx="150" cy="160" r="4.5" fill="var(--primary)" stroke="white" strokeWidth="1.5" />
                <circle cx="250" cy="25" r="4.5" fill="var(--primary)" stroke="white" strokeWidth="1.5" />
                <circle cx="350" cy="125" r="4.5" fill="var(--primary)" stroke="white" strokeWidth="1.5" />
                <circle cx="450" cy="110" r="4.5" fill="var(--primary)" stroke="white" strokeWidth="1.5" />
                <circle cx="550" cy="130" r="4.5" fill="var(--primary)" stroke="white" strokeWidth="1.5" />
                <circle cx="650" cy="115" r="4.5" fill="var(--primary)" stroke="white" strokeWidth="1.5" />
              </svg>
            </div>

            {/* Legend */}
            <div className="flex gap-4 justify-center text-xs font-semibold pt-2">
              <div className="flex items-center gap-1.5">
                <span className="h-3 w-3 bg-primary rounded-full" />
                <span>Revenue ($)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="h-3 w-3 bg-blue-400 rounded-full" />
                <span>Sales Count</span>
              </div>
            </div>
          </div>

          {/* Quick Actions & Premium Creator (Right 1/3) */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            {/* Quick Actions Card */}
            <div className="bg-card border border-border/40 p-5 rounded-3xl space-y-4">
              <h3 className="font-extrabold text-base text-foreground px-1">Quick Actions</h3>
              <div className="grid grid-cols-1 gap-2.5">
                {quickActions.map((act) => (
                  <Link key={act.label} href={act.href} className="flex items-center gap-3.5 p-3 rounded-xl border border-border/20 bg-muted/10 hover:bg-muted/40 transition-colors">
                    <div className="h-8.5 w-8.5 bg-primary/10 text-primary flex items-center justify-center rounded-xl shrink-0">
                      {act.icon}
                    </div>
                    <div>
                      <span className="font-bold text-xs text-foreground block">{act.label}</span>
                      <span className="text-[10px] text-muted-foreground block mt-0.5">{act.desc}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Premium Creator Card */}
            <div className="bg-gradient-to-br from-primary to-violet-600 rounded-3xl p-6 text-white space-y-4 relative overflow-hidden shadow-lg flex-1 flex flex-col justify-between min-h-[180px]">
              <div className="absolute top-2 right-2 text-white/10"><Sparkles className="h-24 w-24" /></div>
              
              <div className="relative z-10">
                <span className="bg-white/20 border border-white/20 px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider">Premium Creator</span>
                <p className="text-sm font-semibold mt-4 leading-relaxed text-zinc-100">
                  You have 12 days left of Artify Pro. Renew to keep your custom domain.
                </p>
              </div>

              <button className={`${buttonVariants({})} w-full bg-white text-primary hover:bg-zinc-150 transition-colors font-bold text-xs rounded-xl h-10 mt-4 relative z-10`}>
                Renew Now
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Section Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Recent Uploads Table (Left 2/3) */}
          <div className="lg:col-span-8 bg-card border border-border/40 p-6 rounded-3xl space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="font-extrabold text-base text-foreground">Recent Uploads</h3>
              <Link href="#" className="text-xs font-bold text-primary hover:underline">View All</Link>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs font-semibold">
                <thead>
                  <tr className="border-b border-border/20 text-muted-foreground text-[10px] uppercase tracking-wider">
                    <th className="pb-3 font-bold">Artwork Name</th>
                    <th className="pb-3 font-bold">Category</th>
                    <th className="pb-3 font-bold">Price</th>
                    <th className="pb-3 font-bold">Status</th>
                    <th className="pb-3 text-right font-bold">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/15">
                  {artworks.map((art) => {
                    let badgeClass = "bg-green-500/10 text-green-600 border-green-500/20";
                    if (art.status === "Under Review") {
                      badgeClass = "bg-amber-500/10 text-amber-600 border-amber-500/20";
                    } else if (art.status === "Draft") {
                      badgeClass = "bg-zinc-500/10 text-zinc-500 border-zinc-500/20";
                    }

                    return (
                      <tr key={art.id} className="hover:bg-muted/5 transition-colors">
                        <td className="py-3.5 flex items-center gap-3">
                          <div className="relative h-8 w-8 rounded-lg overflow-hidden border border-border/30">
                            <Image
                              src={art.imageUrl}
                              alt={art.title}
                              fill
                              sizes="32px"
                              className="object-cover"
                            />
                          </div>
                          <span className="font-bold text-foreground text-xs">{art.title}</span>
                        </td>
                        <td className="py-3.5 text-muted-foreground">{art.tag || "Digital Paintings"}</td>
                        <td className="py-3.5 text-primary font-bold">
                          {art.ethPrice ? `${art.ethPrice.toFixed(2)} ETH` : `$${art.price.toFixed(2)}`}
                        </td>
                        <td className="py-3.5">
                          <span className={`inline-block px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider border ${badgeClass}`}>
                            {art.status || "Published"}
                          </span>
                        </td>
                        <td className="py-3.5 text-right">
                          <button className="text-muted-foreground hover:text-foreground"><MoreVertical className="h-4.5 w-4.5" /></button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Recent Activity Stream (Right 1/3) */}
          <div className="lg:col-span-4 bg-card border border-border/40 p-5 rounded-3xl flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-extrabold text-base text-foreground">Recent Activity</h3>
                <span className="bg-primary/10 text-primary px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">4 New</span>
              </div>
              
              <div className="space-y-4.5">
                {recentActivity.map((act, idx) => (
                  <div key={idx} className="flex gap-3 items-start">
                    <div className="relative h-9 w-9 rounded-full overflow-hidden bg-muted shrink-0 border border-border/20">
                      <Image
                        src={act.avatar}
                        alt={act.user}
                        fill
                        sizes="36px"
                        className="object-cover"
                      />
                    </div>
                    
                    <div className="flex-1 space-y-1">
                      <p className="text-xs text-muted-foreground leading-normal">
                        <span className="font-bold text-foreground">{act.user}</span> {act.action}
                      </p>
                      <span className="text-[10px] text-muted-foreground font-semibold flex items-center gap-1">
                        <Clock className="h-3 w-3" /> {act.time}
                      </span>
                    </div>

                    <div className={`h-6 w-6 rounded-lg ${act.iconBg} flex items-center justify-center shrink-0`}>
                      {act.icon}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button className={`${buttonVariants({ variant: "outline" })} w-full mt-6 rounded-xl font-bold text-xs h-9.5`}>
              View All Activity
            </button>
          </div>

        </div>

      </main>
    </div>
  );
}
