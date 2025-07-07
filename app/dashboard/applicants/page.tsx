"use client"

import { useState } from "react"
import Link from "next/link"
import {
  Search,
  MoreVertical,
  Eye,
  MessageSquare,
  Download,
  Star,
  GraduationCap,
  MapPin,
  Calendar,
  Award,
  Users,
  CheckCircle,
  XCircle,
  Clock,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/hooks/use-toast"
import { DashboardLayout } from "@/components/dashboard-layout"

interface Applicant {
  id: number
  name: string
  email: string
  avatar: string
  university: string
  course: string
  year: string
  gpa: number
  location: string
  appliedProject: string
  projectId: number
  applicationDate: string
  status: "pending" | "shortlisted" | "selected" | "rejected" | "offered"
  matchScore: number
  skills: string[]
  experience: string[]
  portfolio?: string
  resume?: string
}

const mockApplicants: Applicant[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah.johnson@mit.edu",
    avatar: "/placeholder.svg?height=40&width=40",
    university: "MIT",
    course: "Computer Science",
    year: "Senior",
    gpa: 3.8,
    location: "Boston, MA",
    appliedProject: "Frontend Developer Intern",
    projectId: 1,
    applicationDate: "2024-01-20",
    status: "pending",
    matchScore: 95,
    skills: ["React", "TypeScript", "Node.js", "Python"],
    experience: ["2 years", "3 projects", "1 internship"],
    portfolio: "https://sarahjohnson.dev",
    resume: "sarah_resume.pdf",
  },
  {
    id: 2,
    name: "Mike Chen",
    email: "mike.chen@stanford.edu",
    avatar: "/placeholder.svg?height=40&width=40",
    university: "Stanford",
    course: "Software Engineering",
    year: "Junior",
    gpa: 3.9,
    location: "Palo Alto, CA",
    appliedProject: "Backend Developer",
    projectId: 2,
    applicationDate: "2024-01-19",
    status: "shortlisted",
    matchScore: 92,
    skills: ["Python", "Django", "PostgreSQL", "AWS"],
    experience: ["1.5 years", "4 projects", "2 internships"],
    portfolio: "https://mikechen.dev",
    resume: "mike_resume.pdf",
  },
  {
    id: 3,
    name: "Emma Davis",
    email: "emma.davis@berkeley.edu",
    avatar: "/placeholder.svg?height=40&width=40",
    university: "UC Berkeley",
    course: "Design",
    year: "Senior",
    gpa: 3.7,
    location: "Berkeley, CA",
    appliedProject: "UI/UX Designer",
    projectId: 3,
    applicationDate: "2024-01-18",
    status: "selected",
    matchScore: 88,
    skills: ["Figma", "Adobe XD", "Prototyping", "User Research"],
    experience: ["2 years", "5 projects", "1 internship"],
    portfolio: "https://emmadavis.design",
    resume: "emma_resume.pdf",
  },
  {
    id: 4,
    name: "Alex Rodriguez",
    email: "alex.rodriguez@cmu.edu",
    avatar: "/placeholder.svg?height=40&width=40",
    university: "Carnegie Mellon",
    course: "Computer Science",
    year: "Junior",
    gpa: 3.6,
    location: "Pittsburgh, PA",
    appliedProject: "Full Stack Developer",
    projectId: 4,
    applicationDate: "2024-01-17",
    status: "offered",
    matchScore: 85,
    skills: ["React", "Node.js", "MongoDB", "Express"],
    experience: ["1 year", "3 projects"],
    portfolio: "https://alexrodriguez.dev",
    resume: "alex_resume.pdf",
  },
  {
    id: 5,
    name: "Lisa Wang",
    email: "lisa.wang@caltech.edu",
    avatar: "/placeholder.svg?height=40&width=40",
    university: "Caltech",
    course: "Computer Science",
    year: "Senior",
    gpa: 3.9,
    location: "Pasadena, CA",
    appliedProject: "Data Scientist Intern",
    projectId: 5,
    applicationDate: "2024-01-16",
    status: "rejected",
    matchScore: 78,
    skills: ["Python", "Machine Learning", "TensorFlow", "SQL"],
    experience: ["1.5 years", "2 projects", "1 research"],
    portfolio: "https://lisawang.ai",
    resume: "lisa_resume.pdf",
  },
]

