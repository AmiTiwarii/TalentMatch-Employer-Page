"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter, useParams } from "next/navigation"
import {
  ArrowLeft,
  Bell,
  Download,
  MessageSquare,
  UserCheck,
  UserX,
  Eye,
  Calendar,
  MapPin,
  GraduationCap,
  Briefcase,
  Star,
  ExternalLink,
  FileText,
  Mail,
  Phone,
  Globe,
  Github,
  Linkedin,
  CheckCircle,
  XCircle,
  Clock,
  Users,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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

// Mock candidate data
const mockCandidate = {
  id: 1,
  name: "Sarah Johnson",
  email: "sarah.johnson@mit.edu",
  phone: "+1 (555) 123-4567",
  avatar: "/placeholder-user.jpg",
  university: "Massachusetts Institute of Technology",
  course: "Computer Science",
  year: "Senior",
  gpa: 3.8,
  location: "Boston, MA",
  website: "https://sarahjohnson.dev",
  github: "https://github.com/sarahjohnson",
  linkedin: "https://linkedin.com/in/sarahjohnson",
  matchScore: 95,
  applicationDate: "2024-01-20",
  appliedProject: {
    id: 1,
    title: "Frontend Developer Intern",
    company: "TechCorp",
  },
  status: "Pending", // Pending, Shortlisted, Rejected
  skills: [
    { name: "JavaScript", endorsed: true, level: "Expert" },
    { name: "TypeScript", endorsed: true, level: "Advanced" },
    { name: "React", endorsed: true, level: "Expert" },
    { name: "Node.js", endorsed: false, level: "Intermediate" },
    { name: "Python", endorsed: false, level: "Beginner" },
    { name: "UI/UX Design", endorsed: true, level: "Intermediate" },
    { name: "Git", endorsed: false, level: "Advanced" },
    { name: "AWS", endorsed: false, level: "Beginner" },
  ],
  bio: "Passionate full-stack developer with 3+ years of experience building modern web applications. I love creating user-friendly interfaces and solving complex problems through code. Currently pursuing my Computer Science degree at MIT with a focus on software engineering and human-computer interaction.",
  coverLetter: `Dear TechCorp Team,

I am writing to express my strong interest in the Frontend Developer Intern position. As a senior Computer Science student at MIT with extensive experience in modern web technologies, I am excited about the opportunity to contribute to your innovative projects.

Throughout my academic journey, I have developed a solid foundation in JavaScript, TypeScript, and React, which I have applied in various personal and academic projects. My recent project, a collaborative task management application, demonstrates my ability to create intuitive user interfaces while maintaining clean, scalable code.

What particularly excites me about this opportunity is TechCorp's commitment to cutting-edge technology and user-centered design. I am eager to bring my technical skills, creative problem-solving abilities, and passion for learning to your team.

I would welcome the opportunity to discuss how my background and enthusiasm can contribute to TechCorp's continued success.

Best regards,
Sarah Johnson`,
  experience: [
    {
      title: "Frontend Developer Intern",
      company: "StartupXYZ",
      duration: "Jun 2023 - Aug 2023",
      description:
        "Developed responsive web applications using React and TypeScript. Collaborated with design team to implement pixel-perfect UI components. Improved application performance by 30% through code optimization.",
      technologies: ["React", "TypeScript", "Tailwind CSS", "Git"],
    },
    {
      title: "Web Development Teaching Assistant",
      company: "MIT",
      duration: "Sep 2023 - Present",
      description:
        "Assist students in learning web development fundamentals. Conduct weekly lab sessions and provide one-on-one mentoring. Grade assignments and provide constructive feedback.",
      technologies: ["HTML", "CSS", "JavaScript", "React"],
    },
  ],
  projects: [
    {
      title: "TaskFlow - Collaborative Task Manager",
      description: "A full-stack web application for team task management with real-time collaboration features.",
      technologies: ["React", "Node.js", "MongoDB", "Socket.io"],
      github: "https://github.com/sarahjohnson/taskflow",
      demo: "https://taskflow-demo.com",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      title: "Weather Dashboard",
      description: "A responsive weather application with location-based forecasts and interactive charts.",
      technologies: ["React", "TypeScript", "Chart.js", "Weather API"],
      github: "https://github.com/sarahjohnson/weather-dashboard",
      demo: "https://weather-dashboard-demo.com",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      title: "E-commerce Platform",
      description: "A modern e-commerce platform with payment integration and admin dashboard.",
      technologies: ["Next.js", "Stripe", "PostgreSQL", "Prisma"],
      github: "https://github.com/sarahjohnson/ecommerce",
      demo: "https://ecommerce-demo.com",
      image: "/placeholder.svg?height=200&width=300",
    },
  ],
  education: {
    degree: "Bachelor of Science in Computer Science",
    university: "Massachusetts Institute of Technology",
    graduationYear: "2024",
    gpa: 3.8,
    relevantCourses: [
      "Software Engineering",
      "Web Development",
      "Human-Computer Interaction",
      "Database Systems",
      "Algorithms and Data Structures",
    ],
  },
  documents: [
    { name: "Resume_Sarah_Johnson.pdf", size: "245 KB", type: "resume" },
    { name: "Portfolio_2024.pdf", size: "1.2 MB", type: "portfolio" },
    { name: "Transcript_MIT.pdf", size: "180 KB", type: "transcript" },
  ],
  statusHistory: [
    { status: "Applied", date: "2024-01-20", by: "System" },
    { status: "Under Review", date: "2024-01-21", by: "John Doe" },
  ],
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
            <SidebarMenuButton asChild>
              <Link href="/projects">
                <Briefcase className="h-4 w-4" />
                <span>My Projects</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive>
              <Link href="/applications">
                <Users className="h-4 w-4" />
                <span>Applications</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/dashboard/search-talent">
                <Users className="h-4 w-4" />
                <span>Search Talent</span>
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

function CandidateProfileSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Skeleton className="h-20 w-20 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-8 w-[300px]" />
          <Skeleton className="h-4 w-[200px]" />
          <Skeleton className="h-6 w-[100px]" />
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-[150px]" />
            </CardHeader>
            <CardContent className="space-y-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </CardContent>
          </Card>
        </div>
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-[100px]" />
            </CardHeader>
            <CardContent className="space-y-3">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default function CandidateProfilePage() {
  const [candidate, setCandidate] = useState(mockCandidate)
  const [isLoading, setIsLoading] = useState(false)
  const [isShortlisting, setIsShortlisting] = useState(false)
  const [isRejecting, setIsRejecting] = useState(false)
  const { toast } = useToast()
  const router = useRouter()
  const params = useParams()

  // Simulate loading candidate data
  useEffect(() => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }, [params.id])

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
        return (
          <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 gap-1">
            <Clock className="h-3 w-3" />
            Pending
          </Badge>
        )
      case "shortlisted":
        return (
          <Badge variant="default" className="bg-green-100 text-green-800 gap-1">
            <CheckCircle className="h-3 w-3" />
            Shortlisted
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

  const handleShortlist = async () => {
    setIsShortlisting(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setCandidate((prev) => ({ ...prev, status: "Shortlisted" }))
      toast({
        title: "Candidate Shortlisted",
        description: `${candidate.name} has been added to your shortlist.`,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to shortlist candidate. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsShortlisting(false)
    }
  }

  const handleReject = async () => {
    setIsRejecting(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setCandidate((prev) => ({ ...prev, status: "Rejected" }))
      toast({
        title: "Application Rejected",
        description: `${candidate.name}'s application has been rejected.`,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to reject application. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsRejecting(false)
    }
  }

  const handleMessage = () => {
    toast({
      title: "Opening Message",
      description: "Redirecting to messaging interface...",
    })
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

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
                    Applications
                  </Link>
                  <span>/</span>
                  <span className="text-foreground">{candidate.name}</span>
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

          {/* Main Content */}
          <main className="p-6">
            {isLoading ? (
              <CandidateProfileSkeleton />
            ) : (
              <div className="space-y-6">
                {/* Back Button */}
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/dashboard">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Applications
                  </Link>
                </Button>

                {/* Candidate Header */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-6">
                    <Avatar className="h-20 w-20">
                      <AvatarImage src={candidate.avatar || "/placeholder.svg"} alt={candidate.name} />
                      <AvatarFallback className="text-lg">
                        {candidate.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <h1 className="text-3xl font-bold">{candidate.name}</h1>
                        <Badge className={`${getMatchScoreColor(candidate.matchScore)} border-0`}>
                          {candidate.matchScore}% match
                        </Badge>
                        {getStatusBadge(candidate.status)}
                      </div>
                      <div className="flex items-center gap-4 text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <GraduationCap className="h-4 w-4" />
                          <span>{candidate.university}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>
                            {candidate.year} • {candidate.course}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          <span>{candidate.location}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>Applied on {formatDate(candidate.applicationDate)} for</span>
                        <Link
                          href={`/dashboard/projects/${candidate.appliedProject.id}`}
                          className="text-primary hover:underline font-medium"
                        >
                          {candidate.appliedProject.title}
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Left Column - Candidate Details */}
                  <div className="lg:col-span-2">
                    <Tabs defaultValue="overview" className="space-y-6">
                      <TabsList className="grid w-full grid-cols-4">
                        <TabsTrigger value="overview">Overview</TabsTrigger>
                        <TabsTrigger value="experience">Experience</TabsTrigger>
                        <TabsTrigger value="projects">Projects</TabsTrigger>
                        <TabsTrigger value="documents">Documents</TabsTrigger>
                      </TabsList>

                      <TabsContent value="overview" className="space-y-6">
                        {/* Bio */}
                        <Card>
                          <CardHeader>
                            <CardTitle>About</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-sm leading-relaxed">{candidate.bio}</p>
                          </CardContent>
                        </Card>

                        {/* Skills */}
                        <Card>
                          <CardHeader>
                            <CardTitle>Skills</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {candidate.skills.map((skill) => (
                                <div
                                  key={skill.name}
                                  className="flex items-center justify-between p-3 border rounded-lg"
                                >
                                  <div className="flex items-center gap-2">
                                    <span className="font-medium">{skill.name}</span>
                                    {skill.endorsed && <Star className="h-4 w-4 text-yellow-500 fill-current" />}
                                  </div>
                                  <Badge variant="outline" className="text-xs">
                                    {skill.level}
                                  </Badge>
                                </div>
                              ))}
                            </div>
                          </CardContent>
                        </Card>

                        {/* Education */}
                        <Card>
                          <CardHeader>
                            <CardTitle>Education</CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            <div>
                              <h4 className="font-semibold">{candidate.education.degree}</h4>
                              <p className="text-muted-foreground">{candidate.education.university}</p>
                              <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                                <span>Graduating {candidate.education.graduationYear}</span>
                                <span>GPA: {candidate.education.gpa}/4.0</span>
                              </div>
                            </div>
                            <div>
                              <h5 className="font-medium mb-2">Relevant Coursework</h5>
                              <div className="flex flex-wrap gap-2">
                                {candidate.education.relevantCourses.map((course) => (
                                  <Badge key={course} variant="secondary" className="text-xs">
                                    {course}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </CardContent>
                        </Card>

                        {/* Cover Letter */}
                        <Card>
                          <CardHeader>
                            <CardTitle>Cover Letter</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="prose prose-sm max-w-none">
                              {candidate.coverLetter.split("\n").map((paragraph, index) => (
                                <p key={index} className="mb-4 last:mb-0">
                                  {paragraph}
                                </p>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      </TabsContent>

                      <TabsContent value="experience" className="space-y-6">
                        {candidate.experience.map((exp, index) => (
                          <Card key={index}>
                            <CardHeader>
                              <div className="flex items-start justify-between">
                                <div>
                                  <CardTitle className="text-lg">{exp.title}</CardTitle>
                                  <p className="text-muted-foreground">{exp.company}</p>
                                </div>
                                <Badge variant="outline">{exp.duration}</Badge>
                              </div>
                            </CardHeader>
                            <CardContent className="space-y-3">
                              <p className="text-sm">{exp.description}</p>
                              <div>
                                <h5 className="font-medium mb-2">Technologies Used</h5>
                                <div className="flex flex-wrap gap-2">
                                  {exp.technologies.map((tech) => (
                                    <Badge key={tech} variant="secondary" className="text-xs">
                                      {tech}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </TabsContent>

                      <TabsContent value="projects" className="space-y-6">
                        <div className="grid gap-6">
                          {candidate.projects.map((project, index) => (
                            <Card key={index}>
                              <CardHeader>
                                <div className="flex items-start justify-between">
                                  <CardTitle className="text-lg">{project.title}</CardTitle>
                                  <div className="flex gap-2">
                                    {project.github && (
                                      <Button variant="outline" size="sm" asChild>
                                        <a href={project.github} target="_blank" rel="noopener noreferrer">
                                          <Github className="h-4 w-4 mr-1" />
                                          Code
                                        </a>
                                      </Button>
                                    )}
                                    {project.demo && (
                                      <Button variant="outline" size="sm" asChild>
                                        <a href={project.demo} target="_blank" rel="noopener noreferrer">
                                          <ExternalLink className="h-4 w-4 mr-1" />
                                          Demo
                                        </a>
                                      </Button>
                                    )}
                                  </div>
                                </div>
                              </CardHeader>
                              <CardContent className="space-y-3">
                                <p className="text-sm">{project.description}</p>
                                <div>
                                  <h5 className="font-medium mb-2">Technologies</h5>
                                  <div className="flex flex-wrap gap-2">
                                    {project.technologies.map((tech) => (
                                      <Badge key={tech} variant="secondary" className="text-xs">
                                        {tech}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </TabsContent>

                      <TabsContent value="documents" className="space-y-6">
                        <Card>
                          <CardHeader>
                            <CardTitle>Documents</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-3">
                              {candidate.documents.map((doc, index) => (
                                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                                  <div className="flex items-center gap-3">
                                    <FileText className="h-5 w-5 text-muted-foreground" />
                                    <div>
                                      <p className="font-medium">{doc.name}</p>
                                      <p className="text-xs text-muted-foreground">{doc.size}</p>
                                    </div>
                                  </div>
                                  <div className="flex gap-2">
                                    <Button variant="outline" size="sm">
                                      <Eye className="h-4 w-4 mr-1" />
                                      Preview
                                    </Button>
                                    <Button variant="outline" size="sm">
                                      <Download className="h-4 w-4 mr-1" />
                                      Download
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

                  {/* Right Column - Actions & Metadata */}
                  <div className="space-y-6">
                    {/* Action Buttons */}
                    <Card>
                      <CardHeader>
                        <CardTitle>Actions</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        {candidate.status === "Pending" && (
                          <>
                            <Button
                              className="w-full justify-start gap-2"
                              onClick={handleShortlist}
                              disabled={isShortlisting}
                            >
                              <UserCheck className="h-4 w-4" />
                              {isShortlisting ? "Shortlisting..." : "Shortlist Candidate"}
                            </Button>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button
                                  variant="destructive"
                                  className="w-full justify-start gap-2"
                                  disabled={isRejecting}
                                >
                                  <UserX className="h-4 w-4" />
                                  Reject Application
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Reject Application</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Are you sure you want to reject {candidate.name}'s application? This action cannot
                                    be undone.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction onClick={handleReject} disabled={isRejecting}>
                                    {isRejecting ? "Rejecting..." : "Reject Application"}
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </>
                        )}
                        <Button
                          variant="outline"
                          className="w-full justify-start gap-2 bg-transparent"
                          onClick={handleMessage}
                        >
                          <MessageSquare className="h-4 w-4" />
                          Send Message
                        </Button>
                        <Button variant="outline" className="w-full justify-start gap-2 bg-transparent" asChild>
                          <a href={candidate.documents[0]?.name} download>
                            <Download className="h-4 w-4" />
                            Download Resume
                          </a>
                        </Button>
                      </CardContent>
                    </Card>

                    {/* Contact Information */}
                    <Card>
                      <CardHeader>
                        <CardTitle>Contact Information</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-muted-foreground" />
                          <a href={`mailto:${candidate.email}`} className="text-sm hover:underline">
                            {candidate.email}
                          </a>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-muted-foreground" />
                          <a href={`tel:${candidate.phone}`} className="text-sm hover:underline">
                            {candidate.phone}
                          </a>
                        </div>
                        {candidate.website && (
                          <div className="flex items-center gap-2">
                            <Globe className="h-4 w-4 text-muted-foreground" />
                            <a
                              href={candidate.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm hover:underline"
                            >
                              Portfolio Website
                            </a>
                          </div>
                        )}
                        {candidate.linkedin && (
                          <div className="flex items-center gap-2">
                            <Linkedin className="h-4 w-4 text-muted-foreground" />
                            <a
                              href={candidate.linkedin}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm hover:underline"
                            >
                              LinkedIn Profile
                            </a>
                          </div>
                        )}
                        {candidate.github && (
                          <div className="flex items-center gap-2">
                            <Github className="h-4 w-4 text-muted-foreground" />
                            <a
                              href={candidate.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm hover:underline"
                            >
                              GitHub Profile
                            </a>
                          </div>
                        )}
                      </CardContent>
                    </Card>

                    {/* Application Status History */}
                    <Card>
                      <CardHeader>
                        <CardTitle>Status History</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {candidate.statusHistory.map((entry, index) => (
                            <div key={index} className="flex items-center justify-between text-sm">
                              <div>
                                <p className="font-medium">{entry.status}</p>
                                <p className="text-muted-foreground">by {entry.by}</p>
                              </div>
                              <span className="text-muted-foreground">{formatDate(entry.date)}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    {/* Quick Stats */}
                    <Card>
                      <CardHeader>
                        <CardTitle>Quick Stats</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Match Score</span>
                          <span className="text-sm font-semibold">{candidate.matchScore}%</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">GPA</span>
                          <span className="text-sm font-semibold">{candidate.gpa}/4.0</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Projects</span>
                          <span className="text-sm font-semibold">{candidate.projects.length}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Experience</span>
                          <span className="text-sm font-semibold">{candidate.experience.length} roles</span>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            )}
          </main>

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
