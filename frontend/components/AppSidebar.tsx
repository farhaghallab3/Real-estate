import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
} from "./ui/sidebar";

import SidebarProfile from "./SidebarProfile";
import Link from "next/link";

export function AppSidebar() {
  return (
    <Sidebar className="bg-inherit">
      <SidebarHeader className="px-4 py-7">
        <div>
          <h1 className="font-serif text-xl tracking-tight leading-none">
            Estate<span className="text-primary">Flow</span>
          </h1>
          <p className="text-sm tracking-widest uppercase mt-1">sales crm</p>
        </div>
        {/* <ModeToggle /> */}
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="px-2 font-medium tracking-widest text-sm">
            OVERVIEW
          </SidebarGroupLabel>
          <SidebarGroupContent className="w-full px-3 text-lg transition-colors hover:border-b-amber-400 hover:border-b hover:cursor-pointer">
            <Link href="/">Dashboard</Link>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel className="px-2 font-medium tracking-widest text-sm">
            PIPELINE
          </SidebarGroupLabel>
          <SidebarGroupContent className="w-full px-3 text-lg transition-colors hover:border-b-amber-400 hover:border-b hover:cursor-pointer">
            <Link href="/leads">Leads</Link>
          </SidebarGroupContent>
          <SidebarGroupContent className="w-full px-3 text-lg transition-colors hover:border-b-amber-400 hover:border-b hover:cursor-pointer">
            Deals
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel className="px-2 font-medium tracking-widest text-sm">
            PORTIFOLIO
          </SidebarGroupLabel>
          <SidebarGroupContent className="w-full px-3 text-lg transition-colors hover:border-b-amber-400 hover:border-b-1 hover:cursor-pointer">
            Properties
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel className="px-2 font-medium tracking-widest text-sm">
            OPEARIONS
          </SidebarGroupLabel>
          <SidebarGroupContent className="w-full px-3 text-lg transition-colors hover:border-b-amber-400 hover:border-b-1 hover:cursor-pointer">
            Calender
          </SidebarGroupContent>
          <SidebarGroupContent className="relative w-full px-3 text-lg transition-colors hover:cursor-pointer after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-amber-400 after:transition-transform after:duration-300 after:ease-out hover:after:scale-x-100">
            Commissions
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <br className="border-2" />
      <SidebarFooter>
        <SidebarProfile
          user={{
            name: "Name Placeholder",
            email: "name@example.com",
            jobTitle: "Job title",
            imageUrl: "https://github.com/shadcn.png",
          }}
          onProfile={() => console.log("Open profile")}
          onSettings={() => console.log("Open settings")}
          onSubscription={() => console.log("Open subscription")}
          onLogout={() => console.log("Log out")}
          onLogin={() => console.log("Log in")}
        />
      </SidebarFooter>
    </Sidebar>
  );
}
