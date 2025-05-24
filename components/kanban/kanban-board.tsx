"use client"

import { DndContext, type DragEndEvent, type DragStartEvent, closestCorners, DragOverlay } from "@dnd-kit/core"
import { useState, useEffect } from "react"
import { KanbanColumn } from "./kanban-column"
import { TaskCard } from "./task-card"
import { useKanban } from "./kanban-context"
import type { Task, Column } from "@/lib/types"
import { TaskDialog } from "./task-dialog"

export function KanbanBoard() {
    const { columns, tasks, searchQuery, isAddingTask, editingTask, viewingTask, moveTask } = useKanban()
    const [activeTask, setActiveTask] = useState<Task | null>(null)
    const [activeColumn, setActiveColumn] = useState<Column | null>(null)
    const [sortedColumns, setSortedColumns] = useState<Column[]>(columns)

    useEffect(() => {
        setSortedColumns([...columns].sort((a, b) => a.order - b.order))
    }, [columns])

    const filteredTasks = tasks.filter((task) => {
        if (!searchQuery) return true
        const query = searchQuery.toLowerCase()
        return (
            task.title.toLowerCase().includes(query) ||
            task.description.toLowerCase().includes(query) ||
            task.labels.some((label) => label.toLowerCase().includes(query))
        )
    })

    const handleDragStart = (event: DragStartEvent) => {
        const { active } = event
        const activeId = active.id as string

        const task = tasks.find((t) => t.id === activeId)
        if (task) {
            setActiveTask(task)
            return
        }

        const column = columns.find((c) => c.id === activeId)
        if (column) {
            setActiveColumn(column)
        }
    }

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event

        if (!over) {
            setActiveTask(null)
            setActiveColumn(null)
            return
        }

        const activeId = active.id as string
        const overId = over.id as string

        // Handle task movement
        const task = tasks.find((t) => t.id === activeId)
        if (task) {
            const overColumn = columns.find((col) => col.id === overId)
            const overTask = tasks.find((t) => t.id === overId)

            if (overColumn) {
                const tasksInColumn = filteredTasks.filter((t) => t.columnId === overColumn.id)
                moveTask(activeId, overColumn.id, tasksInColumn.length)
            } else if (overTask) {
                const tasksInColumn = filteredTasks.filter((t) => t.columnId === overTask.columnId)
                const overIndex = tasksInColumn.findIndex((t) => t.id === overId)
                moveTask(activeId, overTask.columnId, overIndex)
            }

            setActiveTask(null)
            return
        }

        // Handle column reordering
        const column = columns.find((c) => c.id === activeId)
        if (column && activeId !== overId) {
            setSortedColumns((prev) => {
                const oldIndex = prev.findIndex((col) => col.id === activeId)
                const newIndex = prev.findIndex((col) => col.id === overId)

                const newColumns = [...prev]
                const [movedColumn] = newColumns.splice(oldIndex, 1)
                newColumns.splice(newIndex, 0, movedColumn)

                return newColumns.map((col, index) => ({
                    ...col,
                    order: index,
                }))
            })
        }

        setActiveColumn(null)
    }

    return (
        <>
            <DndContext collisionDetection={closestCorners} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
                <div className="flex flex-col md:flex-row gap-6 overflow-x-auto pb-4">
                    {sortedColumns.map((column) => (
                        <KanbanColumn
                            key={column.id}
                            column={column}
                            tasks={filteredTasks.filter((task) => task.columnId === column.id)}
                        />
                    ))}
                </div>
                <DragOverlay>
                    {activeTask ? <TaskCard task={activeTask} isDragging /> : null}
                    {activeColumn ? (
                        <div className="w-80 rounded-lg bg-gray-100 dark:bg-gray-800 p-4 opacity-80">
                            <h3 className="font-semibold text-gray-900 dark:text-gray-100">{activeColumn.title}</h3>
                        </div>
                    ) : null}
                </DragOverlay>
            </DndContext>

            {(isAddingTask || editingTask || viewingTask) && <TaskDialog />}
        </>
    )
}
