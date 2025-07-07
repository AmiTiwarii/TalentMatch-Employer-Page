"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter, useParams } from "next/navigation"
import {
  ArrowLeft,
  Bell,
  Edit,
  Eye,
  Users,
  X,
  Copy,
  Calendar,
  Clock,
  MapPin,
  DollarSign,
  GraduationCap,
  Briefcase,
  CheckCircle,
  AlertCircle,
  FileText,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { useToast } from "@/hooks/use-toast"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar"

// Mock project data - in real app, this would come from API
const mockProject = {
  id: 1,
  title: "Frontend Developer Intern",
  role: "Frontend Developer",
  type: "Internship",
  status: "Open",
  description: `We are looking for a passionate Frontend Developer Intern to join our dynamic team. This is an excellent opportunity for students to gain hands-on experience in modern web development technologies and contribute to real-world projects.

Key Responsibilities:
• Develop responsive web applications using React and TypeScript
• Collaborate with designers to implement pixel-perfect UI components
• Write clean, maintainable code following best practices
• Participate in code reviews and team meetings
• Learn and apply modern development tools and workflows

What You'll Learn:
• Modern JavaScript frameworks (React, Next.js)
• State management with Redux/Context API
• CSS frameworks and styling methodologies
• Version control with Git and GitHub
• Agile development practices
• Testing frameworks and methodologies

This internship offers mentorship from senior developers and the opportunity to work on projects that impact thousands of users.`,
  skills: ["JavaScript", "TypeScript", "React", "HTML/CSS", "Git", "Figma", "Problem Solving"],
  duration: "3 months",
  compensation: "$1,200/month",
  location: "Remote",
  vacancies: 2,
  deadline: "2024-02-15",
  yearOfStudy: "Junior/Senior",
  eligibility:
    "Must have completed at least one web development course or have equivalent experience. Portfolio showcasing React projects preferred.",
  datePosted: "2024-01-15",
  applications: 23,
  views: 156,
  attachments: [
    { name: "Frontend_Intern_JD.pdf", size: "245 KB" },
    { name: "Company_Overview.pdf", size: "1.2 MB" },
  ],
  recentApplications: [
    { name: "Sarah Johnson", appliedDate: "2024-01-20", status: "Under Review" },
    { name: "Mike Chen", appliedDate: "2024-01-19", status: "Shortlisted" },
    { name: "Emma Davis", appliedDate: "2024-01-18", status: "New" },
  ],
}

function ProjectDetailsSkeleton() {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <Skeleton className="h-8 w-[300px]" />
        <div className="flex gap-2">
          <Skeleton className="h-6 w-[80px]" />
          <Skeleton className="h-6 w-[100px]" />
        </div>
      </div>
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-[200px]" />
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </CardContent>
      </Card>
    </div>
  )
}

function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="border-b">
        <div className="flex items-center gap-2 px-2 py-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Briefcase className="h-4 w-4" />
          </div>
          <span className="font-semibold">TechCorp</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/dashboard">
                <Users className="h-4 w-4" />
                <span>Dashboard</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive>
              <Link href="/projects">
                <Briefcase className="h-4 w-4" />
                <span>My Projects</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/applications">
                <Users className="h-4 w-4" />
                <span>Applications</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/profile">
                <Users className="h-4 w-4" />
                <span>Profile</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/settings">
                <Users className="h-4 w-4" />
                <span>Settings</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  )
}

