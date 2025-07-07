"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import {
  Search,
  Star,
  Heart,
  Bookmark,
  Eye,
  MessageSquare,
  SlidersHorizontal,
  Users,
  Award,
  Clock,
  X,
  MapPin,
  GraduationCap,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { useToast } from "@/hooks/use-toast"
import { DashboardLayout } from "@/components/dashboard-layout"

// Mock data for students
const mockStudents = [
  {
    id: 1,
    name: "Sarah Johnson",
    university: "MIT",
    major: "Computer Science",
    year: "Senior",
    location: "Boston, MA",
    avatar: "/placeholder.svg?height=80&width=80",
    skills: ["React", "TypeScript", "Node.js", "Python", "Machine Learning"],
    gpa: 3.9,
    experience: "2 years",
    projects: 8,
    rating: 4.9,
    availability: "Full-time",
    bio: "Passionate full-stack developer with experience in modern web technologies and AI/ML.",
    portfolio: "https://sarahjohnson.dev",
    github: "https://github.com/sarahj",
    linkedin: "https://linkedin.com/in/sarahj",
    saved: false,
    shortlisted: true,
  },
  {
    id: 2,
    name: "Michael Chen",
    university: "Stanford University",
    major: "Data Science",
    year: "Junior",
    location: "Palo Alto, CA",
    avatar: "/placeholder.svg?height=80&width=80",
    skills: ["Python", "R", "SQL", "TensorFlow", "Tableau"],
    gpa: 3.8,
    experience: "1.5 years",
    projects: 6,
    rating: 4.7,
    availability: "Internship",
    bio: "Data science enthusiast with strong analytical skills and experience in predictive modeling.",
    portfolio: "https://michaelchen.io",
    github: "https://github.com/mchen",
    linkedin: "https://linkedin.com/in/mchen",
    saved: true,
    shortlisted: false,
  },
  {
    id: 3,
    name: "Emma Davis",
    university: "UC Berkeley",
    major: "Design",
    year: "Senior",
    location: "Berkeley, CA",
    avatar: "/placeholder.svg?height=80&width=80",
    skills: ["Figma", "Adobe Creative Suite", "Prototyping", "User Research", "HTML/CSS"],
    gpa: 3.7,
    experience: "2.5 years",
    projects: 12,
    rating: 4.8,
    availability: "Part-time",
    bio: "Creative UX/UI designer with a passion for creating intuitive and beautiful user experiences.",
    portfolio: "https://emmadavis.design",
    github: "https://github.com/emmadesign",
    linkedin: "https://linkedin.com/in/emmadesign",
    saved: false,
    shortlisted: false,
  },
  {
    id: 4,
    name: "Alex Rodriguez",
    university: "Carnegie Mellon",
    major: "Software Engineering",
    year: "Graduate",
    location: "Pittsburgh, PA",
    avatar: "/placeholder.svg?height=80&width=80",
    skills: ["Java", "Spring Boot", "Docker", "Kubernetes", "AWS"],
    gpa: 3.9,
    experience: "3 years",
    projects: 10,
    rating: 4.9,
    availability: "Full-time",
    bio: "Backend engineer with expertise in scalable systems and cloud architecture.",
    portfolio: "https://alexrodriguez.dev",
    github: "https://github.com/alexr",
    linkedin: "https://linkedin.com/in/alexr",
    saved: true,
    shortlisted: true,
  },
  {
    id: 5,
    name: "Jessica Wang",
    university: "Harvard University",
    major: "Business Analytics",
    year: "Sophomore",
    location: "Cambridge, MA",
    avatar: "/placeholder.svg?height=80&width=80",
    skills: ["Excel", "Tableau", "R", "Statistics", "Business Intelligence"],
    gpa: 3.8,
    experience: "1 year",
    projects: 6,
    rating: 4.6,
    availability: "Internship",
    bio: "Business analytics student with strong quantitative skills and passion for data-driven insights.",
    portfolio: "https://jessicawang.io",
    github: "https://github.com/jwang",
    linkedin: "https://linkedin.com/in/jwang",
    saved: false,
    shortlisted: false,
  },
  {
    id: 6,
    name: "David Kim",
    university: "Georgia Tech",
    major: "Cybersecurity",
    year: "Junior",
    location: "Atlanta, GA",
    avatar: "/placeholder.svg?height=80&width=80",
    skills: ["Cybersecurity", "Penetration Testing", "Network Security", "Python", "Linux"],
    gpa: 3.5,
    experience: "1.5 years",
    projects: 9,
    rating: 4.5,
    availability: "Full-time",
    bio: "Cybersecurity enthusiast with hands-on experience in ethical hacking and security assessments.",
    portfolio: "https://davidkim.security",
    github: "https://github.com/dkim",
    linkedin: "https://linkedin.com/in/dkim",
    saved: false,
    shortlisted: false,
  },
]

