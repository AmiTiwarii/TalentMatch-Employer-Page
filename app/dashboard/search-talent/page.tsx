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
    avatar: "https://th.bing.com/th/id/OIP.eH3znZojLED4ybFHrMROsgHaHa?w=187&h=187&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3  ",
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
    avatar: "data:image/webp;base64,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",
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
    avatar: "https://img.freepik.com/premium-photo/indian-male-college-student-campus-with-books-bag_466689-96699.jpg?w=740",
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
    avatar: "data:image/webp;base64,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",
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
    avatar: "https://th.bing.com/th/id/OIP.RuADliUH_LlZZ9MhjqIwUgHaHa?w=186&h=186&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
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
    avatar: "https://th.bing.com/th/id/OIP.YyMKzJaamsdN-wv9ImIU7QHaLH?w=115&h=180&c=7&r=0&o=7&pid=1.7&rm=3",
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
                className="pl-10 bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl dark:border-slate-700/20"
              />
            </div>

            {/* Filter Sheet */}
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl dark:border-slate-700/20"
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
              <SelectTrigger className="w-full lg:w-[180px] bg-white/60 dark:bg-slate-800/60 backdrop-blur-xldark:border-slate-700/20">
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
              className={`bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl dark:border-slate-700/20 hover:shadow-lg transition-all duration-200 ${
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
