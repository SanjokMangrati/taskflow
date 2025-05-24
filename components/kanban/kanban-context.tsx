"use client"

import type React from "react"
import { createContext, useContext, useState, useCallback } from "react"
import type { Task, Column } from "@/lib/types"
import { initialColumns, initialTasks } from "@/lib/mock-data"

interface KanbanContextType {
    columns: Column[]
    tasks: Task[]
    searchQuery: string
    isAddingTask: boolean
    editingTask: Task | null
    viewingTask: Task | null
    setSearchQuery: (query: string) => void
    setIsAddingTask: (isAdding: boolean) => void
    setEditingTask: (task: Task | null) => void
    setViewingTask: (task: Task | null) => void
    moveTask: (taskId: string, newColumnId: string, newIndex: number) => void
    addTask: (task: Omit<Task, "id">) => void
    updateTask: (taskId: string, updates: Partial<Task>) => void
    deleteTask: (taskId: string) => void
}

const KanbanContext = createContext<KanbanContextType | undefined>(undefined)

export function KanbanProvider({ children }: { children: React.ReactNode }) {
    const [columns] = useState<Column[]>(initialColumns)
    const [tasks, setTasks] = useState<Task[]>(initialTasks)
    const [searchQuery, setSearchQuery] = useState("")
    const [isAddingTask, setIsAddingTask] = useState(false)
    const [editingTask, setEditingTask] = useState<Task | null>(null)
    const [viewingTask, setViewingTask] = useState<Task | null>(null)

    const moveTask = useCallback((taskId: string, newColumnId: string, newIndex: number) => {
        setTasks((prevTasks) => {
            const taskIndex = prevTasks.findIndex((t) => t.id === taskId)
            if (taskIndex === -1) return prevTasks

            const newTasks = [...prevTasks]
            const [movedTask] = newTasks.splice(taskIndex, 1)

            // Update the column
            movedTask.columnId = newColumnId

            // Find the correct position to insert
            const tasksInColumn = newTasks.filter((t) => t.columnId === newColumnId)
            const insertIndex = prevTasks.indexOf(tasksInColumn[newIndex] || tasksInColumn[tasksInColumn.length - 1]) + 1

            newTasks.splice(insertIndex, 0, movedTask)

            return newTasks
        })
    }, [])

    const addTask = useCallback((task: Omit<Task, "id">) => {
        const newTask: Task = {
            ...task,
            id: `task-${Date.now()}`,
        }
        setTasks((prev) => [...prev, newTask])
        setIsAddingTask(false)
    }, [])

    const updateTask = useCallback((taskId: string, updates: Partial<Task>) => {
        setTasks((prev) => prev.map((task) => (task.id === taskId ? { ...task, ...updates } : task)))
        setEditingTask(null)
    }, [])

    const deleteTask = useCallback((taskId: string) => {
        setTasks((prev) => prev.filter((task) => task.id !== taskId))
    }, [])

    return (
        <KanbanContext.Provider
            value={{
                columns,
                tasks,
                searchQuery,
                isAddingTask,
                editingTask,
                viewingTask,
                setSearchQuery,
                setIsAddingTask,
                setEditingTask,
                setViewingTask,
                moveTask,
                addTask,
                updateTask,
                deleteTask,
            }}
        >
            {children}
        </KanbanContext.Provider>
    )
}

export function useKanban() {
    const context = useContext(KanbanContext)
    if (context === undefined) {
        throw new Error("useKanban must be used within a KanbanProvider")
    }
    return context
}
