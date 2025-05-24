"use client";

import { useDroppable } from "@dnd-kit/core";
import {
	SortableContext,
	verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import type { Column, Task } from "@/lib/types";
import { TaskCard } from "./task-card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface KanbanColumnProps {
	column: Column;
	tasks: Task[];
}

export function KanbanColumn({ column, tasks }: KanbanColumnProps) {
	const { setNodeRef, isOver } = useDroppable({
		id: column.id,
	});

	const {
		attributes,
		listeners,
		setNodeRef: setDraggableRef,
		transform,
		transition,
		isDragging,
	} = useSortable({
		id: column.id,
		data: {
			type: "column",
		},
	});

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
	};

	const taskIds = tasks.map((task) => task.id);

	return (
		<div
			ref={setDraggableRef}
			style={style}
			className={cn(
				"flex w-80 flex-col rounded-lg bg-gray-100 dark:bg-gray-800 p-4 transition-colors",
				isOver && "bg-gray-200 dark:bg-gray-700",
				isDragging && "opacity-50"
			)}
			{...attributes}
		>
			<div
				className="mb-4 flex items-center justify-between cursor-grab"
				{...listeners}
			>
				<h3 className="font-semibold text-gray-900 dark:text-gray-100">
					{column.title}
				</h3>
				<Badge variant="secondary" className="ml-2">
					{tasks.length}
				</Badge>
			</div>

			<div ref={setNodeRef} className="flex-1">
				<SortableContext items={taskIds} strategy={verticalListSortingStrategy}>
					<div className="flex flex-col gap-3">
						{tasks.map((task) => (
							<TaskCard key={task.id} task={task} />
						))}
					</div>
				</SortableContext>

				{tasks.length === 0 && (
					<div className="flex h-32 items-center justify-center rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600">
						<p className="text-sm text-gray-500 dark:text-gray-400">
							Drop tasks here
						</p>
					</div>
				)}
			</div>
		</div>
	);
}
