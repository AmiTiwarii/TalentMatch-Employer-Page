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
    avatar: "data:image/webp;base64,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",
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
    avatar: "https://th.bing.com/th/id/OIP.0DCcKuLAXH08gMc2vzAY3QHaFv?w=212&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
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
    avatar: "data:image/webp;base64,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",
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
    avatar: "data:image/webp;base64,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",
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
    avatar: "https://th.bing.com/th/id/OIP.nOiqIEoh5pcWAY_uRysELAHaDt?w=311&h=175&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
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
      <Card className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl dark:border-slate-700/20 hover:shadow-lg transition-all duration-200">
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
                  className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl"
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
    <Card className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl dark:border-slate-700/20 hover:shadow-lg transition-all duration-200 group h-fit">
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

          <div className="flex flex-col gap-2 pt-3 border-t dark:border-white/10">
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
                  className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl"
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
      <Card className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl dark:border-slate-700/20">
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
    <Card className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl dark:border-slate-700/20">
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
          <Card className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl dark:border-slate-700/20 hover:shadow-lg transition-all duration-200">
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
          <Card className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl dark:border-slate-700/20 hover:shadow-lg transition-all duration-200">
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
          <Card className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl dark:border-slate-700/20 hover:shadow-lg transition-all duration-200">
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
          <Card className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl dark:border-slate-700/20 hover:shadow-lg transition-all duration-200">
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
        <Card className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl dark:border-slate-700/20 mb-6 lg:mb-8">
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
                    <SelectContent className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl">
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
                    <SelectContent className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl">
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
                    <SelectContent className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl">
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
                    <SelectContent className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl">
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
          <Card className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl dark:border-slate-700/20">
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
