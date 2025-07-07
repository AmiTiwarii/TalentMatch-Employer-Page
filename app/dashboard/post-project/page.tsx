"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  ArrowLeft,
  Bell,
  Calendar,
  Upload,
  X,
  MapPin,
  Clock,
  DollarSign,
  Users,
  GraduationCap,
  FileText,
  Briefcase,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"
import { format } from "date-fns"

// Available skills for multi-select
const availableSkills = [
  "JavaScript",
  "TypeScript",
  "React",
  "Node.js",
  "Python",
  "Java",
  "C++",
  "HTML/CSS",
  "UI/UX Design",
  "Figma",
  "Adobe Creative Suite",
  "Marketing",
  "Content Writing",
  "Data Analysis",
  "SQL",
  "Machine Learning",
  "Project Management",
  "Communication",
  "Leadership",
  "Problem Solving",
  "Git",
  "AWS",
  "Docker",
  "MongoDB",
  "PostgreSQL",
]

interface FormData {
  title: string
  role: string
  projectType: string
  skills: string[]
  description: string
  duration: string
  compensation: string
  location: string
  vacancies: string
  deadline: Date | undefined
  yearOfStudy: string
  eligibility: string
  attachments: File[]
}

const initialFormData: FormData = {
  title: "",
  role: "",
  projectType: "",
  skills: [],
  description: "",
  duration: "",
  compensation: "",
  location: "",
  vacancies: "",
  deadline: undefined,
  yearOfStudy: "",
  eligibility: "",
  attachments: [],
}