const skillOptions = [
  "React",
  "TypeScript",
  "Node.js",
  "Python",
  "Java",
  "JavaScript",
  "HTML/CSS",
  "Machine Learning",
  "Data Science",
  "SQL",
  "AWS",
  "Docker",
  "Kubernetes",
  "Figma",
  "Adobe Creative Suite",
  "UI/UX Design",
  "Mobile Development",
  "DevOps",
]

const universityOptions = [
  "MIT",
  "Stanford University",
  "UC Berkeley",
  "Carnegie Mellon",
  "Harvard University",
  "Georgia Tech",
  "Caltech",
  "University of Washington",
  "Cornell",
  "Princeton",
]

export default function SearchTalentPage() {
  const [students, setStudents] = useState(mockStudents)
  const [filteredStudents, setFilteredStudents] = useState(mockStudents)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedSkills, setSelectedSkills] = useState<string[]>([])
  const [selectedUniversities, setSelectedUniversities] = useState<string[]>([])
  const [experienceRange, setExperienceRange] = useState([0, 5])
  const [gpaRange, setGpaRange] = useState([3.0, 4.0])
  const [availabilityFilter, setAvailabilityFilter] = useState("All")
  const [sortBy, setSortBy] = useState("rating")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const { toast } = useToast()

  // Filter and search logic
  useEffect(() => {
    const filtered = students.filter((student) => {
      const matchesSearch =
        student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.university.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.major.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.skills.some((skill) => skill.toLowerCase().includes(searchQuery.toLowerCase()))

      const matchesSkills =
        selectedSkills.length === 0 || selectedSkills.some((skill) => student.skills.includes(skill))

      const matchesUniversity = selectedUniversities.length === 0 || selectedUniversities.includes(student.university)

      const experienceYears = Number.parseFloat(student.experience.split(" ")[0])
      const matchesExperience = experienceYears >= experienceRange[0] && experienceYears <= experienceRange[1]

      const matchesGPA = student.gpa >= gpaRange[0] && student.gpa <= gpaRange[1]

      const matchesAvailability = availabilityFilter === "All" || student.availability === availabilityFilter

      return (
        matchesSearch && matchesSkills && matchesUniversity && matchesExperience && matchesGPA && matchesAvailability
      )
    })

    // Sort results
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "rating":
          return b.rating - a.rating
        case "gpa":
          return b.gpa - a.gpa
        case "experience":
          return Number.parseFloat(b.experience.split(" ")[0]) - Number.parseFloat(a.experience.split(" ")[0])
        case "projects":
          return b.projects - a.projects
        default:
          return 0
      }
    })

    setFilteredStudents(filtered)
  }, [
    students,
    searchQuery,
    selectedSkills,
    selectedUniversities,
    experienceRange,
    gpaRange,
    availabilityFilter,
    sortBy,
  ])

  const handleSaveStudent = (studentId: number) => {
    setStudents((prev) =>
      prev.map((student) => (student.id === studentId ? { ...student, saved: !student.saved } : student)),
    )
    const student = students.find((s) => s.id === studentId)
    toast({
      title: student?.saved ? "Removed from Saved" : "Student Saved",
      description: student?.saved
        ? `${student.name} has been removed from your saved list.`
        : `${student?.name} has been added to your saved list.`,
    })
  }

  const handleShortlistStudent = (studentId: number) => {
    setStudents((prev) =>
      prev.map((student) => (student.id === studentId ? { ...student, shortlisted: !student.shortlisted } : student)),
    )
    const student = students.find((s) => s.id === studentId)
    toast({
      title: student?.shortlisted ? "Removed from Shortlist" : "Student Shortlisted",
      description: student?.shortlisted
        ? `${student.name} has been removed from your shortlist.`
        : `${student?.name} has been added to your shortlist.`,
    })
  }

  const clearFilters = () => {
    setSearchQuery("")
    setSelectedSkills([])
    setSelectedUniversities([])
    setExperienceRange([0, 5])
    setGpaRange([3.0, 4.0])
    setAvailabilityFilter("All")
  }

  return (
    <DashboardLayout>
      <div className="p-4 lg:p-6">
        {/* Header */}
        <div className="mb-6 lg:mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-4 gap-4">
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-slate-900 dark:text-white">Search Talent</h1>
              <p className="text-slate-600 dark:text-slate-300 mt-2">
                Discover and connect with talented students from top universities
              </p>
            </div>
            <div className="flex items-center space-x-2 lg:space-x-4">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className={viewMode === "grid" ? "bg-blue-600 hover:bg-blue-700 text-white" : "bg-transparent"}
              >
                Grid
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("list")}
                className={viewMode === "list" ? "bg-blue-600 hover:bg-blue-700 text-white" : "bg-transparent"}
              >
                List
              </Button>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search by name, university, skills, or major..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl border-white/20 dark:border-slate-700/20"
              />
            </div>

            {/* Filter Sheet */}
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl border-white/20 dark:border-slate-700/20"
                >
                  <SlidersHorizontal className="h-4 w-4 mr-2" />
                  Filters
                  {(selectedSkills.length > 0 || selectedUniversities.length > 0 || availabilityFilter !== "All") && (
                    <Badge className="ml-2 bg-blue-500 text-white">
                      {selectedSkills.length + selectedUniversities.length + (availabilityFilter !== "All" ? 1 : 0)}
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent className="w-[90vw] sm:w-[400px] lg:w-[540px] bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>Filter Candidates</SheetTitle>
                  <SheetDescription>Refine your search to find the perfect candidates</SheetDescription>
                </SheetHeader>

                <div className="space-y-6 mt-6">
                  {/* Skills Filter */}
                  <div>
                    <Label className="text-sm font-medium mb-3 block">Skills</Label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-40 overflow-y-auto">
                      {skillOptions.map((skill) => (
                        <div key={skill} className="flex items-center space-x-2">
                          <Checkbox
                            id={skill}
                            checked={selectedSkills.includes(skill)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setSelectedSkills([...selectedSkills, skill])
                              } else {
                                setSelectedSkills(selectedSkills.filter((s) => s !== skill))
                              }
                            }}
                          />
                          <Label htmlFor={skill} className="text-sm">
                            {skill}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* University Filter */}
                  <div>
                    <Label className="text-sm font-medium mb-3 block">Universities</Label>
                    <div className="space-y-2 max-h-40 overflow-y-auto">
                      {universityOptions.map((university) => (
                        <div key={university} className="flex items-center space-x-2">
                          <Checkbox
                            id={university}
                            checked={selectedUniversities.includes(university)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setSelectedUniversities([...selectedUniversities, university])
                              } else {
                                setSelectedUniversities(selectedUniversities.filter((u) => u !== university))
                              }
                            }}
                          />
                          <Label htmlFor={university} className="text-sm">
                            {university}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Experience Range */}
                  <div>
                    <Label className="text-sm font-medium mb-3 block">
                      Experience: {experienceRange[0]} - {experienceRange[1]} years
                    </Label>
                    <Slider
                      value={experienceRange}
                      onValueChange={setExperienceRange}
                      max={5}
                      min={0}
                      step={0.5}
                      className="w-full"
                    />
                  </div>

                  {/* GPA Range */}
                  <div>
                    <Label className="text-sm font-medium mb-3 block">
                      GPA: {gpaRange[0]} - {gpaRange[1]}
                    </Label>
                    <Slider
                      value={gpaRange}
                      onValueChange={setGpaRange}
                      max={4.0}
                      min={2.0}
                      step={0.1}
                      className="w-full"
                    />
                  </div>

                  {/* Availability */}
                  <div>
                    <Label className="text-sm font-medium mb-3 block">Availability</Label>
                    <Select value={availabilityFilter} onValueChange={setAvailabilityFilter}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select availability" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="All">All</SelectItem>
                        <SelectItem value="Full-time">Full-time</SelectItem>
                        <SelectItem value="Part-time">Part-time</SelectItem>
                        <SelectItem value="Internship">Internship</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button onClick={clearFilters} variant="outline" className="w-full bg-transparent">
                    Clear All Filters
                  </Button>
                </div>
              </SheetContent>
            </Sheet>

            {/* Sort */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full lg:w-[180px] bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl border-white/20 dark:border-slate-700/20">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rating">Rating</SelectItem>
                <SelectItem value="gpa">GPA</SelectItem>
                <SelectItem value="experience">Experience</SelectItem>
                <SelectItem value="projects">Projects</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Results Count */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between mt-4 gap-4">
            <p className="text-sm text-slate-600 dark:text-slate-300">
              Showing {filteredStudents.length} of {students.length} candidates
            </p>
            {(selectedSkills.length > 0 || selectedUniversities.length > 0 || availabilityFilter !== "All") && (
              <div className="flex items-center flex-wrap gap-2">
                <span className="text-sm text-slate-600 dark:text-slate-300">Active filters:</span>
                {selectedSkills.map((skill) => (
                  <Badge key={skill} variant="secondary" className="text-xs bg-blue-100 text-blue-800">
                    {skill}
                    <X
                      className="h-3 w-3 ml-1 cursor-pointer"
                      onClick={() => setSelectedSkills(selectedSkills.filter((s) => s !== skill))}
                    />
                  </Badge>
                ))}
                {selectedUniversities.map((university) => (
                  <Badge key={university} variant="secondary" className="text-xs bg-green-100 text-green-800">
                    {university}
                    <X
                      className="h-3 w-3 ml-1 cursor-pointer"
                      onClick={() => setSelectedUniversities(selectedUniversities.filter((u) => u !== university))}
                    />
                  </Badge>
                ))}
                {availabilityFilter !== "All" && (
                  <Badge variant="secondary" className="text-xs bg-purple-100 text-purple-800">
                    {availabilityFilter}
                    <X className="h-3 w-3 ml-1 cursor-pointer" onClick={() => setAvailabilityFilter("All")} />
                  </Badge>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Results */}
        <div
          className={
            viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6" : "space-y-4"
          }
        >
          {filteredStudents.map((student) => (
            <Card
              key={student.id}
              className={`bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl border-white/20 dark:border-slate-700/20 hover:shadow-lg transition-all duration-200 ${
                viewMode === "list" ? "flex flex-row" : ""
              }`}
            >
              <CardContent
                className={`p-4 lg:p-6 ${viewMode === "list" ? "flex-1 flex items-center space-x-4 lg:space-x-6" : ""}`}
              >
                <div className={viewMode === "list" ? "flex items-center space-x-4" : "text-center mb-4"}>
                  <Avatar
                    className={
                      viewMode === "list"
                        ? "h-12 w-12 lg:h-16 lg:w-16 flex-shrink-0"
                        : "h-16 w-16 lg:h-20 lg:w-20 mx-auto"
                    }
                  >
                    <AvatarImage src={student.avatar || "/placeholder.svg"} />
                    <AvatarFallback>
                      {student.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className={viewMode === "list" ? "flex-1 min-w-0" : ""}>
                    <h3 className="font-semibold text-base lg:text-lg text-slate-900 dark:text-white">
                      {student.name}
                    </h3>
                    <div className="flex items-center gap-2 text-xs lg:text-sm text-slate-600 dark:text-slate-400 mb-1">
                      <GraduationCap className="h-3 w-3 lg:h-4 lg:w-4 flex-shrink-0" />
                      <span className="truncate">{student.university}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs lg:text-sm text-slate-600 dark:text-slate-400">
                      <MapPin className="h-3 w-3 lg:h-4 lg:w-4 flex-shrink-0" />
                      <span className="truncate">{student.location}</span>
                    </div>
                    <p className="text-slate-500 dark:text-slate-400 text-xs lg:text-sm">
                      {student.major} • {student.year}
                    </p>
                  </div>
                </div>

                <div className={viewMode === "list" ? "flex-1" : "space-y-4"}>
                  {/* Stats */}
                  <div
                    className={`grid ${viewMode === "list" ? "grid-cols-2 lg:grid-cols-4" : "grid-cols-2"} gap-2 lg:gap-4 text-center mb-4`}
                  >
                    <div>
                      <div className="flex items-center justify-center space-x-1">
                        <Star className="h-3 w-3 lg:h-4 lg:w-4 text-yellow-500" />
                        <span className="font-semibold text-slate-900 dark:text-white text-sm lg:text-base">
                          {student.rating}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400">Rating</p>
                    </div>
                    <div>
                      <div className="flex items-center justify-center space-x-1">
                        <Award className="h-3 w-3 lg:h-4 lg:w-4 text-green-500" />
                        <span className="font-semibold text-slate-900 dark:text-white text-sm lg:text-base">
                          {student.gpa}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400">GPA</p>
                    </div>
                    <div>
                      <div className="flex items-center justify-center space-x-1">
                        <Clock className="h-3 w-3 lg:h-4 lg:w-4 text-blue-500" />
                        <span className="font-semibold text-slate-900 dark:text-white text-sm lg:text-base">
                          {student.experience}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400">Experience</p>
                    </div>
                    <div>
                      <div className="flex items-center justify-center space-x-1">
                        <Users className="h-3 w-3 lg:h-4 lg:w-4 text-purple-500" />
                        <span className="font-semibold text-slate-900 dark:text-white text-sm lg:text-base">
                          {student.projects}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400">Projects</p>
                    </div>
                  </div>

                  {/* Skills */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-1 justify-center">
                      {student.skills.slice(0, viewMode === "list" ? 3 : 4).map((skill) => (
                        <Badge key={skill} variant="secondary" className="text-xs bg-slate-100 text-slate-700">
                          {skill}
                        </Badge>
                      ))}
                      {student.skills.length > (viewMode === "list" ? 3 : 4) && (
                        <Badge variant="outline" className="text-xs">
                          +{student.skills.length - (viewMode === "list" ? 3 : 4)}
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Availability */}
                  <div className="text-center mb-4">
                    <Badge className="bg-green-100 text-green-700 border-green-200 text-xs">
                      {student.availability}
                    </Badge>
                  </div>

                  {/* Bio */}
                  <p className="text-xs lg:text-sm text-slate-600 dark:text-slate-300 text-center line-clamp-2 mb-4">
                    {student.bio}
                  </p>
                </div>

                {/* Actions */}
                <div
                  className={`flex ${viewMode === "list" ? "flex-col space-y-2" : "justify-center space-x-2"} flex-wrap gap-2`}
                >
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white text-xs" asChild>
                    <Link href={`/dashboard/candidates/${student.id}`}>
                      <Eye className="h-3 w-3 lg:h-4 lg:w-4 mr-1" />
                      View Profile
                    </Link>
                  </Button>
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleSaveStudent(student.id)}
                      className={
                        student.saved
                          ? "bg-red-50 border-red-200 text-red-700"
                          : "bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl border-white/20 dark:border-slate-700/20"
                      }
                    >
                      <Heart className={`h-3 w-3 lg:h-4 lg:w-4 ${student.saved ? "fill-current" : ""}`} />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleShortlistStudent(student.id)}
                      className={
                        student.shortlisted
                          ? "bg-blue-50 border-blue-200 text-blue-700"
                          : "bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl border-white/20 dark:border-slate-700/20"
                      }
                    >
                      <Bookmark className={`h-3 w-3 lg:h-4 lg:w-4 ${student.shortlisted ? "fill-current" : ""}`} />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl border-white/20 dark:border-slate-700/20"
                    >
                      <MessageSquare className="h-3 w-3 lg:h-4 lg:w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredStudents.length === 0 && (
          <div className="text-center py-8 lg:py-12">
            <Users className="h-12 w-12 lg:h-16 lg:w-16 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
            <h3 className="text-lg lg:text-xl font-semibold text-slate-900 dark:text-white mb-2">
              No candidates found
            </h3>
            <p className="text-slate-600 dark:text-slate-300 mb-4">
              Try adjusting your search criteria or filters to find more candidates.
            </p>
            <Button
              onClick={clearFilters}
              variant="outline"
              className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl border-white/20 dark:border-slate-700/20"
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
