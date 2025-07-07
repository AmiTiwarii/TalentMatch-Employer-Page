"use client"

import { useState, useMemo } from "react"
import type { FilterOptions } from "@/components/dashboard-filters"
import { isWithinInterval, parseISO } from "date-fns"

// Mock data structure
interface ProjectData {
  id: number
  title: string
  applications: number
  status: string
  deadline: string
  matchingCandidates: number
  createdAt: string
  updatedAt: string
}

interface CandidateData {
  id: number
  name: string
  university: string
  course: string
  matchScore: number
  skills: string[]
  status: string
  appliedProject: string
  appliedAt: string
}

interface ApplicationData {
  id: number
  projectId: number
  candidateId: number
  status: string
  appliedAt: string
  reviewedAt?: string
}

interface DashboardStats {
  totalProjects: number
  activeProjects: number
  totalApplications: number
  shortlistedCandidates: number
  selectedCandidates: number
  offeredPositions: number
  projectsGrowth: number
  applicationsGrowth: number
  shortlistedGrowth: number
  offersGrowth: number
}

// Mock data generators
const generateMockProjects = (): ProjectData[] => {
  const projects: ProjectData[] = []
  const titles = [
    "Frontend Developer Intern",
    "Backend Developer",
    "UI/UX Designer",
    "Full Stack Developer",
    "Data Analyst",
    "Mobile App Developer",
    "DevOps Engineer",
    "Product Manager",
    "QA Engineer",
    "Machine Learning Engineer",
  ]

  for (let i = 0; i < 50; i++) {
    const createdDate = new Date()
    createdDate.setDate(createdDate.getDate() - Math.floor(Math.random() * 365))

    projects.push({
      id: i + 1,
      title: titles[Math.floor(Math.random() * titles.length)],
      applications: Math.floor(Math.random() * 50) + 5,
      status: Math.random() > 0.3 ? "Active" : "Closed",
      deadline: new Date(createdDate.getTime() + Math.random() * 90 * 24 * 60 * 60 * 1000).toISOString(),
      matchingCandidates: Math.floor(Math.random() * 20) + 3,
      createdAt: createdDate.toISOString(),
      updatedAt: createdDate.toISOString(),
    })
  }

  return projects
}

const generateMockApplications = (projects: ProjectData[]): ApplicationData[] => {
  const applications: ApplicationData[] = []
  let applicationId = 1

  projects.forEach((project) => {
    for (let i = 0; i < project.applications; i++) {
      const appliedDate = new Date(project.createdAt)
      appliedDate.setDate(appliedDate.getDate() + Math.floor(Math.random() * 30))

      const statuses = ["Applied", "Shortlisted", "Selected", "Offered", "Rejected"]
      const status = statuses[Math.floor(Math.random() * statuses.length)]

      applications.push({
        id: applicationId++,
        projectId: project.id,
        candidateId: Math.floor(Math.random() * 1000) + 1,
        status,
        appliedAt: appliedDate.toISOString(),
        reviewedAt: Math.random() > 0.5 ? appliedDate.toISOString() : undefined,
      })
    }
  })

  return applications
}

export function useDashboardData() {
  const [projects] = useState<ProjectData[]>(() => generateMockProjects())
  const [applications] = useState<ApplicationData[]>(() => generateMockApplications(generateMockProjects()))
  const [filters, setFilters] = useState<FilterOptions>({
    dateRange: {
      from: new Date(Date.now() - 29 * 24 * 60 * 60 * 1000),
      to: new Date(),
    },
    preset: "30days",
  })
  const [isLoading, setIsLoading] = useState(false)

  // Filter data based on date range
  const filteredData = useMemo(() => {
    if (!filters.dateRange.from || !filters.dateRange.to) {
      return { projects, applications }
    }

    const dateInterval = {
      start: filters.dateRange.from,
      end: filters.dateRange.to,
    }

    const filteredProjects = projects.filter((project) => isWithinInterval(parseISO(project.createdAt), dateInterval))

    const filteredApplications = applications.filter((application) =>
      isWithinInterval(parseISO(application.appliedAt), dateInterval),
    )

    return {
      projects: filteredProjects,
      applications: filteredApplications,
    }
  }, [projects, applications, filters])

  // Calculate dashboard statistics
  const dashboardStats = useMemo((): DashboardStats => {
    const { projects: filteredProjects, applications: filteredApplications } = filteredData

    const totalProjects = filteredProjects.length
    const activeProjects = filteredProjects.filter((p) => p.status === "Active").length
    const totalApplications = filteredApplications.length
    const shortlistedCandidates = filteredApplications.filter((a) => a.status === "Shortlisted").length
    const selectedCandidates = filteredApplications.filter((a) => a.status === "Selected").length
    const offeredPositions = filteredApplications.filter((a) => a.status === "Offered").length

    // Calculate growth percentages (mock calculation)
    const projectsGrowth = Math.floor(Math.random() * 20) - 5 // -5% to +15%
    const applicationsGrowth = Math.floor(Math.random() * 30) + 5 // +5% to +35%
    const shortlistedGrowth = Math.floor(Math.random() * 25) - 10 // -10% to +15%
    const offersGrowth = Math.floor(Math.random() * 40) - 15 // -15% to +25%

    return {
      totalProjects,
      activeProjects,
      totalApplications,
      shortlistedCandidates,
      selectedCandidates,
      offeredPositions,
      projectsGrowth,
      applicationsGrowth,
      shortlistedGrowth,
      offersGrowth,
    }
  }, [filteredData])

  // Get recent projects
  const recentProjects = useMemo(() => {
    return filteredData.projects
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 5)
  }, [filteredData.projects])

  // Get top candidates (mock data)
  const topCandidates = useMemo(() => {
    const candidates = [
      {
        id: 1,
        name: "Sarah Johnson",
        university: "MIT",
        course: "Computer Science",
        matchScore: 95,
        skills: ["React", "TypeScript", "Node.js"],
        status: "Available",
        appliedProject: "Frontend Developer Intern",
        appliedAt: new Date().toISOString(),
      },
      {
        id: 2,
        name: "Mike Chen",
        university: "Stanford",
        course: "Software Engineering",
        matchScore: 92,
        skills: ["Python", "Django", "PostgreSQL"],
        status: "Shortlisted",
        appliedProject: "Backend Developer",
        appliedAt: new Date().toISOString(),
      },
      {
        id: 3,
        name: "Emma Davis",
        university: "UC Berkeley",
        course: "Design",
        matchScore: 88,
        skills: ["Figma", "Adobe XD", "Prototyping"],
        status: "Selected",
        appliedProject: "UI/UX Designer",
        appliedAt: new Date().toISOString(),
      },
    ]

    // Filter candidates based on date range
    if (filters.dateRange.from && filters.dateRange.to) {
      const dateInterval = {
        start: filters.dateRange.from,
        end: filters.dateRange.to,
      }

      return candidates.filter((candidate) => isWithinInterval(parseISO(candidate.appliedAt), dateInterval))
    }

    return candidates
  }, [filters])

  const updateFilters = (newFilters: FilterOptions) => {
    setIsLoading(true)
    // Simulate API call delay
    setTimeout(() => {
      setFilters(newFilters)
      setIsLoading(false)
    }, 300)
  }

  return {
    dashboardStats,
    recentProjects,
    topCandidates,
    filters,
    updateFilters,
    isLoading,
  }
}
