export type Priority = "low" | "medium" | "high" | "urgent";

export interface User {
	id: string;
	name: string;
	email: string;
	avatar: string;
}

export interface Task {
	id: string;
	title: string;
	description: string;
	priority: Priority;
	columnId: string;
	labels: string[];
	assignees: User[];
	dueDate?: string;
	estimatedTime?: string;
	createdAt: string;
	updatedAt: string;
}

export interface Column {
	id: string;
	title: string;
	order: number;
}
