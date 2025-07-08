"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import {
  Search,
  Grid3X3,
  List,
  Plus,
  Eye,
  Edit,
  Copy,
  Archive,
  Trash2,
  MoreHorizontal,
  Calendar,
  Users,
  MapPin,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Pause,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { useToast } from "@/hooks/use-toast"
import { Skeleton } from "@/components/ui/skeleton"
import {DashboardLayout} from "../../../components/dashboard-layout"

// Mock data for projects
const mockProjects = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    description:
      "Looking for an experienced React developer to join our team and work on cutting-edge web applications.",
    type: "Full-time",
    status: "Active",
    applications: 23,
    views: 156,
    match: 94,
    posted: "2024-01-15",
    deadline: "2024-02-15",
    location: "Remote",
    salary: "₹80k - ₹120k",
    skills: ["React", "TypeScript", "Node.js", "GraphQL"],
    company: "TechCorp",
  },
  {
    id: 2,
    title: "Data Science Intern",
    description: "Summer internship opportunity for data science students to work on machine learning projects.",
    type: "Internship",
    status: "Active",
    applications: 18,
    views: 89,
    match: 87,
    posted: "2024-01-10",
    deadline: "2024-03-01",
    location: "Ahmedabad, GJ",
    salary: "₹3k/hour",
    skills: ["Python", "Machine Learning", "SQL", "Pandas"],
    company: "DataTech",
  },
  {
    id: 3,
    title: "UI/UX Designer",
    description: "Contract position for a creative designer to redesign our mobile application interface.",
    type: "Contract",
    status: "Paused",
    applications: 31,
    views: 203,
    match: 91,
    posted: "2024-01-08",
    deadline: "2024-01-30",
    location: "Lucknow, UP",
    salary: "₹1k - ₹2k/hour",
    skills: ["Figma", "Adobe Creative Suite", "Prototyping", "User Research"],
    company: "DesignStudio",
  },
  {
    id: 4,
    title: "Backend Engineer",
    description: "Full-time position for a backend developer to build scalable microservices architecture.",
    type: "Full-time",
    status: "Draft",
    applications: 0,
    views: 12,
    match: 89,
    posted: "2024-01-20",
    deadline: "2024-02-20",
    location: "Patna, BR",
    salary: "₹90k - ₹130k",
    skills: ["Java", "Spring Boot", "AWS", "Docker"],
    company: "CloudTech",
  },
  {
    id: 5,
    title: "Mobile App Developer",
    description: "React Native developer needed for cross-platform mobile application development.",
    type: "Full-time",
    status: "Closed",
    applications: 45,
    views: 234,
    match: 85,
    posted: "2023-12-15",
    deadline: "2024-01-15",
    location: "Remote",
    salary: "₹75k - ₹110k",
    skills: ["React Native", "JavaScript", "iOS", "Android"],
    company: "MobileTech",
  },
]

const statusConfig = {
  Active: { color: "bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300", icon: CheckCircle },
  Draft: { color: "bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300", icon: Edit },
  Paused: { color: "bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300", icon: Pause },
  Closed: { color: "bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300", icon: X },
}

