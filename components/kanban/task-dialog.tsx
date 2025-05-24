"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"
import { useKanban } from "./kanban-context"
import type { Priority } from "@/lib/types"
import { mockUsers } from "@/lib/mock-data"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar, Clock, Pencil, Trash2 } from "lucide-react"
import { format } from "date-fns"

const availableLabels = ["Feature", "Bug", "Enhancement", "Documentation", "Design", "Backend", "Frontend"]

const priorityColors: Record<Priority, string> = {
    low: "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100",
    medium: "bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100",
    high: "bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100",
    urgent: "bg-red-500 text-white dark:bg-red-600 dark:text-white",
}

const labelColors = [
    "bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100",
    "bg-purple-100 text-purple-800 dark:bg-purple-800 dark:text-purple-100",
    "bg-pink-100 text-pink-800 dark:bg-pink-800 dark:text-pink-100",
    "bg-orange-100 text-orange-800 dark:bg-orange-800 dark:text-orange-100",
]

export function TaskDialog() {
    const {
        isAddingTask,
        editingTask,
        viewingTask,
        setIsAddingTask,
        setEditingTask,
        setViewingTask,
        addTask,
        updateTask,
        columns,
        deleteTask,
    } = useKanban()
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [priority, setPriority] = useState<Priority>("medium")
    const [columnId, setColumnId] = useState("")
    const [labels, setLabels] = useState<string[]>([])
    const [assigneeIds, setAssigneeIds] = useState<string[]>([])
    const [dueDate, setDueDate] = useState("")
    const [estimatedTime, setEstimatedTime] = useState("")
    const [isViewMode, setIsViewMode] = useState(false)

    useEffect(() => {
        if (editingTask) {
            setTitle(editingTask.title)
            setDescription(editingTask.description)
            setPriority(editingTask.priority)
            setColumnId(editingTask.columnId)
            setLabels(editingTask.labels)
            setAssigneeIds(editingTask.assignees.map((a) => a.id))
            setDueDate(editingTask.dueDate || "")
            setEstimatedTime(editingTask.estimatedTime || "")
            setIsViewMode(false)
        } else if (viewingTask) {
            setTitle(viewingTask.title)
            setDescription(viewingTask.description)
            setPriority(viewingTask.priority)
            setColumnId(viewingTask.columnId)
            setLabels(viewingTask.labels)
            setAssigneeIds(viewingTask.assignees.map((a) => a.id))
            setDueDate(viewingTask.dueDate || "")
            setEstimatedTime(viewingTask.estimatedTime || "")
            setIsViewMode(true)
        } else {
            setColumnId(columns[0]?.id || "")
            setIsViewMode(false)
        }
    }, [editingTask, viewingTask, columns])

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        const taskData = {
            title,
            description,
            priority,
            columnId,
            labels,
            assignees: mockUsers.filter((u) => assigneeIds.includes(u.id)),
            dueDate: dueDate || undefined,
            estimatedTime: estimatedTime || undefined,
        }

        if (editingTask) {
            updateTask(editingTask.id, taskData)
        } else {
            // @ts-ignore
            addTask(taskData)
        }

        handleClose()
    }

    const handleClose = () => {
        setIsAddingTask(false)
        setEditingTask(null)
        setViewingTask(null)

        setTitle("")
        setDescription("")
        setPriority("medium")
        setLabels([])
        setAssigneeIds([])
        setDueDate("")
        setEstimatedTime("")
        setIsViewMode(false)
    }

    const handleDelete = () => {
        if (editingTask) {
            deleteTask(editingTask.id)
            handleClose()
        } else if (viewingTask) {
            deleteTask(viewingTask.id)
            handleClose()
        }
    }

    const toggleLabel = (label: string) => {
        setLabels((prev) => (prev.includes(label) ? prev.filter((l) => l !== label) : [...prev, label]))
    }

    const toggleAssignee = (userId: string) => {
        setAssigneeIds((prev) => (prev.includes(userId) ? prev.filter((id) => id !== userId) : [...prev, userId]))
    }

    const getColumnName = (id: string) => {
        const column = columns.find((c) => c.id === id)
        return column?.title || id
    }

    const switchToEditMode = () => {
        if (viewingTask) {
            setEditingTask(viewingTask)
            setViewingTask(null)
        }
        setIsViewMode(false)
    }

    return (
        <Dialog open={isAddingTask || !!editingTask || !!viewingTask} onOpenChange={handleClose}>
            <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>{isAddingTask ? "Create New Task" : isViewMode ? "Task Details" : "Edit Task"}</DialogTitle>
                </DialogHeader>

                {isViewMode ? (
                    <div className="space-y-6">
                        <div>
                            <h2 className="text-xl font-semibold mb-2">{title}</h2>
                            <div className="flex flex-wrap gap-2 mb-4">
                                <Badge className={priorityColors[priority]}>{priority}</Badge>
                                <Badge className="bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200">
                                    {getColumnName(columnId)}
                                </Badge>
                                {labels.map((label, index) => (
                                    <Badge key={label} variant="secondary" className={labelColors[index % labelColors.length]}>
                                        {label}
                                    </Badge>
                                ))}
                            </div>

                            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-md mb-4">
                                <p className="whitespace-pre-wrap">{description || "No description provided."}</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                {dueDate && (
                                    <div>
                                        <h3 className="text-sm font-medium mb-1">Due Date</h3>
                                        <div className="flex items-center">
                                            <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                                            <span>{format(new Date(dueDate), "MMMM d, yyyy")}</span>
                                        </div>
                                    </div>
                                )}

                                {estimatedTime && (
                                    <div>
                                        <h3 className="text-sm font-medium mb-1">Estimated Time</h3>
                                        <div className="flex items-center">
                                            <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                                            <span>{estimatedTime}</span>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div>
                                <h3 className="text-sm font-medium mb-2">Assignees</h3>
                                <div className="flex flex-wrap gap-2">
                                    {mockUsers
                                        .filter((user) => assigneeIds.includes(user.id))
                                        .map((user) => (
                                            <div
                                                key={user.id}
                                                className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 p-2 rounded-md"
                                            >
                                                <Avatar className="h-6 w-6">
                                                    <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                                                    <AvatarFallback>
                                                        {user.name
                                                            .split(" ")
                                                            .map((n) => n[0])
                                                            .join("")}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <span className="text-sm">{user.name}</span>
                                            </div>
                                        ))}
                                    {assigneeIds.length === 0 && <p className="text-sm text-muted-foreground">No assignees</p>}
                                </div>
                            </div>

                            <div className="flex justify-end gap-2 mt-6">
                                <Button variant="outline" onClick={handleClose}>
                                    Close
                                </Button>
                                <Button variant="destructive" onClick={handleDelete}>
                                    <Trash2 className="h-4 w-4 mr-2" />
                                    Delete
                                </Button>
                                <Button onClick={switchToEditMode}>
                                    <Pencil className="h-4 w-4 mr-2" />
                                    Edit
                                </Button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="title">Title</Label>
                            <Input
                                id="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Enter task title"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                                id="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Enter task description"
                                rows={3}
                            />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="priority">Priority</Label>
                                <Select value={priority} onValueChange={(value) => setPriority(value as Priority)}>
                                    <SelectTrigger id="priority">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="low">Low</SelectItem>
                                        <SelectItem value="medium">Medium</SelectItem>
                                        <SelectItem value="high">High</SelectItem>
                                        <SelectItem value="urgent">Urgent</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="column">Column</Label>
                                <Select value={columnId} onValueChange={setColumnId}>
                                    <SelectTrigger id="column">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {columns.map((column) => (
                                            <SelectItem key={column.id} value={column.id}>
                                                {column.title}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label>Labels</Label>
                            <div className="flex flex-wrap gap-2">
                                {availableLabels.map((label) => (
                                    <Badge
                                        key={label}
                                        variant={labels.includes(label) ? "default" : "outline"}
                                        className="cursor-pointer"
                                        onClick={() => toggleLabel(label)}
                                    >
                                        {label}
                                        {labels.includes(label) && <X className="ml-1 h-3 w-3" />}
                                    </Badge>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label>Assignees</Label>
                            <div className="flex flex-wrap gap-2">
                                {mockUsers.map((user) => (
                                    <Badge
                                        key={user.id}
                                        variant={assigneeIds.includes(user.id) ? "default" : "outline"}
                                        className="cursor-pointer"
                                        onClick={() => toggleAssignee(user.id)}
                                    >
                                        {user.name}
                                        {assigneeIds.includes(user.id) && <X className="ml-1 h-3 w-3" />}
                                    </Badge>
                                ))}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="dueDate">Due Date</Label>
                                <Input id="dueDate" type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="estimatedTime">Estimated Time</Label>
                                <Input
                                    id="estimatedTime"
                                    value={estimatedTime}
                                    onChange={(e) => setEstimatedTime(e.target.value)}
                                    placeholder="e.g., 2h, 1d"
                                />
                            </div>
                        </div>

                        <div className="flex justify-end gap-2">
                            <Button type="button" variant="outline" onClick={handleClose}>
                                Cancel
                            </Button>
                            <Button type="submit">{editingTask ? "Update Task" : "Create Task"}</Button>
                        </div>
                    </form>
                )}
            </DialogContent>
        </Dialog>
    )
}
