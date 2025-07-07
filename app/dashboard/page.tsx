"use client"

import { useState } from "react"
import Link from "next/link"
import {
  Users,
  Briefcase,
  TrendingUp,
  TrendingDown,
  Clock,
  AlertCircle,
  Plus,
  Eye,
  MessageSquare,
  Star,
  UserPlus,
  Award,
  Target,
  Loader2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardLayout } from "@/components/dashboard-layout"
import { DashboardFilters, type FilterOptions } from "@/components/dashboard-filters"
import { useDashboardData } from "@/hooks/use-dashboard-data"

const recommendedActions = [
  {
    title: "Review High-Match Candidates",
    description: "5 candidates with 90+ match scores are waiting for review",
    action: "Review Now",
    href: "/dashboard/applicants",
    priority: "high",
  },
  {
    title: "Project Deadline Approaching",
    description: "Frontend Developer Intern applications close in 3 days",
    action: "Extend Deadline",
    href: "/dashboard/projects/1",
    priority: "medium",
  },
  {
    title: "Send Offers to Selected Candidates",
    description: "3 candidates are ready to receive offers",
    action: "Send Offers",
    href: "/dashboard/offers",
    priority: "high",
  },
]

export default function DashboardPage() {
  const [selectedTab, setSelectedTab] = useState("overview")
  const { dashboardStats, recentProjects, topCandidates, filters, updateFilters, isLoading } = useDashboardData()

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
      case "closed":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400"
      case "available":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400"
      case "shortlisted":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400"
      case "selected":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400"
    }
  }

  const getMatchScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600 dark:text-green-400"
    if (score >= 80) return "text-blue-600 dark:text-blue-400"
    if (score >= 70) return "text-yellow-600 dark:text-yellow-400"
    return "text-red-600 dark:text-red-400"
  }

  const formatGrowth = (growth: number) => {
    const isPositive = growth >= 0
    return {
      value: `${isPositive ? "+" : ""}${growth}%`,
      color: isPositive ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400",
      icon: isPositive ? TrendingUp : TrendingDown,
    }
  }

  const handleFiltersChange = (newFilters: FilterOptions) => {
    updateFilters(newFilters)
  }

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        {/* Welcome Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Welcome back, John! 👋</h1>
            <p className="text-slate-600 dark:text-slate-400 mt-1">Here's what's happening with your projects today.</p>
          </div>
          <Button
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg"
            asChild
          >
            <Link href="/dashboard/post-project">
              <Plus className="h-4 w-4 mr-2" />
              Post New Project
            </Link>
          </Button>
        </div>

        {/* Filters */}
        <DashboardFilters onFiltersChange={handleFiltersChange} />

        {/* Loading Overlay */}
        {isLoading && (
          <div className="fixed inset-0 bg-black/20 dark:bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center">
            <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-xl flex items-center gap-3">
              <Loader2 className="h-5 w-5 animate-spin text-blue-600" />
              <span className="text-slate-700 dark:text-slate-300">Updating dashboard...</span>
            </div>
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm dark:border-slate-700/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Total Projects</p>
                  <p className="text-3xl font-bold text-slate-900 dark:text-white">{dashboardStats.totalProjects}</p>
                </div>
                <div className="h-12 w-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                  <Briefcase className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                {(() => {
                  const growth = formatGrowth(dashboardStats.projectsGrowth)
                  const Icon = growth.icon
                  return (
                    <>
                      <Icon className="h-4 w-4 mr-1" />
                      <span className={growth.color}>{growth.value} from last period</span>
                    </>
                  )
                })()}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm dark:border-slate-700/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Applications</p>
                  <p className="text-3xl font-bold text-slate-900 dark:text-white">
                    {dashboardStats.totalApplications}
                  </p>
                </div>
                <div className="h-12 w-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
                  <Users className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                {(() => {
                  const growth = formatGrowth(dashboardStats.applicationsGrowth)
                  const Icon = growth.icon
                  return (
                    <>
                      <Icon className="h-4 w-4 mr-1" />
                      <span className={growth.color}>{growth.value} from last period</span>
                    </>
                  )
                })()}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm dark:border-slate-700/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Shortlisted</p>
                  <p className="text-3xl font-bold text-slate-900 dark:text-white">
                    {dashboardStats.shortlistedCandidates}
                  </p>
                </div>
                <div className="h-12 w-12 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg flex items-center justify-center">
                  <Star className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                {(() => {
                  const growth = formatGrowth(dashboardStats.shortlistedGrowth)
                  const Icon = growth.icon
                  return (
                    <>
                      <Icon className="h-4 w-4 mr-1" />
                      <span className={growth.color}>{growth.value} from last period</span>
                    </>
                  )
                })()}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/20 dark:bg-slate-800/70 backdrop-blur-xl dark:border-slate-700/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Offers Sent</p>
                  <p className="text-3xl font-bold text-slate-900 dark:text-white">{dashboardStats.offeredPositions}</p>
                </div>
                <div className="h-12 w-12 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center">
                  <Award className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                {(() => {
                  const growth = formatGrowth(dashboardStats.offersGrowth)
                  const Icon = growth.icon
                  return (
                    <>
                      <Icon className="h-4 w-4 mr-1" />
                      <span className={growth.color}>{growth.value} from last period</span>
                    </>
                  )
                })()}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="candidates">Top Candidates</TabsTrigger>
            <TabsTrigger value="actions">Actions</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Recent Projects */}
            <Card className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm dark:border-slate-700/20">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-xl font-semibold">Recent Projects</CardTitle>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/dashboard/projects">View All</Link>
                </Button>
              </CardHeader>
              <CardContent>
                {recentProjects.length === 0 ? (
                  <div className="text-center py-8">
                    <Briefcase className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                    <p className="text-slate-600 dark:text-slate-400">
                      No projects found for the selected time period.
                    </p>
                    <Button className="mt-4" asChild>
                      <Link href="/dashboard/post-project">Create Your First Project</Link>
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {recentProjects.map((project) => (
                      <div
                        key={project.id}
                        className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-white/50 dark:bg-slate-700/50 rounded-lg border dark:border-slate-600/20"
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-semibold text-slate-900 dark:text-white">{project.title}</h3>
                            <Badge className={getStatusColor(project.status)}>{project.status}</Badge>
                          </div>
                          <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600 dark:text-slate-400">
                            <span className="flex items-center gap-1">
                              <Users className="h-4 w-4" />
                              {project.applications} applications
                            </span>
                            <span className="flex items-center gap-1">
                              <Target className="h-4 w-4" />
                              {project.matchingCandidates} matches
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              Due {new Date(project.deadline).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 mt-3 sm:mt-0">
                          <Button variant="outline" size="sm" asChild>
                            <Link href={`/dashboard/projects/${project.id}`}>
                              <Eye className="h-4 w-4 mr-1" />
                              View
                            </Link>
                          </Button>
                          <Button variant="outline" size="sm" asChild>
                            <Link href={`/dashboard/projects/${project.id}/applications`}>
                              <Users className="h-4 w-4 mr-1" />
                              Applications
                            </Link>
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-200 dark:border-blue-700/20">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="h-10 w-10 bg-blue-600 rounded-lg flex items-center justify-center">
                      <UserPlus className="h-5 w-5 text-white" />
                    </div>
                    <h3 className="font-semibold text-blue-900 dark:text-blue-100">Find Talent</h3>
                  </div>
                  <p className="text-sm text-blue-700 dark:text-blue-300 mb-4">
                    Search and discover talented students for your projects
                  </p>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white" asChild>
                    <Link href="/dashboard/search-talent">Search Now</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-green-200 dark:border-green-700/20">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="h-10 w-10 bg-green-600 rounded-lg flex items-center justify-center">
                      <MessageSquare className="h-5 w-5 text-white" />
                    </div>
                    <h3 className="font-semibold text-green-900 dark:text-green-100">Messages</h3>
                  </div>
                  <p className="text-sm text-green-700 dark:text-green-300 mb-4">
                    Communicate with candidates and manage conversations
                  </p>
                  <Button className="w-full bg-green-600 hover:bg-green-700 text-white" asChild>
                    <Link href="/dashboard/messages">View Messages</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border-purple-200 dark:border-purple-700/20">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="h-10 w-10 bg-purple-600 rounded-lg flex items-center justify-center">
                      <Target className="h-5 w-5 text-white" />
                    </div>
                    <h3 className="font-semibold text-purple-900 dark:text-purple-100">Pods</h3>
                  </div>
                  <p className="text-sm text-purple-700 dark:text-purple-300 mb-4">
                    Create and manage project pods for team collaboration
                  </p>
                  <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white" asChild>
                    <Link href="/dashboard/pods">Manage Pods</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="candidates" className="space-y-6">
            <Card className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm dark:border-slate-700/20">
              <CardHeader>
                <CardTitle className="text-xl font-semibold">Top Matching Candidates</CardTitle>
                <p className="text-slate-600 dark:text-slate-400">
                  Candidates with the highest match scores for your projects
                </p>
              </CardHeader>
              <CardContent>
                {topCandidates.length === 0 ? (
                  <div className="text-center py-8">
                    <Users className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                    <p className="text-slate-600 dark:text-slate-400">
                      No candidates found for the selected time period.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {topCandidates.map((candidate) => (
                      <div
                        key={candidate.id}
                        className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-white/50 dark:bg-slate-700/50 rounded-lg border dark:border-slate-600/20"
                      >
                        <div className="flex items-center gap-4">
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={`/placeholder.svg?height=48&width=48`} />
                            <AvatarFallback className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                              {candidate.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-1">
                              <h3 className="font-semibold text-slate-900 dark:text-white">{candidate.name}</h3>
                              <Badge className={getStatusColor(candidate.status)}>{candidate.status}</Badge>
                              <span className={`text-sm font-semibold ${getMatchScoreColor(candidate.matchScore)}`}>
                                {candidate.matchScore}% match
                              </span>
                            </div>
                            <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                              {candidate.course} • {candidate.university}
                            </p>
                            <div className="flex flex-wrap gap-1">
                              {candidate.skills.slice(0, 3).map((skill) => (
                                <Badge key={skill} variant="secondary" className="text-xs">
                                  {skill}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 mt-3 sm:mt-0">
                          <Button variant="outline" size="sm" asChild>
                            <Link href={`/dashboard/candidates/${candidate.id}`}>
                              <Eye className="h-4 w-4 mr-1" />
                              View Profile
                            </Link>
                          </Button>
                          <Button
                            size="sm"
                            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                          >
                            <UserPlus className="h-4 w-4 mr-1" />
                            Recommend
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="actions" className="space-y-6">
            <Card className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm dark:border-slate-700/20">
              <CardHeader>
                <CardTitle className="text-xl font-semibold">Recommended Actions</CardTitle>
                <p className="text-slate-600 dark:text-slate-400">Important tasks that need your attention</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recommendedActions.map((action, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-lg border-l-4 ${
                        action.priority === "high"
                          ? "bg-red-50 dark:bg-red-900/20 border-red-500"
                          : "bg-yellow-50 dark:bg-yellow-900/20 border-yellow-500"
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-slate-900 dark:text-white">{action.title}</h3>
                            {action.priority === "high" ? (
                              <AlertCircle className="h-4 w-4 text-red-500" />
                            ) : (
                              <Clock className="h-4 w-4 text-yellow-500" />
                            )}
                          </div>
                          <p className="text-sm text-slate-600 dark:text-slate-400">{action.description}</p>
                        </div>
                        <Button
                          className={
                            action.priority === "high"
                              ? "bg-red-600 hover:bg-red-700 text-white"
                              : "bg-yellow-600 hover:bg-yellow-700 text-white"
                          }
                          asChild
                        >
                          <Link href={action.href}>{action.action}</Link>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