export default function PostProjectPage() {
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [errors, setErrors] = useState<Partial<FormData>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isDraft, setIsDraft] = useState(false)
  const [skillInput, setSkillInput] = useState("")
  const { toast } = useToast()
  const router = useRouter()

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {}

    if (!formData.title.trim()) newErrors.title = "Project title is required"
    if (!formData.role.trim()) newErrors.role = "Role is required"
    if (!formData.projectType) newErrors.projectType = "Project type is required"
    if (formData.skills.length === 0) newErrors.skills = ["At least one skill is required"]
    if (!formData.description.trim()) newErrors.description = "Project description is required"
    if (!formData.duration) newErrors.duration = "Duration is required"
    if (!formData.location) newErrors.location = "Location is required"
    if (!formData.vacancies || Number.parseInt(formData.vacancies) < 1)
      newErrors.vacancies = "Number of vacancies must be at least 1"
    if (!formData.deadline) newErrors.deadline = new Date()

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (asDraft = false) => {
    if (!asDraft && !validateForm()) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)
    setIsDraft(asDraft)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      toast({
        title: asDraft ? "Draft Saved" : "Project Published",
        description: asDraft
          ? "Your project has been saved as a draft"
          : "Your project has been published successfully and is now visible to students",
      })

      // Redirect back to dashboard
      router.push("/dashboard")
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save project. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
      setIsDraft(false)
    }
  }

  const addSkill = (skill: string) => {
    if (skill && !formData.skills.includes(skill)) {
      setFormData((prev) => ({
        ...prev,
        skills: [...prev.skills, skill],
      }))
      setSkillInput("")
    }
  }

  const removeSkill = (skillToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((skill) => skill !== skillToRemove),
    }))
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    setFormData((prev) => ({
      ...prev,
      attachments: [...prev.attachments, ...files],
    }))
  }

  const removeFile = (fileToRemove: File) => {
    setFormData((prev) => ({
      ...prev,
      attachments: prev.attachments.filter((file) => file !== fileToRemove),
    }))
  }

  const isFormValid =
    formData.title &&
    formData.role &&
    formData.projectType &&
    formData.skills.length > 0 &&
    formData.description &&
    formData.duration &&
    formData.location &&
    formData.vacancies &&
    formData.deadline

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-14 items-center justify-between px-4 max-w-7xl mx-auto">
          <div className="flex items-center gap-4">
            <Link href="/dashboard">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Briefcase className="h-4 w-4" />
              </div>
              <span className="font-semibold">TechCorp</span>
            </div>
          </div>
          <nav className="flex items-center space-x-1 text-sm text-muted-foreground">
            <Link href="/dashboard" className="hover:text-foreground">
              Home
            </Link>
            <span>/</span>
            <Link href="/dashboard" className="hover:text-foreground">
              Dashboard
            </Link>
            <span>/</span>
            <span className="text-foreground">Post a Project</span>
          </nav>
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
      <main className="max-w-4xl mx-auto p-6">
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Post a New Project</h1>
            <p className="text-muted-foreground mt-2">Create a new opportunity to connect with talented students</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Project Details</CardTitle>
              <CardDescription>Fill in the information below to create your project listing</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Project Title */}
              <div className="space-y-2">
                <Label htmlFor="title" className="text-sm font-medium">
                  Project Title <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="title"
                  placeholder="e.g., Frontend Developer Intern"
                  value={formData.title}
                  onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                  className={cn(errors.title && "border-red-500")}
                />
                {errors.title && <p className="text-sm text-red-500">{errors.title}</p>}
              </div>

              {/* Role */}
              <div className="space-y-2">
                <Label htmlFor="role" className="text-sm font-medium">
                  Role <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="role"
                  placeholder="e.g., Frontend Developer, Marketing Intern"
                  value={formData.role}
                  onChange={(e) => setFormData((prev) => ({ ...prev, role: e.target.value }))}
                  className={cn(errors.role && "border-red-500")}
                />
                {errors.role && <p className="text-sm text-red-500">{errors.role}</p>}
              </div>

              {/* Project Type */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">
                  Project Type <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={formData.projectType}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, projectType: value }))}
                >
                  <SelectTrigger className={cn(errors.projectType && "border-red-500")}>
                    <SelectValue placeholder="Select project type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="internship">Internship</SelectItem>
                    <SelectItem value="freelance">Freelance</SelectItem>
                    <SelectItem value="capstone">Capstone Project</SelectItem>
                    <SelectItem value="job">Full-time Job</SelectItem>
                  </SelectContent>
                </Select>
                {errors.projectType && <p className="text-sm text-red-500">{errors.projectType}</p>}
              </div>

              {/* Required Skills */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">
                  Required Skills <span className="text-red-500">*</span>
                </Label>
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Type a skill and press Enter"
                      value={skillInput}
                      onChange={(e) => setSkillInput(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault()
                          addSkill(skillInput)
                        }
                      }}
                      className="flex-1"
                    />
                    <Select value="" onValueChange={addSkill}>
                      <SelectTrigger className="w-[200px]">
                        <SelectValue placeholder="Or select from list" />
                      </SelectTrigger>
                      <SelectContent>
                        {availableSkills
                          .filter((skill) => !formData.skills.includes(skill))
                          .map((skill) => (
                            <SelectItem key={skill} value={skill}>
                              {skill}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {formData.skills.map((skill) => (
                      <Badge key={skill} variant="secondary" className="gap-1">
                        {skill}
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-auto p-0 text-muted-foreground hover:text-foreground"
                          onClick={() => removeSkill(skill)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </Badge>
                    ))}
                  </div>
                </div>
                {errors.skills && <p className="text-sm text-red-500">{errors.skills[0]}</p>}
              </div>

              {/* Project Description */}
              <div className="space-y-2">
                <Label htmlFor="description" className="text-sm font-medium">
                  Project Description <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="description"
                  placeholder="Describe the project, responsibilities, and what students will learn..."
                  value={formData.description}
                  onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                  className={cn("min-h-[120px]", errors.description && "border-red-500")}
                />
                {errors.description && <p className="text-sm text-red-500">{errors.description}</p>}
              </div>

              {/* Duration and Compensation Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium">
                    Expected Duration <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    value={formData.duration}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, duration: value }))}
                  >
                    <SelectTrigger className={cn(errors.duration && "border-red-500")}>
                      <Clock className="h-4 w-4 mr-2" />
                      <SelectValue placeholder="Select duration" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-month">1 Month</SelectItem>
                      <SelectItem value="2-months">2 Months</SelectItem>
                      <SelectItem value="3-months">3 Months</SelectItem>
                      <SelectItem value="6-months">6 Months</SelectItem>
                      <SelectItem value="1-year">1 Year</SelectItem>
                      <SelectItem value="ongoing">Ongoing</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.duration && <p className="text-sm text-red-500">{errors.duration}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="compensation" className="text-sm font-medium">
                    Stipend/Compensation (Optional)
                  </Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="compensation"
                      placeholder="e.g., $1000/month, Unpaid"
                      value={formData.compensation}
                      onChange={(e) => setFormData((prev) => ({ ...prev, compensation: e.target.value }))}
                      className="pl-10"
                    />
                  </div>
                </div>
              </div>

              {/* Location and Vacancies Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium">
                    Location <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    value={formData.location}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, location: value }))}
                  >
                    <SelectTrigger className={cn(errors.location && "border-red-500")}>
                      <MapPin className="h-4 w-4 mr-2" />
                      <SelectValue placeholder="Select location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="remote">Remote</SelectItem>
                      <SelectItem value="hybrid">Hybrid</SelectItem>
                      <SelectItem value="on-site">On-site</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.location && <p className="text-sm text-red-500">{errors.location}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="vacancies" className="text-sm font-medium">
                    Number of Vacancies <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <Users className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="vacancies"
                      type="number"
                      min="1"
                      placeholder="e.g., 2"
                      value={formData.vacancies}
                      onChange={(e) => setFormData((prev) => ({ ...prev, vacancies: e.target.value }))}
                      className={cn("pl-10", errors.vacancies && "border-red-500")}
                    />
                  </div>
                  {errors.vacancies && <p className="text-sm text-red-500">{errors.vacancies}</p>}
                </div>
              </div>

              {/* Application Deadline */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">
                  Application Deadline <span className="text-red-500">*</span>
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !formData.deadline && "text-muted-foreground",
                        errors.deadline && "border-red-500",
                      )}
                    >
                      <Calendar className="mr-2 h-4 w-4" />
                      {formData.deadline ? format(formData.deadline, "PPP") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <CalendarComponent
                      mode="single"
                      selected={formData.deadline}
                      onSelect={(date) => setFormData((prev) => ({ ...prev, deadline: date }))}
                      disabled={(date) => date < new Date()}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                {errors.deadline && <p className="text-sm text-red-500">Application deadline is required</p>}
              </div>

              {/* Preferred Year of Study */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Preferred Year of Study</Label>
                <Select
                  value={formData.yearOfStudy}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, yearOfStudy: value }))}
                >
                  <SelectTrigger>
                    <GraduationCap className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Select year of study" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any Year</SelectItem>
                    <SelectItem value="freshman">Freshman</SelectItem>
                    <SelectItem value="sophomore">Sophomore</SelectItem>
                    <SelectItem value="junior">Junior</SelectItem>
                    <SelectItem value="senior">Senior</SelectItem>
                    <SelectItem value="graduate">Graduate</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Eligibility Criteria */}
              <div className="space-y-2">
                <Label htmlFor="eligibility" className="text-sm font-medium">
                  Eligibility Criteria (Optional)
                </Label>
                <Textarea
                  id="eligibility"
                  placeholder="Any specific requirements, GPA, portfolio requirements, etc."
                  value={formData.eligibility}
                  onChange={(e) => setFormData((prev) => ({ ...prev, eligibility: e.target.value }))}
                  className="min-h-[80px]"
                />
              </div>

              {/* File Attachments */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Attachments (Optional)</Label>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Input
                      type="file"
                      multiple
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="file-upload"
                    />
                    <Label
                      htmlFor="file-upload"
                      className="flex items-center gap-2 px-4 py-2 border border-dashed border-gray-300 rounded-md cursor-pointer hover:bg-gray-50"
                    >
                      <Upload className="h-4 w-4" />
                      Upload Job Description or Additional Files
                    </Label>
                  </div>
                  {formData.attachments.length > 0 && (
                    <div className="space-y-2">
                      {formData.attachments.map((file, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-md">
                          <div className="flex items-center gap-2">
                            <FileText className="h-4 w-4" />
                            <span className="text-sm">{file.name}</span>
                          </div>
                          <Button variant="ghost" size="sm" onClick={() => removeFile(file)}>
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-end">
            <Button
              variant="outline"
              onClick={() => handleSubmit(true)}
              disabled={isSubmitting}
              className="order-2 sm:order-1"
            >
              {isDraft ? "Saving Draft..." : "Save as Draft"}
            </Button>
            <Button
              onClick={() => handleSubmit(false)}
              disabled={!isFormValid || isSubmitting}
              className="order-1 sm:order-2"
            >
              {isSubmitting && !isDraft ? "Publishing..." : "Publish Project"}
            </Button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t bg-background mt-12">
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
    </div>
  )
}