export default function ProjectDetailsPage() {
  const [project, setProject] = useState(mockProject)
  const [isLoading, setIsLoading] = useState(false)
  const [isClosing, setIsClosing] = useState(false)
  const { toast } = useToast()
  const router = useRouter()
  const params = useParams()

  // Simulate loading project data
  useEffect(() => {
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }, [params.id])

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case "open":
        return (
          <Badge variant="default" className="bg-green-100 text-green-800 gap-1">
            <CheckCircle className="h-3 w-3" />
            Open
          </Badge>
        )
      case "closed":
        return (
          <Badge variant="outline" className="bg-gray-100 text-gray-800 gap-1">
            <X className="h-3 w-3" />
            Closed
          </Badge>
        )
      case "filled":
        return (
          <Badge variant="secondary" className="bg-blue-100 text-blue-800 gap-1">
            <CheckCircle className="h-3 w-3" />
            Filled
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const handleCloseProject = async () => {
    setIsClosing(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setProject((prev) => ({ ...prev, status: "Closed" }))
      toast({
        title: "Project Closed",
        description: "The project has been closed and is no longer accepting applications.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to close project. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsClosing(false)
    }
  }

  const handleDuplicateProject = () => {
    toast({
      title: "Project Duplicated",
      description: "A copy of this project has been created as a draft.",
    })
    router.push("/dashboard/post-project")
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const daysUntilDeadline = Math.ceil(
    (new Date(project.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24),
  )

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <SidebarInset className="flex-1">
          {/* Header */}
          <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="flex h-14 items-center justify-between px-4">
              <div className="flex items-center gap-4">
                <SidebarTrigger />
                <nav className="flex items-center space-x-1 text-sm text-muted-foreground">
                  <Link href="/dashboard" className="hover:text-foreground">
                    Home
                  </Link>
                  <span>/</span>
                  <Link href="/dashboard" className="hover:text-foreground">
                    Projects
                  </Link>
                  <span>/</span>
                  <span className="text-foreground">{project.title}</span>
                </nav>
              </div>
              <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-4 w-4" />
                  <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full text-xs"></span>
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="/placeholder-user.jpg" alt="Profile" />
                        <AvatarFallback>JD</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                    <DropdownMenuItem>Settings</DropdownMenuItem>
                    <DropdownMenuItem>Sign out</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </header>

          <div className="flex flex-1">
            {/* Main Content */}
            <main className="flex-1 p-6">
              {isLoading ? (
                <ProjectDetailsSkeleton />
              ) : (
                <div className="space-y-6">
                  {/* Header Section */}
                  <div className="flex items-start justify-between">
                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <Button variant="ghost" size="sm" asChild>
                          <Link href="/dashboard">
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Back to Projects
                          </Link>
                        </Button>
                      </div>
                      <div>
                        <h1 className="text-3xl font-bold tracking-tight">{project.title}</h1>
                        <div className="flex items-center gap-2 mt-2">
                          {getStatusBadge(project.status)}
                          <Badge variant="outline">{project.type}</Badge>
                          <span className="text-sm text-muted-foreground">
                            Posted on {formatDate(project.datePosted)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Project Overview Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="text-2xl font-bold">{project.applications}</p>
                            <p className="text-xs text-muted-foreground">Applications</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2">
                          <Eye className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="text-2xl font-bold">{project.views}</p>
                            <p className="text-xs text-muted-foreground">Views</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2">
                          <Briefcase className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="text-2xl font-bold">{project.vacancies}</p>
                            <p className="text-xs text-muted-foreground">Vacancies</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="text-2xl font-bold">{daysUntilDeadline}</p>
                            <p className="text-xs text-muted-foreground">Days left</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Project Details */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-6">
                      {/* Description */}
                      <Card>
                        <CardHeader>
                          <CardTitle>Project Description</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="prose prose-sm max-w-none">
                            {project.description.split("\n").map((paragraph, index) => (
                              <p key={index} className="mb-4 last:mb-0">
                                {paragraph}
                              </p>
                            ))}
                          </div>
                        </CardContent>
                      </Card>

                      {/* Required Skills */}
                      <Card>
                        <CardHeader>
                          <CardTitle>Required Skills</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="flex flex-wrap gap-2">
                            {project.skills.map((skill) => (
                              <Badge key={skill} variant="secondary">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </CardContent>
                      </Card>

                      {/* Project Details */}
                      <Card>
                        <CardHeader>
                          <CardTitle>Project Information</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4 text-muted-foreground" />
                              <div>
                                <p className="text-sm font-medium">Duration</p>
                                <p className="text-sm text-muted-foreground">{project.duration}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <DollarSign className="h-4 w-4 text-muted-foreground" />
                              <div>
                                <p className="text-sm font-medium">Compensation</p>
                                <p className="text-sm text-muted-foreground">{project.compensation}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <MapPin className="h-4 w-4 text-muted-foreground" />
                              <div>
                                <p className="text-sm font-medium">Location</p>
                                <p className="text-sm text-muted-foreground">{project.location}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-muted-foreground" />
                              <div>
                                <p className="text-sm font-medium">Application Deadline</p>
                                <p className="text-sm text-muted-foreground">{formatDate(project.deadline)}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <GraduationCap className="h-4 w-4 text-muted-foreground" />
                              <div>
                                <p className="text-sm font-medium">Preferred Year</p>
                                <p className="text-sm text-muted-foreground">{project.yearOfStudy}</p>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Eligibility Criteria */}
                      {project.eligibility && (
                        <Card>
                          <CardHeader>
                            <CardTitle>Eligibility Criteria</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-sm">{project.eligibility}</p>
                          </CardContent>
                        </Card>
                      )}

                      {/* Attachments */}
                      {project.attachments.length > 0 && (
                        <Card>
                          <CardHeader>
                            <CardTitle>Attachments</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-2">
                              {project.attachments.map((file, index) => (
                                <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                                  <div className="flex items-center gap-2">
                                    <FileText className="h-4 w-4" />
                                    <div>
                                      <p className="text-sm font-medium">{file.name}</p>
                                      <p className="text-xs text-muted-foreground">{file.size}</p>
                                    </div>
                                  </div>
                                  <Button variant="ghost" size="sm">
                                    Download
                                  </Button>
                                </div>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      )}
                    </div>

                    {/* Right Sidebar */}
                    <div className="space-y-6">
                      {/* Actions */}
                      <Card>
                        <CardHeader>
                          <CardTitle>Actions</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <Button className="w-full justify-start gap-2" asChild>
                            <Link href={`/dashboard/projects/${project.id}/applications`}>
                              <Users className="h-4 w-4" />
                              View Applications ({project.applications})
                            </Link>
                          </Button>
                          <Button variant="outline" className="w-full justify-start gap-2 bg-transparent" asChild>
                            <Link href={`/dashboard/projects/${project.id}/edit`}>
                              <Edit className="h-4 w-4" />
                              Edit Project
                            </Link>
                          </Button>
                          <Button
                            variant="outline"
                            className="w-full justify-start gap-2 bg-transparent"
                            onClick={handleDuplicateProject}
                          >
                            <Copy className="h-4 w-4" />
                            Duplicate Project
                          </Button>
                          {project.status === "Open" && (
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button variant="destructive" className="w-full justify-start gap-2">
                                  <X className="h-4 w-4" />
                                  Close Project
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Close Project</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Are you sure you want to close this project? This will stop accepting new
                                    applications and notify current applicants.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction onClick={handleCloseProject} disabled={isClosing}>
                                    {isClosing ? "Closing..." : "Close Project"}
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          )}
                        </CardContent>
                      </Card>

                      {/* Recent Applications */}
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center justify-between">
                            Recent Applications
                            <Button variant="ghost" size="sm" asChild>
                              <Link href={`/dashboard/projects/${project.id}/applications`}>View All</Link>
                            </Button>
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            {project.recentApplications.map((application, index) => (
                              <div key={index} className="flex items-center justify-between p-2 rounded-lg border">
                                <div>
                                  <p className="text-sm font-medium">{application.name}</p>
                                  <p className="text-xs text-muted-foreground">
                                    Applied {formatDate(application.appliedDate)}
                                  </p>
                                </div>
                                <Badge variant="outline" className="text-xs">
                                  {application.status}
                                </Badge>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>

                      {/* Project Stats */}
                      <Card>
                        <CardHeader>
                          <CardTitle>Project Statistics</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-sm">Application Rate</span>
                            <span className="text-sm font-semibold">14.7%</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm">Avg. Response Time</span>
                            <span className="text-sm font-semibold">2.3 days</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm">Quality Score</span>
                            <span className="text-sm font-semibold">4.2/5</span>
                          </div>
                          <Separator />
                          <div className="flex justify-between items-center">
                            <span className="text-sm">Total Engagement</span>
                            <span className="text-sm font-semibold text-green-600">+23%</span>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Deadline Alert */}
                      {daysUntilDeadline <= 7 && daysUntilDeadline > 0 && (
                        <Card className="border-orange-200 bg-orange-50">
                          <CardContent className="p-4">
                            <div className="flex items-start gap-2">
                              <AlertCircle className="h-4 w-4 text-orange-600 mt-0.5" />
                              <div>
                                <p className="text-sm font-medium text-orange-800">Deadline Approaching</p>
                                <p className="text-xs text-orange-700">
                                  Applications close in {daysUntilDeadline} days
                                </p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </main>
          </div>

          {/* Footer */}
          <footer className="border-t bg-background">
            <div className="container mx-auto px-4 py-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div>
                  <h3 className="font-semibold mb-3">Company</h3>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <a href="#" className="block hover:text-foreground">
                      About Us
                    </a>
                    <a href="#" className="block hover:text-foreground">
                      Careers
                    </a>
                    <a href="#" className="block hover:text-foreground">
                      Contact
                    </a>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-3">Legal</h3>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <a href="#" className="block hover:text-foreground">
                      Terms of Service
                    </a>
                    <a href="#" className="block hover:text-foreground">
                      Privacy Policy
                    </a>
                    <a href="#" className="block hover:text-foreground">
                      GDPR
                    </a>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-3">Support</h3>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <a href="#" className="block hover:text-foreground">
                      Help Center
                    </a>
                    <a href="#" className="block hover:text-foreground">
                      Documentation
                    </a>
                    <a href="#" className="block hover:text-foreground">
                      Contact Support
                    </a>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-3">Connect</h3>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <p>support@techcorp.com</p>
                    <p>+1 (555) 123-4567</p>
                    <div className="flex gap-2 mt-3">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <span className="sr-only">Twitter</span>🐦
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <span className="sr-only">LinkedIn</span>💼
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <span className="sr-only">GitHub</span>🐙
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              <Separator className="my-6" />
              <div className="flex flex-col sm:flex-row justify-between items-center text-sm text-muted-foreground">
                <p>&copy; 2024 TechCorp. All rights reserved.</p>
                <p>Made with ❤️ for connecting students and employers</p>
              </div>
            </div>
          </footer>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
