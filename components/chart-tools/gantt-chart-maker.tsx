"use client"

import * as React from "react"
import { useState, useMemo, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Copy, Check, Download, Trash2, Plus, GripVertical } from "lucide-react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface Task {
  id: string
  name: string
  startDate: string
  endDate: string
  assignee: string
  dependencies: string[]
  progress: number
  color: string
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8", "#82CA9D", "#FFC658", "#FF6B6B", "#4CAF50", "#E91E63"]

export default function GanttChartMaker() {
  const [chartTitle, setChartTitle] = useState("Project Timeline")
  const [tasks, setTasks] = useState<Task[]>([
    { id: "1", name: "Planning", startDate: "2024-01-01", endDate: "2024-01-15", assignee: "Alice", dependencies: [], progress: 100, color: COLORS[0] },
    { id: "2", name: "Design", startDate: "2024-01-10", endDate: "2024-01-25", assignee: "Bob", dependencies: ["1"], progress: 80, color: COLORS[1] },
    { id: "3", name: "Development", startDate: "2024-01-20", endDate: "2024-02-15", assignee: "Charlie", dependencies: ["2"], progress: 60, color: COLORS[2] },
    { id: "4", name: "Testing", startDate: "2024-02-10", endDate: "2024-02-25", assignee: "Diana", dependencies: ["3"], progress: 40, color: COLORS[3] },
    { id: "5", name: "Deployment", startDate: "2024-02-20", endDate: "2024-03-01", assignee: "Eve", dependencies: ["4"], progress: 20, color: COLORS[4] },
  ])
  const [showDependencies, setShowDependencies] = useState(true)
  const [showProgress, setShowProgress] = useState(true)
  const [showAssignees, setShowAssignees] = useState(true)
  const [copied, setCopied] = useState<string | null>(null)

  const addTask = useCallback(() => {
    const today = new Date().toISOString().split('T')[0]
    const nextWeek = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    const newTask: Task = {
      id: Date.now().toString(),
      name: "New Task",
      startDate: today,
      endDate: nextWeek,
      assignee: "Unassigned",
      dependencies: [],
      progress: 0,
      color: COLORS[tasks.length % COLORS.length]
    }
    setTasks(prev => [...prev, newTask])
  }, [tasks.length])

  const removeTask = useCallback((id: string) => {
    setTasks(prev => prev.filter(t => t.id !== id))
  }, [])

  const updateTask = useCallback((id: string, updates: Partial<Task>) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, ...updates } : t))
  }, [])

  const copyToClipboard = useCallback(async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(key)
      setTimeout(() => setCopied(null), 1500)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }, [])

  const downloadChart = useCallback(() => {
    alert("Download functionality would export the chart as PNG/PDF/HTML")
  }, [])

  const exportCSV = useCallback(() => {
    const headers = ["Name", "Start Date", "End Date", "Assignee", "Progress", "Dependencies"]
    const rows = tasks.map(t => [
      t.name,
      t.startDate,
      t.endDate,
      t.assignee,
      `${t.progress}%`,
      t.dependencies.join("; ")
    ])
    const csv = [headers, ...rows].map(row => row.join(",")).join("\n")
    copyToClipboard(csv, "csv")
  }, [tasks, copyToClipboard])

  const { minDate, maxDate, timelineDays } = useMemo(() => {
    if (tasks.length === 0) return { minDate: new Date(), maxDate: new Date(), timelineDays: [] }

    const dates = tasks.flatMap(t => [new Date(t.startDate), new Date(t.endDate)])
    const min = new Date(Math.min(...dates.map(d => d.getTime())))
    const max = new Date(Math.max(...dates.map(d => d.getTime())))

    // Add padding
    min.setDate(min.getDate() - 3)
    max.setDate(max.getDate() + 3)

    const days: Date[] = []
    for (let d = new Date(min); d <= max; d.setDate(d.getDate() + 1)) {
      days.push(new Date(d))
    }

    return { minDate: min, maxDate: max, timelineDays: days }
  }, [tasks])

  const getTaskPosition = useCallback((task: Task) => {
    const start = new Date(task.startDate).getTime()
    const end = new Date(task.endDate).getTime()
    const minTime = minDate.getTime()
    const maxTime = maxDate.getTime()
    const totalRange = maxTime - minTime

    const left = ((start - minTime) / totalRange) * 100
    const width = ((end - start) / totalRange) * 100

    return { left: `${left}%`, width: `${Math.max(width, 1)}%` }
  }, [minDate, maxDate])

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }

  const formatMonth = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'short', year: '2-digit' })
  }

  const months = useMemo(() => {
    const result: { month: string; start: number; width: number }[] = []
    let currentMonth = -1

    timelineDays.forEach((day, idx) => {
      const month = day.getMonth()
      if (month !== currentMonth) {
        if (currentMonth !== -1) {
          const lastMonth = result[result.length - 1]
          lastMonth.width = idx - lastMonth.start
        }
        currentMonth = month
        result.push({ month: formatMonth(day), start: idx, width: 0 })
      }
    })

    if (result.length > 0) {
      result[result.length - 1].width = timelineDays.length - result[result.length - 1].start
    }

    return result
  }, [timelineDays])

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <Label htmlFor="chart-title" className="text-base font-medium">Gantt Chart</Label>
            <Input
              id="chart-title"
              value={chartTitle}
              onChange={(e) => setChartTitle(e.target.value)}
              placeholder="Enter chart title"
              className="max-w-md"
            />
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={exportCSV}>
              <Copy className="size-4 mr-1" />
              Export CSV
            </Button>
            <Button variant="outline" size="sm" onClick={downloadChart}>
              <Download className="size-4 mr-1" />
              Download
            </Button>
          </div>
        </div>
      </section>

      {/* Options */}
      <section className="space-y-4">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <Switch
              id="show-dependencies"
              checked={showDependencies}
              onCheckedChange={setShowDependencies}
            />
            <Label htmlFor="show-dependencies" className="text-sm cursor-pointer">Show Dependencies</Label>
          </div>
          <div className="flex items-center gap-2">
            <Switch
              id="show-progress"
              checked={showProgress}
              onCheckedChange={setShowProgress}
            />
            <Label htmlFor="show-progress" className="text-sm cursor-pointer">Show Progress</Label>
          </div>
          <div className="flex items-center gap-2">
            <Switch
              id="show-assignees"
              checked={showAssignees}
              onCheckedChange={setShowAssignees}
            />
            <Label htmlFor="show-assignees" className="text-sm cursor-pointer">Show Assignees</Label>
          </div>
          <Button variant="outline" size="sm" onClick={addTask}>
            <Plus className="size-4 mr-1" />
            Add Task
          </Button>
        </div>
      </section>

      {/* Tasks Table */}
      <section className="space-y-3">
        <h3 className="text-base font-semibold">Tasks</h3>
        <div className="rounded-lg border bg-background overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-8"></TableHead>
                <TableHead>Task Name</TableHead>
                <TableHead>Start Date</TableHead>
                <TableHead>End Date</TableHead>
                <TableHead>Assignee</TableHead>
                <TableHead>Progress</TableHead>
                <TableHead>Color</TableHead>
                <TableHead className="w-10"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tasks.map((task) => (
                <TableRow key={task.id}>
                  <TableCell>
                    <GripVertical className="size-4 text-muted-foreground cursor-grab" />
                  </TableCell>
                  <TableCell>
                    <Input
                      value={task.name}
                      onChange={(e) => updateTask(task.id, { name: e.target.value })}
                      className="min-w-[150px]"
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      type="date"
                      value={task.startDate}
                      onChange={(e) => updateTask(task.id, { startDate: e.target.value })}
                      className="w-36"
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      type="date"
                      value={task.endDate}
                      onChange={(e) => updateTask(task.id, { endDate: e.target.value })}
                      className="w-36"
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      value={task.assignee}
                      onChange={(e) => updateTask(task.id, { assignee: e.target.value })}
                      className="w-32"
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Input
                        type="number"
                        value={task.progress}
                        onChange={(e) => updateTask(task.id, { progress: parseInt(e.target.value) || 0 })}
                        className="w-16"
                        min={0}
                        max={100}
                      />
                      <span className="text-sm text-muted-foreground">%</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Input
                      type="color"
                      value={task.color}
                      onChange={(e) => updateTask(task.id, { color: e.target.value })}
                      className="w-12 h-8 p-0"
                    />
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="xs" onClick={() => removeTask(task.id)}>
                      <Trash2 className="size-3.5" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </section>

      {/* Gantt Chart */}
      <section className="space-y-3">
        <h3 className="text-base font-semibold">Timeline View</h3>
        <div className="rounded-lg border bg-background p-4 overflow-x-auto">
          <div className="min-w-[800px]">
            {/* Timeline Header */}
            <div className="flex mb-2">
              <div className="w-48 shrink-0"></div>
              <div className="flex-1 relative">
                <div className="flex border-b">
                  {months.map((m, idx) => (
                    <div
                      key={idx}
                      className="border-r text-center text-sm font-medium py-2 bg-muted/50"
                      style={{ width: `${(m.width / timelineDays.length) * 100}%` }}
                    >
                      {m.month}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Task Bars */}
            <div className="space-y-1">
              {tasks.map((task, idx) => {
                const pos = getTaskPosition(task)
                return (
                  <div key={task.id} className="flex items-center h-10">
                    <div className="w-48 shrink-0 pr-4 text-sm truncate" title={task.name}>
                      {task.name}
                    </div>
                    <div className="flex-1 relative h-full">
                      {/* Grid lines */}
                      <div className="absolute inset-0 flex">
                        {timelineDays.map((_, i) => (
                          <div key={i} className="flex-1 border-r border-muted/30 h-full"></div>
                        ))}
                      </div>
                      {/* Task bar */}
                      <div
                        className="absolute h-6 top-2 rounded cursor-pointer hover:opacity-80 transition-opacity"
                        style={{
                          left: pos.left,
                          width: pos.width,
                          backgroundColor: task.color
                        }}
                        title={`${task.name}\n${task.startDate} - ${task.endDate}\n${task.assignee}\nProgress: ${task.progress}%`}
                      >
                        {showProgress && (
                          <div
                            className="absolute inset-y-0 left-0 rounded bg-black/20"
                            style={{ width: `${task.progress}%` }}
                          />
                        )}
                        {parseInt(pos.width) > 10 && (
                          <span className="absolute inset-0 flex items-center justify-center text-xs text-white font-medium truncate px-1">
                            {task.progress}%
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Legend */}
            <div className="mt-4 pt-4 border-t flex items-center gap-4 flex-wrap">
              <span className="text-sm text-muted-foreground">Legend:</span>
              {tasks.map((task) => (
                <div key={task.id} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded" style={{ backgroundColor: task.color }}></div>
                  <span className="text-sm">{task.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Summary */}
      <section className="space-y-3">
        <h3 className="text-base font-semibold">Project Summary</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="rounded-lg border bg-background p-4">
            <p className="text-sm text-muted-foreground">Total Tasks</p>
            <p className="text-2xl font-semibold">{tasks.length}</p>
          </div>
          <div className="rounded-lg border bg-background p-4">
            <p className="text-sm text-muted-foreground">Start Date</p>
            <p className="text-2xl font-semibold">{formatDate(minDate)}</p>
          </div>
          <div className="rounded-lg border bg-background p-4">
            <p className="text-sm text-muted-foreground">End Date</p>
            <p className="text-2xl font-semibold">{formatDate(maxDate)}</p>
          </div>
          <div className="rounded-lg border bg-background p-4">
            <p className="text-sm text-muted-foreground">Duration</p>
            <p className="text-2xl font-semibold">{Math.ceil((maxDate.getTime() - minDate.getTime()) / (1000 * 60 * 60 * 24))} days</p>
          </div>
        </div>
      </section>
    </div>
  )
}
