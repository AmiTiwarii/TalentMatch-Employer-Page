"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Briefcase, MessageSquare, Settings, Users, Target, LayoutDashboard, UserSearch } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar"

const navigationItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "My Projects",
    href: "/dashboard/projects",
    icon: Briefcase,
  },
  {
    title: "Applications",
    href: "/dashboard/applicants",
    icon: Users,
  },
  {
    title: "Search Talent",
    href: "/dashboard/search-talent",
    icon: UserSearch,
  },
  {
    title: "Pods",
    href: "/dashboard/pods",
    icon: Target,
  },
  {
    title: "Messages",
    href: "/dashboard/messages",
    icon: MessageSquare,
    badge: 3,
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
]

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar className="border-r bg-white/50 dark:bg-slate-900/50 backdrop-blur-xl" collapsible="icon">
      <SidebarHeader className="border-b border-slate-200/50 dark:border-slate-700/50 p-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            <Briefcase className="h-4 w-5" />
          </div>
          <span className="font-bold text-lg bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent group-data-[collapsible=icon]:hidden">
            TechCorp
          </span>
        </div>
      </SidebarHeader>
      <SidebarContent className="px-3 py-4">
        <SidebarMenu className="space-y-1">
          {navigationItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href))
            return (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                  asChild
                  isActive={isActive}
                  tooltip={item.title}
                  className={`
                    relative w-full justify-start rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200
                    ${
                      isActive
                        ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/25"
                        : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"
                    }
                  `}
                >
                  <Link href={item.href} className="flex items-center gap-3 w-full">
                    <item.icon
                      className={`h-5 w-5 ${isActive ? "text-white" : "text-slate-500 dark:text-slate-400"}`}
                    />
                    <span className="flex-1 group-data-[collapsible=icon]:hidden">{item.title}</span>
                    {item.badge && (
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-medium text-white group-data-[collapsible=icon]:hidden">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )
          })}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  )
}
