"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import {
  Search,
  Plus,
  Users,
  Calendar,
  Globe,
  Lock,
  Eye,
  MessageSquare,
  Settings,
  MoreHorizontal,
  Grid3X3,
  List,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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
import { DashboardLayout } from "@/components/dashboard-layout"

// Mock data for pods
const mockPods = [
  {
    id: 1,
    name: "Frontend Developers Hub",
    description:
      "A community for frontend developers to share knowledge, collaborate on projects, and discuss the latest trends in web development.",
    members: 156,
    posts: 89,
    category: "Development",
    privacy: "public",
    status: "active",
    createdDate: "2024-01-15",
    lastActivity: "2024-01-20T10:30:00Z",
    avatar: "/placeholder.svg?height=80&width=80",
    tags: ["React", "JavaScript", "CSS", "HTML"],
    owner: {
      name: "Sarah Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    recentMembers: [
      { name: "John Doe", avatar: "/placeholder.svg?height=32&width=32" },
      { name: "Jane Smith", avatar: "/placeholder.svg?height=32&width=32" },
      { name: "Mike Wilson", avatar: "/placeholder.svg?height=32&width=32" },
    ],
  },
  {
    id: 2,
    name: "Data Science Collective",
    description:
      "Connect with data scientists, share datasets, discuss machine learning algorithms, and collaborate on data-driven projects.",
    members: 234,
    posts: 156,
    category: "Data Science",
    privacy: "private",
    status: "active",
    createdDate: "2023-12-10",
    lastActivity: "2024-01-19T14:20:00Z",
    avatar: "/placeholder.svg?height=80&width=80",
    tags: ["Python", "Machine Learning", "Statistics", "AI"],
    owner: {
      name: "Michael Chen",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    recentMembers: [
      { name: "Alice Brown", avatar: "/placeholder.svg?height=32&width=32" },
      { name: "Bob Davis", avatar: "/placeholder.svg?height=32&width=32" },
      { name: "Carol White", avatar: "/placeholder.svg?height=32&width=32" },
    ],
  },
  {
    id: 3,
    name: "UX/UI Design Studio",
    description:
      "A creative space for designers to showcase their work, get feedback, and collaborate on design projects.",
    members: 89,
    posts: 67,
    category: "Design",
    privacy: "public",
    status: "active",
    createdDate: "2024-01-05",
    lastActivity: "2024-01-18T16:45:00Z",
    avatar: "/placeholder.svg?height=80&width=80",
    tags: ["Figma", "Adobe XD", "Prototyping", "User Research"],
    owner: {
      name: "Emma Davis",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    recentMembers: [
      { name: "David Lee", avatar: "/placeholder.svg?height=32&width=32" },
      { name: "Lisa Wang", avatar: "/placeholder.svg?height=32&width=32" },
      { name: "Tom Brown", avatar: "/placeholder.svg?height=32&width=32" },
    ],
  },
  {
    id: 4,
    name: "Startup Founders Network",
    description:
      "A private network for startup founders to share experiences, seek advice, and find potential co-founders.",
    members: 45,
    posts: 23,
    category: "Business",
    privacy: "private",
    status: "active",
    createdDate: "2023-11-20",
    lastActivity: "2024-01-17T11:30:00Z",
    avatar: "/placeholder.svg?height=80&width=80",
    tags: ["Entrepreneurship", "Funding", "Strategy", "Networking"],
    owner: {
      name: "Alex Rodriguez",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    recentMembers: [
      { name: "Grace Kim", avatar: "/placeholder.svg?height=32&width=32" },
      { name: "Ryan Taylor", avatar: "/placeholder.svg?height=32&width=32" },
      { name: "Sophie Chen", avatar: "/placeholder.svg?height=32&width=32" },
    ],
  },
  {
    id: 5,
    name: "Mobile App Developers",
    description: "Community for mobile app developers working on iOS, Android, and cross-platform applications.",
    members: 178,
    posts: 134,
    category: "Development",
    privacy: "public",
    status: "inactive",
    createdDate: "2023-10-15",
    lastActivity: "2024-01-10T09:15:00Z",
    avatar: "/placeholder.svg?height=80&width=80",
    tags: ["React Native", "Flutter", "iOS", "Android"],
    owner: {
      name: "Jessica Wang",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    recentMembers: [
      { name: "Kevin Park", avatar: "/placeholder.svg?height=32&width=32" },
      { name: "Maria Garcia", avatar: "/placeholder.svg?height=32&width=32" },
      { name: "James Wilson", avatar: "/placeholder.svg?height=32&width=32" },
    ],
  },
]

const categories = ["All", "Development", "Design", "Data Science", "Business", "Marketing"]
const privacyOptions = ["All", "Public", "Private"]
const statusOptions = ["All", "Active", "Inactive"]

function PodCard({ pod, viewMode }: { pod: any; viewMode: "grid" | "list" }) {
  const { toast } = useToast()

  const handleJoinPod = () => {
    toast({
      title: "Join Request Sent",
      description: `Your request to join "${pod.name}" has been sent.`,
    })
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
  }

  const formatLastActivity = (dateString: string) => {
    const now = new Date()
    const activity = new Date(dateString)
    const diffInHours = Math.floor((now.getTime() - activity.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 1) return "Active now"
    if (diffInHours < 24) return `${diffInHours}h ago`
    const diffInDays = Math.floor(diffInHours / 24)
    return `${diffInDays}d ago`
  }

  if (viewMode === "list") {
    return (
      <Card className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl border-white/20 dark:border-slate-700/20 hover:shadow-lg transition-all duration-200">
        <CardContent className="p-4 lg:p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 flex-1 min-w-0">
              <Avatar className="h-12 w-12 lg:h-16 lg:w-16 flex-shrink-0">
                <AvatarImage src={pod.avatar || "/placeholder.svg"} alt={pod.name} />
                <AvatarFallback className="text-lg">
                  {pod.name
                    .split(" ")
                    .map((n: string) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-2 flex-wrap">
                  <h3 className="font-semibold text-base lg:text-lg text-slate-900 dark:text-white">{pod.name}</h3>
                  <div className="flex items-center gap-2">
                    <Badge
                      className={`text-xs ${
                        pod.privacy === "public"
                          ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                          : "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
                      }`}
                    >
                      {pod.privacy === "public" ? (
                        <Globe className="h-3 w-3 mr-1" />
                      ) : (
                        <Lock className="h-3 w-3 mr-1" />
                      )}
                      {pod.privacy}
                    </Badge>
                    <Badge
                      className={`text-xs ${
                        pod.status === "active"
                          ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                          : "bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-300"
                      }`}
                    >
                      {pod.status}
                    </Badge>
                  </div>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-300 mb-3 line-clamp-2">{pod.description}</p>
                <div className="flex items-center gap-4 lg:gap-6 text-xs lg:text-sm text-slate-500 dark:text-slate-400 mb-2 flex-wrap">
                  <div className="flex items-center gap-1">
                    <Users className="h-3 w-3 lg:h-4 lg:w-4" />
                    <span>{pod.members} members</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageSquare className="h-3 w-3 lg:h-4 lg:w-4" />
                    <span>{pod.posts} posts</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3 lg:h-4 lg:w-4" />
                    <span>Created {formatDate(pod.createdDate)}</span>
                  </div>
                  <span>Last activity: {formatLastActivity(pod.lastActivity)}</span>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge variant="outline" className="text-xs">
                    {pod.category}
                  </Badge>
                  {pod.tags.slice(0, 3).map((tag: string) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                  {pod.tags.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{pod.tags.length - 3} more
                    </Badge>
                  )}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <div className="text-right mr-4 hidden lg:block">
                <div className="flex items-center gap-1 mb-1">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={pod.owner.avatar || "/placeholder.svg"} />
                    <AvatarFallback className="text-xs">
                      {pod.owner.name
                        .split(" ")
                        .map((n: string) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm text-slate-600 dark:text-slate-300">{pod.owner.name}</span>
                </div>
                <div className="flex -space-x-2">
                  {pod.recentMembers.slice(0, 3).map((member: any, index: number) => (
                    <Avatar key={index} className="h-6 w-6 border-2 border-white dark:border-slate-800">
                      <AvatarImage src={member.avatar || "/placeholder.svg"} />
                      <AvatarFallback className="text-xs">
                        {member.name
                          .split(" ")
                          .map((n: string) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                  ))}
                </div>
              </div>
              <Button variant="outline" size="sm" className="bg-transparent border-slate-200 hidden sm:flex" asChild>
                <Link href={`/dashboard/pods/${pod.id}`}>
                  <Eye className="h-4 w-4 mr-1" />
                  View
                </Link>
              </Button>
              <Button
                size="sm"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                onClick={handleJoinPod}
              >
                <Users className="h-4 w-4 mr-1" />
                <span className="hidden sm:inline">Join</span>
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border-white/20"
                >
                  <DropdownMenuItem asChild>
                    <Link href={`/dashboard/pods/${pod.id}`}>
                      <Eye className="h-4 w-4 mr-2" />
                      View Pod
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleJoinPod}>
                    <Users className="h-4 w-4 mr-2" />
                    Join Pod
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Settings className="h-4 w-4 mr-2" />
                    Pod Settings
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl border-white/20 dark:border-slate-700/20 hover:shadow-lg transition-all duration-200 group h-fit">
      <CardContent className="p-4 lg:p-6">
        <div className="text-center mb-4">
          <Avatar className="h-16 w-16 lg:h-20 lg:w-20 mx-auto mb-3">
            <AvatarImage src={pod.avatar || "/placeholder.svg"} alt={pod.name} />
            <AvatarFallback className="text-lg">
              {pod.name
                .split(" ")
                .map((n: string) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <h3 className="font-semibold text-base lg:text-lg text-slate-900 dark:text-white mb-2">{pod.name}</h3>
          <div className="flex items-center justify-center gap-2 mb-3">
            <Badge
              className={`text-xs ${
                pod.privacy === "public"
                  ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                  : "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
              }`}
            >
              {pod.privacy === "public" ? <Globe className="h-3 w-3 mr-1" /> : <Lock className="h-3 w-3 mr-1" />}
              {pod.privacy}
            </Badge>
            <Badge
              className={`text-xs ${
                pod.status === "active"
                  ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                  : "bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-300"
              }`}
            >
              {pod.status}
            </Badge>
          </div>
        </div>

        <div className="space-y-4">
          <p className="text-xs lg:text-sm text-slate-600 dark:text-slate-300 text-center line-clamp-3">
            {pod.description}
          </p>

          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <div className="flex items-center justify-center space-x-1">
                <Users className="h-4 w-4 text-blue-500" />
                <span className="font-semibold text-slate-900 dark:text-white text-sm lg:text-base">{pod.members}</span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">Members</p>
            </div>
            <div>
              <div className="flex items-center justify-center space-x-1">
                <MessageSquare className="h-4 w-4 text-green-500" />
                <span className="font-semibold text-slate-900 dark:text-white text-sm lg:text-base">{pod.posts}</span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">Posts</p>
            </div>
          </div>

          <div className="text-center">
            <Badge variant="outline" className="text-xs mb-2">
              {pod.category}
            </Badge>
            <div className="flex flex-wrap gap-1 justify-center">
              {pod.tags.slice(0, 3).map((tag: string) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
              {pod.tags.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{pod.tags.length - 3}
                </Badge>
              )}
            </div>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-2">
              <Avatar className="h-6 w-6">
                <AvatarImage src={pod.owner.avatar || "/placeholder.svg"} />
                <AvatarFallback className="text-xs">
                  {pod.owner.name
                    .split(" ")
                    .map((n: string) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <span className="text-sm text-slate-600 dark:text-slate-300">{pod.owner.name}</span>
            </div>
            <div className="flex justify-center -space-x-2 mb-3">
              {pod.recentMembers.slice(0, 3).map((member: any, index: number) => (
                <Avatar key={index} className="h-6 w-6 border-2 border-white dark:border-slate-800">
                  <AvatarImage src={member.avatar || "/placeholder.svg"} />
                  <AvatarFallback className="text-xs">
                    {member.name
                      .split(" ")
                      .map((n: string) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
              ))}
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Last activity: {formatLastActivity(pod.lastActivity)}
            </p>
          </div>

          <div className="flex flex-col gap-2 pt-3 border-t border-white/20 dark:border-white/10">
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="bg-transparent border-slate-200 text-xs flex-1" asChild>
                <Link href={`/dashboard/pods/${pod.id}`}>
                  <Eye className="h-3 w-3 mr-1" />
                  View Pod
                </Link>
              </Button>
              <Button
                size="sm"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-xs flex-1"
                onClick={handleJoinPod}
              >
                <Users className="h-3 w-3 mr-1" />
                Join
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border-white/20"
                >
                  <DropdownMenuItem asChild>
                    <Link href={`/dashboard/pods/${pod.id}`}>
                      <Eye className="h-4 w-4 mr-2" />
                      View Pod
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleJoinPod}>
                    <Users className="h-4 w-4 mr-2" />
                    Join Pod
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Settings className="h-4 w-4 mr-2" />
                    Pod Settings
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function PodSkeleton({ viewMode }: { viewMode: "grid" | "list" }) {
  if (viewMode === "list") {
    return (
      <Card className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl border-white/20 dark:border-slate-700/20">
        <CardContent className="p-4 lg:p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 flex-1">
              <Skeleton className="h-12 w-12 lg:h-16 lg:w-16 rounded-full" />
              <div className="space-y-2 flex-1">
                <Skeleton className="h-4 lg:h-5 w-48" />
                <Skeleton className="h-3 lg:h-4 w-full" />
                <Skeleton className="h-3 lg:h-4 w-3/4" />
                <div className="flex gap-2">
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-24" />
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Skeleton className="h-8 w-16" />
              <Skeleton className="h-8 w-16" />
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl border-white/20 dark:border-slate-700/20">
      <CardContent className="p-4 lg:p-6">
        <div className="text-center mb-4">
          <Skeleton className="h-16 w-16 lg:h-20 lg:w-20 rounded-full mx-auto mb-3" />
          <Skeleton className="h-4 lg:h-5 w-32 mx-auto mb-2" />
          <div className="flex justify-center gap-2">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-16" />
          </div>
        </div>
        <div className="space-y-4">
          <Skeleton className="h-12 w-full" />
          <div className="grid grid-cols-2 gap-4">
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
          </div>
          <div className="flex justify-center gap-2">
            <Skeleton className="h-4 w-12" />
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-14" />
          </div>
          <div className="flex justify-between pt-4">
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-6 w-16" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default function PodsPage() {
  const [pods, setPods] = useState(mockPods)
  const [filteredPods, setFilteredPods] = useState(mockPods)
  const [isLoading, setIsLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [categoryFilter, setCategoryFilter] = useState("All")
  const [privacyFilter, setPrivacyFilter] = useState("All")
  const [statusFilter, setStatusFilter] = useState("All")
  const [sortBy, setSortBy] = useState("recent")
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
    const filtered = pods.filter((pod) => {
      const matchesSearch =
        searchTerm === "" ||
        pod.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pod.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pod.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))

      const matchesCategory = categoryFilter === "All" || pod.category === categoryFilter
      const matchesPrivacy = privacyFilter === "All" || pod.privacy === privacyFilter.toLowerCase()
      const matchesStatus = statusFilter === "All" || pod.status === statusFilter.toLowerCase()

      return matchesSearch && matchesCategory && matchesPrivacy && matchesStatus
    })

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "recent":
          return new Date(b.lastActivity).getTime() - new Date(a.lastActivity).getTime()
        case "members":
          return b.members - a.members
        case "posts":
          return b.posts - a.posts
        case "name":
          return a.name.localeCompare(b.name)
        default:
          return 0
      }
    })

    setFilteredPods(filtered)
  }, [pods, searchTerm, categoryFilter, privacyFilter, statusFilter, sortBy])

  const stats = {
    total: pods.length,
    active: pods.filter((p) => p.status === "active").length,
    public: pods.filter((p) => p.privacy === "public").length,
    totalMembers: pods.reduce((sum, pod) => sum + pod.members, 0),
  }

  return (
    <DashboardLayout>
      <div className="p-4 lg:p-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-6 lg:mb-8 gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-slate-900 dark:text-white">Pods</h1>
            <p className="text-muted-foreground">Discover and join communities of like-minded professionals</p>
          </div>
          <Button
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white w-fit"
            asChild
          >
            <Link href="/dashboard/pods/create">
              <Plus className="h-4 w-4 mr-2" />
              Create Pod
            </Link>
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-6 lg:mb-8">
          <Card className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl border-white/20 dark:border-slate-700/20 hover:shadow-lg transition-all duration-200">
            <CardContent className="p-4 lg:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs lg:text-sm font-medium text-muted-foreground">Total Pods</p>
                  <p className="text-xl lg:text-3xl font-bold text-slate-900 dark:text-white">{stats.total}</p>
                </div>
                <div className="p-2 lg:p-3 rounded-xl lg:rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600">
                  <Users className="h-4 w-4 lg:h-6 lg:w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl border-white/20 dark:border-slate-700/20 hover:shadow-lg transition-all duration-200">
            <CardContent className="p-4 lg:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs lg:text-sm font-medium text-muted-foreground">Active Pods</p>
                  <p className="text-xl lg:text-3xl font-bold text-slate-900 dark:text-white">{stats.active}</p>
                </div>
                <div className="p-2 lg:p-3 rounded-xl lg:rounded-2xl bg-gradient-to-r from-green-500 to-emerald-600">
                  <MessageSquare className="h-4 w-4 lg:h-6 lg:w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl border-white/20 dark:border-slate-700/20 hover:shadow-lg transition-all duration-200">
            <CardContent className="p-4 lg:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs lg:text-sm font-medium text-muted-foreground">Public Pods</p>
                  <p className="text-xl lg:text-3xl font-bold text-slate-900 dark:text-white">{stats.public}</p>
                </div>
                <div className="p-2 lg:p-3 rounded-xl lg:rounded-2xl bg-gradient-to-r from-purple-500 to-pink-600">
                  <Globe className="h-4 w-4 lg:h-6 lg:w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl border-white/20 dark:border-slate-700/20 hover:shadow-lg transition-all duration-200">
            <CardContent className="p-4 lg:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs lg:text-sm font-medium text-muted-foreground">Total Members</p>
                  <p className="text-xl lg:text-3xl font-bold text-slate-900 dark:text-white">{stats.totalMembers}</p>
                </div>
                <div className="p-2 lg:p-3 rounded-xl lg:rounded-2xl bg-gradient-to-r from-orange-500 to-red-600">
                  <Users className="h-4 w-4 lg:h-6 lg:w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Controls */}
        <Card className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl border-white/20 dark:border-slate-700/20 mb-6 lg:mb-8">
          <CardContent className="p-4 lg:p-6">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
                <div className="flex items-center gap-4 w-full lg:w-auto">
                  <div className="flex items-center gap-2">
                    <Button
                      variant={viewMode === "grid" ? "default" : "outline"}
                      size="icon"
                      onClick={() => setViewMode("grid")}
                      className={
                        viewMode === "grid"
                          ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                          : "bg-transparent border-slate-200"
                      }
                    >
                      <Grid3X3 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant={viewMode === "list" ? "default" : "outline"}
                      size="icon"
                      onClick={() => setViewMode("list")}
                      className={
                        viewMode === "list"
                          ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                          : "bg-transparent border-slate-200"
                      }
                    >
                      <List className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Showing {filteredPods.length} of {pods.length} pods
                </p>
              </div>

              <div className="flex flex-col lg:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search pods..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-white/50 dark:bg-white/10 border-slate-200 dark:border-slate-700"
                  />
                </div>
                <div className="flex flex-col sm:flex-row gap-2 lg:gap-4">
                  <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger className="w-full sm:w-40 bg-white/50 dark:bg-white/10 border-slate-200 dark:border-slate-700">
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border-white/20">
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={privacyFilter} onValueChange={setPrivacyFilter}>
                    <SelectTrigger className="w-full sm:w-32 bg-white/50 dark:bg-white/10 border-slate-200 dark:border-slate-700">
                      <SelectValue placeholder="Privacy" />
                    </SelectTrigger>
                    <SelectContent className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border-white/20">
                      {privacyOptions.map((privacy) => (
                        <SelectItem key={privacy} value={privacy}>
                          {privacy}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-full sm:w-32 bg-white/50 dark:bg-white/10 border-slate-200 dark:border-slate-700">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border-white/20">
                      {statusOptions.map((status) => (
                        <SelectItem key={status} value={status}>
                          {status}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-full sm:w-40 bg-white/50 dark:bg-white/10 border-slate-200 dark:border-slate-700">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border-white/20">
                      <SelectItem value="recent">Most Recent</SelectItem>
                      <SelectItem value="members">Most Members</SelectItem>
                      <SelectItem value="posts">Most Posts</SelectItem>
                      <SelectItem value="name">Name</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Pods Grid/List */}
        {isLoading ? (
          <div
            className={
              viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6" : "space-y-4"
            }
          >
            {Array.from({ length: 6 }).map((_, index) => (
              <PodSkeleton key={index} viewMode={viewMode} />
            ))}
          </div>
        ) : filteredPods.length === 0 ? (
          <Card className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl border-white/20 dark:border-slate-700/20">
            <CardContent className="p-8 lg:p-12 text-center">
              <Users className="h-8 w-8 lg:h-12 lg:w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">No pods found</h3>
              <p className="text-muted-foreground mb-6">
                {searchTerm || categoryFilter !== "All" || privacyFilter !== "All" || statusFilter !== "All"
                  ? "Try adjusting your search or filters"
                  : "No pods have been created yet"}
              </p>
              <Button
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                asChild
              >
                <Link href="/dashboard/pods/create">
                  <Plus className="h-4 w-4 mr-2" />
                  Create First Pod
                </Link>
              </Button>
            </CardContent>
          </Card>
        ) : viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
            {filteredPods.map((pod) => (
              <PodCard key={pod.id} pod={pod} viewMode={viewMode} />
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredPods.map((pod) => (
              <PodCard key={pod.id} pod={pod} viewMode={viewMode} />
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
