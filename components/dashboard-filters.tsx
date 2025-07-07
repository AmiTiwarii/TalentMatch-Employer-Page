"use client"

import { useState } from "react"
import { Calendar, ChevronDown, Filter, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"
import { format, subDays, subMonths, subYears, startOfDay, endOfDay } from "date-fns"

export interface DateRange {
  from?: Date
  to?: Date
}

export interface FilterOptions {
  dateRange: DateRange
  preset: string | null
}

interface DashboardFiltersProps {
  onFiltersChange: (filters: FilterOptions) => void
  className?: string
}

const presetRanges = [
  {
    label: "Today",
    value: "today",
    getRange: () => ({
      from: startOfDay(new Date()),
      to: endOfDay(new Date()),
    }),
  },
  {
    label: "Yesterday",
    value: "yesterday",
    getRange: () => ({
      from: startOfDay(subDays(new Date(), 1)),
      to: endOfDay(subDays(new Date(), 1)),
    }),
  },
  {
    label: "Last 7 days",
    value: "7days",
    getRange: () => ({
      from: startOfDay(subDays(new Date(), 6)),
      to: endOfDay(new Date()),
    }),
  },
  {
    label: "Last 30 days",
    value: "30days",
    getRange: () => ({
      from: startOfDay(subDays(new Date(), 29)),
      to: endOfDay(new Date()),
    }),
  },
  {
    label: "This month",
    value: "thisMonth",
    getRange: () => ({
      from: startOfDay(new Date(new Date().getFullYear(), new Date().getMonth(), 1)),
      to: endOfDay(new Date()),
    }),
  },
  {
    label: "Last month",
    value: "lastMonth",
    getRange: () => {
      const lastMonth = subMonths(new Date(), 1)
      return {
        from: startOfDay(new Date(lastMonth.getFullYear(), lastMonth.getMonth(), 1)),
        to: endOfDay(new Date(lastMonth.getFullYear(), lastMonth.getMonth() + 1, 0)),
      }
    },
  },
  {
    label: "Last 3 months",
    value: "3months",
    getRange: () => ({
      from: startOfDay(subMonths(new Date(), 3)),
      to: endOfDay(new Date()),
    }),
  },
  {
    label: "Last 6 months",
    value: "6months",
    getRange: () => ({
      from: startOfDay(subMonths(new Date(), 6)),
      to: endOfDay(new Date()),
    }),
  },
  {
    label: "This year",
    value: "thisYear",
    getRange: () => ({
      from: startOfDay(new Date(new Date().getFullYear(), 0, 1)),
      to: endOfDay(new Date()),
    }),
  },
  {
    label: "Last year",
    value: "lastYear",
    getRange: () => {
      const lastYear = subYears(new Date(), 1)
      return {
        from: startOfDay(new Date(lastYear.getFullYear(), 0, 1)),
        to: endOfDay(new Date(lastYear.getFullYear(), 11, 31)),
      }
    },
  },
]

export function DashboardFilters({ onFiltersChange, className }: DashboardFiltersProps) {
  const [dateRange, setDateRange] = useState<DateRange>({
    from: startOfDay(subDays(new Date(), 29)),
    to: endOfDay(new Date()),
  })
  const [selectedPreset, setSelectedPreset] = useState<string>("30days")
  const [isCalendarOpen, setIsCalendarOpen] = useState(false)

  const handlePresetSelect = (preset: (typeof presetRanges)[0]) => {
    const range = preset.getRange()
    setDateRange(range)
    setSelectedPreset(preset.value)
    onFiltersChange({
      dateRange: range,
      preset: preset.value,
    })
  }

  const handleCustomDateSelect = (range: DateRange | undefined) => {
    if (range) {
      setDateRange(range)
      setSelectedPreset("custom")
      onFiltersChange({
        dateRange: range,
        preset: "custom",
      })
    }
  }

  const clearFilters = () => {
    const defaultRange = presetRanges.find((p) => p.value === "30days")?.getRange()
    if (defaultRange) {
      setDateRange(defaultRange)
      setSelectedPreset("30days")
      onFiltersChange({
        dateRange: defaultRange,
        preset: "30days",
      })
    }
  }

  const formatDateRange = () => {
    if (!dateRange.from) return "Select date range"
    if (!dateRange.to) return format(dateRange.from, "MMM dd, yyyy")
    if (dateRange.from.getTime() === dateRange.to.getTime()) {
      return format(dateRange.from, "MMM dd, yyyy")
    }
    return `${format(dateRange.from, "MMM dd, yyyy")} - ${format(dateRange.to, "MMM dd, yyyy")}`
  }

  const getSelectedPresetLabel = () => {
    const preset = presetRanges.find((p) => p.value === selectedPreset)
    return preset ? preset.label : "Custom range"
  }

  return (
    <Card
      className={cn(
        "bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border-white/20 dark:border-slate-700/20",
        className,
      )}
    >
      <CardContent className="p-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-slate-600 dark:text-slate-400" />
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Filter by:</span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Preset Date Ranges */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-8 bg-transparent">
                  <Calendar className="h-3 w-3 mr-2" />
                  {getSelectedPresetLabel()}
                  <ChevronDown className="h-3 w-3 ml-2" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-48">
                {presetRanges.map((preset) => (
                  <DropdownMenuItem
                    key={preset.value}
                    onClick={() => handlePresetSelect(preset)}
                    className={cn("cursor-pointer", selectedPreset === preset.value && "bg-accent")}
                  >
                    {preset.label}
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setIsCalendarOpen(true)} className="cursor-pointer">
                  Custom range...
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Custom Date Range Picker */}
            <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className={cn(
                    "h-8 justify-start text-left font-normal",
                    selectedPreset === "custom" ? "border-blue-500 bg-blue-50 dark:bg-blue-950" : "",
                  )}
                >
                  <Calendar className="h-3 w-3 mr-2" />
                  {selectedPreset === "custom" ? formatDateRange() : "Custom range"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <CalendarComponent
                  initialFocus
                  mode="range"
                  defaultMonth={dateRange?.from}
                  selected={{ from: dateRange.from ?? undefined, to: dateRange.to ?? undefined }}
                  onSelect={handleCustomDateSelect}
                  numberOfMonths={2}
                />
                <div className="p-3 border-t">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-slate-600 dark:text-slate-400">{formatDateRange()}</p>
                    <Button size="sm" onClick={() => setIsCalendarOpen(false)}>
                      Apply
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>

            {/* Active Filters Display */}
            {selectedPreset && (
              <Badge variant="secondary" className="h-8 px-2">
                {getSelectedPresetLabel()}
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-4 w-4 p-0 ml-2 hover:bg-transparent"
                  onClick={clearFilters}
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            )}
          </div>

          {/* Clear All Filters */}
          {selectedPreset !== "30days" && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="h-8 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100"
            >
              Clear filters
            </Button>
          )}
        </div>

        {/* Quick Info */}
        <div className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-700">
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Showing data from <span className="font-medium">{formatDateRange()}</span>
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