function ProjectCard({ project, onEdit, onDuplicate, onArchive, onDelete }: any) {
  const { toast } = useToast()
  const StatusIcon = statusConfig[project.status as keyof typeof statusConfig].icon

  const handleAction = (action: string) => {
    switch (action) {
      case "edit":
        onEdit(project.id)
        break
      case "duplicate":
        onDuplicate(project.id)
        break
      case "archive":
        onArchive(project.id)
        break
      case "delete":
        onDelete(project.id)
        break
      default:
        break
    }
  }

  return (
    <Card className="glass-card hover-lift interactive border-0 group">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg font-semibold text-slate-900 dark:text-white mb-2">{project.title}</CardTitle>
            <div className="flex items-center gap-2 mb-2">
              <Badge className={`${statusConfig[project.status as keyof typeof statusConfig].color} border-0`}>
                <StatusIcon className="h-3 w-3 mr-1" />
                {project.status}
              </Badge>
              <Badge variant="outline" className="text-xs">
                {project.type}
              </Badge>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="glass-card border-0">
              <DropdownMenuItem onClick={() => handleAction("edit")}>
                <Edit className="h-4 w-4 mr-2" />
                Edit Project
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleAction("duplicate")}>
                <Copy className="h-4 w-4 mr-2" />
                Duplicate
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => handleAction("archive")}>
                <Archive className="h-4 w-4 mr-2" />
                Archive
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleAction("delete")} className="text-red-600 dark:text-red-400">
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <CardDescription className="line-clamp-2">{project.description}</CardDescription>

        <div className="flex flex-wrap gap-2">
          {project.skills.slice(0, 3).map((skill: string) => (
            <Badge key={skill} variant="secondary" className="text-xs">
              {skill}
            </Badge>
          ))}
          {project.skills.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{project.skills.length - 3} more
            </Badge>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            <span>{project.applications} applications</span>
          </div>
          <div className="flex items-center gap-1">
            <Eye className="h-4 w-4" />
            <span>{project.views} views</span>
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="h-4 w-4" />
            <span>{project.location}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>Due {new Date(project.deadline).toLocaleDateString()}</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-white/20 dark:border-white/10">
          <div className="text-sm font-medium text-slate-900 dark:text-white">{project.salary}</div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="glass border-0 bg-transparent">
              <Eye className="h-4 w-4 mr-1" />
              View
            </Button>
            <Button size="sm" className="gradient-primary">
              <Edit className="h-4 w-4 mr-1" />
              Edit
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function ProjectListItem({ project, onEdit, onDuplicate, onArchive, onDelete }: any) {
  const StatusIcon = statusConfig[project.status as keyof typeof statusConfig].icon

  return (
    <Card className="glass-card hover-lift interactive border-0">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="font-semibold text-lg text-slate-900 dark:text-white">{project.title}</h3>
              <Badge className={`${statusConfig[project.status as keyof typeof statusConfig].color} border-0`}>
                <StatusIcon className="h-3 w-3 mr-1" />
                {project.status}
              </Badge>
              <Badge variant="outline" className="text-xs">
                {project.type}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground mb-3 line-clamp-1">{project.description}</p>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                <span>{project.applications} applications</span>
              </div>
              <div className="flex items-center gap-1">
                <Eye className="h-4 w-4" />
                <span>{project.views} views</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                <span>{project.location}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>Due {new Date(project.deadline).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="text-right mr-4">
              <div className="text-sm font-medium text-slate-900 dark:text-white">{project.salary}</div>
              <div className="text-xs text-muted-foreground">
                Posted {new Date(project.posted).toLocaleDateString()}
              </div>
            </div>
            <Button variant="outline" size="sm" className="glass border-0 bg-transparent">
              <Eye className="h-4 w-4 mr-1" />
              View
            </Button>
            <Button size="sm" className="gradient-primary">
              <Edit className="h-4 w-4 mr-1" />
              Edit
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="glass-card border-0">
                <DropdownMenuItem onClick={() => onDuplicate(project.id)}>
                  <Copy className="h-4 w-4 mr-2" />
                  Duplicate
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onArchive(project.id)}>
                  <Archive className="h-4 w-4 mr-2" />
                  Archive
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => onDelete(project.id)} className="text-red-600 dark:text-red-400">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function ProjectSkeleton() {
  return (
    <Card className="glass-card border-0">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <Skeleton className="h-6 w-3/4 mb-2" />
            <div className="flex gap-2 mb-2">
              <Skeleton className="h-5 w-16" />
              <Skeleton className="h-5 w-20" />
            </div>
          </div>
          <Skeleton className="h-8 w-8" />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <Skeleton className="h-12 w-full" />
        <div className="flex gap-2">
          <Skeleton className="h-5 w-16" />
          <Skeleton className="h-5 w-20" />
          <Skeleton className="h-5 w-18" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
        </div>
        <div className="flex justify-between pt-4">
          <Skeleton className="h-4 w-24" />
          <div className="flex gap-2">
            <Skeleton className="h-8 w-16" />
            <Skeleton className="h-8 w-16" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState(mockProjects)
  const [filteredProjects, setFilteredProjects] = useState(mockProjects)
  const [isLoading, setIsLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = useState("recent")
  const [statusFilter, setStatusFilter] = useState("all")
  const { toast } = useToast()

  // Simulate loading
  useEffect(() => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }, [])

  // Filter and search logic
  useEffect(() => {
    const filtered = projects.filter((project) => {
      const matchesSearch =
        searchTerm === "" ||
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.skills.some((skill) => skill.toLowerCase().includes(searchTerm.toLowerCase()))

      const matchesStatus = statusFilter === "all" || project.status.toLowerCase() === statusFilter

      return matchesSearch && matchesStatus
    })

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "recent":
          return new Date(b.posted).getTime() - new Date(a.posted).getTime()
        case "applications":
          return b.applications - a.applications
        case "views":
          return b.views - a.views
        case "deadline":
          return new Date(a.deadline).getTime() - new Date(b.deadline).getTime()
        default:
          return 0
      }
    })

    setFilteredProjects(filtered)
  }, [projects, searchTerm, statusFilter, sortBy])

  const handleEdit = (projectId: number) => {
    toast({
      title: "Edit Project",
      description: `Editing project ${projectId}...`,
    })
  }

  const handleDuplicate = (projectId: number) => {
    const project = projects.find((p) => p.id === projectId)
    if (project) {
      const newProject = {
        ...project,
        id: Math.max(...projects.map((p) => p.id)) + 1,
        title: `${project.title} (Copy)`,
        status: "Draft" as const,
        applications: 0,
        views: 0,
        posted: new Date().toISOString().split("T")[0],
      }
      setProjects([...projects, newProject])
      toast({
        title: "Project Duplicated",
        description: `${project.title} has been duplicated successfully.`,
      })
    }
  }

  const handleArchive = (projectId: number) => {
    const project = projects.find((p) => p.id === projectId)
    toast({
      title: "Project Archived",
      description: `${project?.title} has been archived.`,
    })
  }

  const handleDelete = (projectId: number) => {
    const project = projects.find((p) => p.id === projectId)
    setProjects(projects.filter((p) => p.id !== projectId))
    toast({
      title: "Project Deleted",
      description: `${project?.title} has been deleted permanently.`,
    })
  }

  const stats = {
    total: projects.length,
    active: projects.filter((p) => p.status === "Active").length,
    draft: projects.filter((p) => p.status === "Draft").length,
    applications: projects.reduce((sum, p) => sum + p.applications, 0),
  }

  return (
    <DashboardLayout>
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="container mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">My Projects</h1>
            <p className="text-muted-foreground">Manage and track your project postings</p>
          </div>
          <Button className="gradient-primary hover:scale-105 transition-transform shadow-lg" asChild>
            <Link href="/dashboard/post-project">
              <Plus className="h-4 w-4 mr-2" />
              Post New Project
            </Link>
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="glass-card border-0 hover-lift">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Projects</p>
                  <p className="text-3xl font-bold text-slate-900 dark:text-white">{stats.total}</p>
                </div>
                <div className="p-3 rounded-2xl bg-blue-100 dark:bg-blue-900">
                  <TrendingUp className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="glass-card border-0 hover-lift">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Active Projects</p>
                  <p className="text-3xl font-bold text-slate-900 dark:text-white">{stats.active}</p>
                </div>
                <div className="p-3 rounded-2xl bg-green-100 dark:bg-green-900">
                  <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="glass-card border-0 hover-lift">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Draft Projects</p>
                  <p className="text-3xl font-bold text-slate-900 dark:text-white">{stats.draft}</p>
                </div>
                <div className="p-3 rounded-2xl bg-yellow-100 dark:bg-yellow-900">
                  <Edit className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="glass-card border-0 hover-lift">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Applications</p>
                  <p className="text-3xl font-bold text-slate-900 dark:text-white">{stats.applications}</p>
                </div>
                <div className="p-3 rounded-2xl bg-purple-100 dark:bg-purple-900">
                  <Users className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Controls */}
        <Card className="glass-card border-0">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              <div className="flex flex-1 gap-4 w-full lg:w-auto">
                <div className="relative flex-1 lg:w-80">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search projects..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 glass border-0 bg-white/50 dark:bg-white/10"
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-40 glass border-0 bg-white/50 dark:bg-white/10">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent className="glass-card border-0">
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="paused">Paused</SelectItem>
                    <SelectItem value="closed">Closed</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-40 glass border-0 bg-white/50 dark:bg-white/10">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent className="glass-card border-0">
                    <SelectItem value="recent">Most Recent</SelectItem>
                    <SelectItem value="applications">Most Applications</SelectItem>
                    <SelectItem value="views">Most Views</SelectItem>
                    <SelectItem value="deadline">Deadline</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="icon"
                  onClick={() => setViewMode("grid")}
                  className={viewMode === "grid" ? "gradient-primary" : "glass border-0 bg-transparent"}
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="icon"
                  onClick={() => setViewMode("list")}
                  className={viewMode === "list" ? "gradient-primary" : "glass border-0 bg-transparent"}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Projects Grid/List */}
        {isLoading ? (
          <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
            {Array.from({ length: 6 }).map((_, index) => (
              <ProjectSkeleton key={index} />
            ))}
          </div>
        ) : filteredProjects.length === 0 ? (
          <Card className="glass-card border-0">
            <CardContent className="p-12 text-center">
              <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">No projects found</h3>
              <p className="text-muted-foreground mb-6">
                {searchTerm || statusFilter !== "all"
                  ? "Try adjusting your search or filters"
                  : "Get started by posting your first project"}
              </p>
              <Button className="gradient-primary" asChild>
                <Link href="/dashboard/post-project">
                  <Plus className="h-4 w-4 mr-2" />
                  Post New Project
                </Link>
              </Button>
            </CardContent>
          </Card>
        ) : viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onEdit={handleEdit}
                onDuplicate={handleDuplicate}
                onArchive={handleArchive}
                onDelete={handleDelete}
              />
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredProjects.map((project) => (
              <ProjectListItem
                key={project.id}
                project={project}
                onEdit={handleEdit}
                onDuplicate={handleDuplicate}
                onArchive={handleArchive}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>
    </div>
    </DashboardLayout>
  )
}
