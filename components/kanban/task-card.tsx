"use client"

import type React from "react"

import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import type { Task } from "@/lib/types"
import { Calendar, Clock, MoreVertical, Pencil, Trash2, GripVertical } from "lucide-react"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { useKanban } from "./kanban-context"

interface TaskCardProps {
    task: Task
    isDragging?: boolean
}

const priorityColors = {
    low: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
    medium: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
    high: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
    urgent: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
}

const labelColors = [
    "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
    "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200",
    "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200",
]

export function TaskCard({ task, isDragging }: TaskCardProps) {
    const { setEditingTask, deleteTask, setViewingTask } = useKanban()
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging: isSortableDragging,
    } = useSortable({ id: task.id })

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    }

    const handleEdit = (e: React.MouseEvent) => {
        e.stopPropagation()
        e.preventDefault()
        setEditingTask(task)
    }

    const handleDelete = (e: React.MouseEvent) => {
        e.stopPropagation()
        e.preventDefault()
        deleteTask(task.id)
    }

    const handleCardClick = (e: React.MouseEvent) => {
        e.stopPropagation()
        e.preventDefault()
        setViewingTask(task)
    }

    const getColumnName = () => {
        const columnMap: Record<string, string> = {
            todo: "To Do",
            "in-progress": "In Progress",
            review: "Review",
            done: "Done",
        }
        return columnMap[task.columnId] || task.columnId
    }

    const getStatusColor = () => {
        const statusColors: Record<string, string> = {
            todo: "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200",
            "in-progress": "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
            review: "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200",
            done: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
        }
        return statusColors[task.columnId] || "bg-slate-100 text-slate-800"
    }

    return (
        <div ref={setNodeRef} style={style} className={cn("", (isDragging || isSortableDragging) && "opacity-50")}>
            <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={handleCardClick}>
                <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                        <h4 className="font-medium text-sm line-clamp-2 flex-1 mr-2">{task.title}</h4>
                        <div className="flex items-center gap-1">
                            <div
                                className="cursor-grab active:cursor-grabbing p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
                                {...attributes}
                                {...listeners}
                            >
                                <GripVertical className="h-4 w-4 text-gray-400" />
                            </div>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon" className="h-6 w-6" onClick={(e) => e.stopPropagation()}>
                                        <MoreVertical className="h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem onClick={handleEdit}>
                                        <Pencil className="mr-2 h-4 w-4" />
                                        Edit
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={handleDelete} className="text-red-600">
                                        <Trash2 className="mr-2 h-4 w-4" />
                                        Delete
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="pt-0">
                    <p className="text-xs text-muted-foreground line-clamp-2 mb-3">{task.description}</p>

                    <div className="flex flex-wrap gap-1 mb-3">
                        <Badge className={cn("text-xs", priorityColors[task.priority])}>{task.priority}</Badge>
                        <Badge className={cn("text-xs", getStatusColor())}>{getColumnName()}</Badge>
                        {task.labels.map((label, index) => (
                            <Badge key={label} variant="secondary" className={cn("text-xs", labelColors[index % labelColors.length])}>
                                {label}
                            </Badge>
                        ))}
                    </div>

                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <div className="flex items-center gap-3">
                            {task.dueDate && (
                                <div className="flex items-center gap-1">
                                    <Calendar className="h-3 w-3" />
                                    <span>{format(new Date(task.dueDate), "MMM d")}</span>
                                </div>
                            )}
                            {task.estimatedTime && (
                                <div className="flex items-center gap-1">
                                    <Clock className="h-3 w-3" />
                                    <span>{task.estimatedTime}</span>
                                </div>
                            )}
                        </div>

                        <div className="flex -space-x-2">
                            {task.assignees.map((assignee) => (
                                <Avatar key={assignee.id} className="h-6 w-6 border-2 border-white dark:border-gray-800">
                                    <AvatarImage src={assignee.avatar || "/placeholder.svg"} alt={assignee.name} />
                                    <AvatarFallback className="text-xs">
                                        {assignee.name
                                            .split(" ")
                                            .map((n) => n[0])
                                            .join("")}
                                    </AvatarFallback>
                                </Avatar>
                            ))}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