export default function ApplicantsPage() {
  const [applicants, setApplicants] = useState(mockApplicants)
  const [selectedApplicants, setSelectedApplicants] = useState<number[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [projectFilter, setProjectFilter] = useState("all")
  const [selectedTab, setSelectedTab] = useState("all")
  const { toast } = useToast()

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 gap-1">
            <Clock className="h-3 w-3" />
            Pending
          </Badge>
        )
      case "shortlisted":
        return (
          <Badge variant="default" className="bg-blue-100 text-blue-800 gap-1">
            <Star className="h-3 w-3" />
            Shortlisted
          </Badge>
        )
      case "selected":
        return (
          <Badge variant="default" className="bg-purple-100 text-purple-800 gap-1">
            <CheckCircle className="h-3 w-3" />
            Selected
          </Badge>
        )
      case "offered":
        return (
          <Badge variant="default" className="bg-green-100 text-green-800 gap-1">
            <Award className="h-3 w-3" />
            Offered
          </Badge>
        )
      case "rejected":
        return (
          <Badge variant="destructive" className="bg-red-100 text-red-800 gap-1">
            <XCircle className="h-3 w-3" />
            Rejected
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getMatchScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600 bg-green-100"
    if (score >= 80) return "text-blue-600 bg-blue-100"
    if (score >= 70) return "text-yellow-600 bg-yellow-100"
    return "text-red-600 bg-red-100"
  }

  const handleStatusChange = (applicantId: number, newStatus: string) => {
    setApplicants((prev) =>
      prev.map((applicant) => (applicant.id === applicantId ? { ...applicant, status: newStatus as any } : applicant)),
    )

    const applicant = applicants.find((a) => a.id === applicantId)
    toast({
      title: "Status Updated",
      description: `${applicant?.name} has been ${newStatus}.`,
    })
  }

  const handleBulkAction = (action: string) => {
    if (selectedApplicants.length === 0) {
      toast({
        title: "No Selection",
        description: "Please select applicants first.",
        variant: "destructive",
      })
      return
    }

    setApplicants((prev) =>
      prev.map((applicant) =>
        selectedApplicants.includes(applicant.id) ? { ...applicant, status: action as any } : applicant,
      ),
    )

    toast({
      title: "Bulk Action Completed",
      description: `${selectedApplicants.length} applicants have been ${action}.`,
    })

    setSelectedApplicants([])
  }

  const handleRecommend = (applicantId: number) => {
    const applicant = applicants.find((a) => a.id === applicantId)
    toast({
      title: "Student Recommended",
      description: `${applicant?.name} has been recommended for similar projects.`,
    })
  }

  const handleSelectApplicant = (applicantId: number) => {
    setSelectedApplicants((prev) =>
      prev.includes(applicantId) ? prev.filter((id) => id !== applicantId) : [...prev, applicantId],
    )
  }

  const handleSelectAll = () => {
    const filteredApplicants = getFilteredApplicants()
    if (selectedApplicants.length === filteredApplicants.length) {
      setSelectedApplicants([])
    } else {
      setSelectedApplicants(filteredApplicants.map((a) => a.id))
    }
  }

  const getFilteredApplicants = () => {
    return applicants.filter((applicant) => {
      const matchesSearch =
        applicant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        applicant.university.toLowerCase().includes(searchQuery.toLowerCase()) ||
        applicant.appliedProject.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesStatus = statusFilter === "all" || applicant.status === statusFilter
      const matchesProject = projectFilter === "all" || applicant.appliedProject === projectFilter
      const matchesTab = selectedTab === "all" || applicant.status === selectedTab

      return matchesSearch && matchesStatus && matchesProject && matchesTab
    })
  }

  const filteredApplicants = getFilteredApplicants()
  const statusCounts = {
    all: applicants.length,
    pending: applicants.filter((a) => a.status === "pending").length,
    shortlisted: applicants.filter((a) => a.status === "shortlisted").length,
    selected: applicants.filter((a) => a.status === "selected").length,
    offered: applicants.filter((a) => a.status === "offered").length,
    rejected: applicants.filter((a) => a.status === "rejected").length,
  }

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Applications</h1>
            <p className="text-slate-600 dark:text-slate-400 mt-1">Manage and review candidate applications</p>
          </div>
          <div className="flex items-center gap-2">
            {selectedApplicants.length > 0 && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="gap-2 bg-transparent">
                    <Users className="h-4 w-4" />
                    Bulk Actions ({selectedApplicants.length})
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => handleBulkAction("shortlisted")}>
                    <Star className="h-4 w-4 mr-2" />
                    Shortlist Selected
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleBulkAction("selected")}>
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Select for Interview
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleBulkAction("offered")}>
                    <Award className="h-4 w-4 mr-2" />
                    Make Offers
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => handleBulkAction("rejected")} className="text-red-600">
                    <XCircle className="h-4 w-4 mr-2" />
                    Reject Selected
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>

        {/* Filters */}
        <Card className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border-white/20 dark:border-slate-700/20">
          <CardContent className="p-4">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <Input
                    placeholder="Search by name, university, or project..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-white/70 dark:bg-slate-700/70 border-white/20 dark:border-slate-600/20"
                  />
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full sm:w-[150px] bg-white/70 dark:bg-slate-700/70">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="shortlisted">Shortlisted</SelectItem>
                    <SelectItem value="selected">Selected</SelectItem>
                    <SelectItem value="offered">Offered</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={projectFilter} onValueChange={setProjectFilter}>
                  <SelectTrigger className="w-full sm:w-[200px] bg-white/70 dark:bg-slate-700/70">
                    <SelectValue placeholder="Project" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Projects</SelectItem>
                    <SelectItem value="Frontend Developer Intern">Frontend Developer</SelectItem>
                    <SelectItem value="Backend Developer">Backend Developer</SelectItem>
                    <SelectItem value="UI/UX Designer">UI/UX Designer</SelectItem>
                    <SelectItem value="Full Stack Developer">Full Stack Developer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Status Tabs */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6">
            <TabsTrigger value="all" className="text-xs sm:text-sm">
              All ({statusCounts.all})
            </TabsTrigger>
            <TabsTrigger value="pending" className="text-xs sm:text-sm">
              Pending ({statusCounts.pending})
            </TabsTrigger>
            <TabsTrigger value="shortlisted" className="text-xs sm:text-sm">
              Shortlisted ({statusCounts.shortlisted})
            </TabsTrigger>
            <TabsTrigger value="selected" className="text-xs sm:text-sm">
              Selected ({statusCounts.selected})
            </TabsTrigger>
            <TabsTrigger value="offered" className="text-xs sm:text-sm">
              Offered ({statusCounts.offered})
            </TabsTrigger>
            <TabsTrigger value="rejected" className="text-xs sm:text-sm">
              Rejected ({statusCounts.rejected})
            </TabsTrigger>
          </TabsList>

          <TabsContent value={selectedTab} className="space-y-4">
            {/* Select All */}
            {filteredApplicants.length > 0 && (
              <div className="flex items-center gap-2 p-4 bg-white/50 dark:bg-slate-800/50 rounded-lg border border-white/20 dark:border-slate-700/20">
                <Checkbox
                  checked={selectedApplicants.length === filteredApplicants.length}
                  onCheckedChange={handleSelectAll}
                />
                <span className="text-sm text-slate-600 dark:text-slate-400">
                  Select all {filteredApplicants.length} applicants
                </span>
              </div>
            )}

            {/* Applicants List */}
            <div className="space-y-4">
              {filteredApplicants.map((applicant) => (
                <Card
                  key={applicant.id}
                  className={`bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm  dark:border-slate-700/20 transition-all hover:shadow-lg ${
                    selectedApplicants.includes(applicant.id) ? "ring-2 ring-blue-500" : ""
                  }`}
                >
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                      <div className="flex items-center gap-2">
                        <Checkbox
                          checked={selectedApplicants.includes(applicant.id)}
                          onCheckedChange={() => handleSelectApplicant(applicant.id)}
                        />
                      </div>

                      <div className="flex items-center gap-4 flex-1">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={applicant.avatar || "/placeholder.svg"} />
                          <AvatarFallback className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                            {applicant.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>

                        <div className="flex-1 min-w-0">
                          <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                            <h3 className="font-semibold text-slate-900 dark:text-white">{applicant.name}</h3>
                            <div className="flex items-center gap-2">
                              {getStatusBadge(applicant.status)}
                              <Badge className={`${getMatchScoreColor(applicant.matchScore)} border-0`}>
                                {applicant.matchScore}% match
                              </Badge>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 text-sm text-slate-600 dark:text-slate-400">
                            <div className="flex items-center gap-1">
                              <GraduationCap className="h-4 w-4" />
                              <span>
                                {applicant.course} • {applicant.university}
                              </span>
                            </div>
                            <div className="flex items-center gap-1">
                              <MapPin className="h-4 w-4" />
                              <span>{applicant.location}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              <span>Applied {new Date(applicant.applicationDate).toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Award className="h-4 w-4" />
                              <span>GPA: {applicant.gpa}</span>
                            </div>
                          </div>

                          <div className="mt-3">
                            <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                              Applied for:{" "}
                              <span className="font-medium text-slate-900 dark:text-white">
                                {applicant.appliedProject}
                              </span>
                            </p>
                            <div className="flex flex-wrap gap-1">
                              {applicant.skills.slice(0, 4).map((skill) => (
                                <Badge key={skill} variant="secondary" className="text-xs">
                                  {skill}
                                </Badge>
                              ))}
                              {applicant.skills.length > 4 && (
                                <Badge variant="secondary" className="text-xs">
                                  +{applicant.skills.length - 4} more
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/dashboard/candidates/${applicant.id}`}>
                            <Eye className="h-4 w-4 mr-1" />
                            View Profile
                          </Link>
                        </Button>

                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            {applicant.status === "pending" && (
                              <>
                                <DropdownMenuItem onClick={() => handleStatusChange(applicant.id, "shortlisted")}>
                                  <Star className="h-4 w-4 mr-2" />
                                  Shortlist
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleStatusChange(applicant.id, "selected")}>
                                  <CheckCircle className="h-4 w-4 mr-2" />
                                  Select for Interview
                                </DropdownMenuItem>
                              </>
                            )}
                            {applicant.status === "shortlisted" && (
                              <>
                                <DropdownMenuItem onClick={() => handleStatusChange(applicant.id, "selected")}>
                                  <CheckCircle className="h-4 w-4 mr-2" />
                                  Select for Interview
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleStatusChange(applicant.id, "offered")}>
                                  <Award className="h-4 w-4 mr-2" />
                                  Make Offer
                                </DropdownMenuItem>
                              </>
                            )}
                            {applicant.status === "selected" && (
                              <DropdownMenuItem onClick={() => handleStatusChange(applicant.id, "offered")}>
                                <Award className="h-4 w-4 mr-2" />
                                Make Offer
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuItem onClick={() => handleRecommend(applicant.id)}>
                              <Users className="h-4 w-4 mr-2" />
                              Recommend for Other Projects
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <MessageSquare className="h-4 w-4 mr-2" />
                              Send Message
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Download className="h-4 w-4 mr-2" />
                              Download Resume
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={() => handleStatusChange(applicant.id, "rejected")}
                              className="text-red-600"
                            >
                              <XCircle className="h-4 w-4 mr-2" />
                              Reject Application
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredApplicants.length === 0 && (
              <Card className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border-white/20 dark:border-slate-700/20">
                <CardContent className="p-12 text-center">
                  <Users className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">No applicants found</h3>
                  <p className="text-slate-600 dark:text-slate-400">Try adjusting your filters or search criteria.</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
