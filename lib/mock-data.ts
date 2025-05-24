import type { Column, Task, User } from "./types";

export const mockUsers: User[] = [
	{
		id: "user-1",
		name: "Sarah Chen",
		email: "sarah.chen@company.com",
		avatar: "/professional-woman-glasses.png",
	},
	{
		id: "user-2",
		name: "Mike Johnson",
		email: "mike.johnson@company.com",
		avatar: "/professional-bearded-man.png",
	},
	{
		id: "user-3",
		name: "Emily Davis",
		email: "emily.davis@company.com",
		avatar: "/young-professional-woman.png",
	},
	{
		id: "user-4",
		name: "Alex Rivera",
		email: "alex.rivera@company.com",
		avatar: "/professional-dark-hair.png",
	},
];

export const initialColumns: Column[] = [
	{ id: "todo", title: "To Do", order: 0 },
	{ id: "in-progress", title: "In Progress", order: 1 },
	{ id: "review", title: "Review", order: 2 },
	{ id: "done", title: "Done", order: 3 },
];

export const initialTasks: Task[] = [
	{
		id: "task-1",
		title: "Implement user authentication system",
		description:
			"Set up JWT-based authentication with refresh tokens and secure password hashing",
		priority: "high",
		columnId: "todo",
		labels: ["Backend", "Feature"],
		assignees: [mockUsers[0], mockUsers[1]],
		dueDate: "2024-02-15",
		estimatedTime: "3d",
		createdAt: "2024-01-20T10:00:00Z",
		updatedAt: "2024-01-20T10:00:00Z",
	},
	{
		id: "task-2",
		title: "Design new dashboard layout",
		description:
			"Create mockups for the analytics dashboard with improved data visualization",
		priority: "medium",
		columnId: "in-progress",
		labels: ["Design", "Frontend"],
		assignees: [mockUsers[2]],
		dueDate: "2024-02-10",
		estimatedTime: "2d",
		createdAt: "2024-01-19T14:30:00Z",
		updatedAt: "2024-01-21T09:15:00Z",
	},
	{
		id: "task-3",
		title: "Fix mobile responsive issues",
		description:
			"Address layout problems on mobile devices for the main navigation and forms",
		priority: "urgent",
		columnId: "in-progress",
		labels: ["Bug", "Frontend"],
		assignees: [mockUsers[3]],
		estimatedTime: "4h",
		createdAt: "2024-01-21T11:00:00Z",
		updatedAt: "2024-01-21T11:00:00Z",
	},
	{
		id: "task-4",
		title: "API documentation update",
		description:
			"Update Swagger documentation for new endpoints and authentication flow",
		priority: "low",
		columnId: "review",
		labels: ["Documentation", "Backend"],
		assignees: [mockUsers[0]],
		dueDate: "2024-02-20",
		estimatedTime: "1d",
		createdAt: "2024-01-18T16:45:00Z",
		updatedAt: "2024-01-22T10:30:00Z",
	},
	{
		id: "task-5",
		title: "Implement real-time notifications",
		description:
			"Add WebSocket support for live notifications and updates across the platform",
		priority: "medium",
		columnId: "todo",
		labels: ["Feature", "Backend", "Frontend"],
		assignees: [mockUsers[1], mockUsers[3]],
		dueDate: "2024-02-25",
		estimatedTime: "5d",
		createdAt: "2024-01-20T13:20:00Z",
		updatedAt: "2024-01-20T13:20:00Z",
	},
	{
		id: "task-6",
		title: "Performance optimization",
		description:
			"Optimize database queries and implement caching for frequently accessed data",
		priority: "high",
		columnId: "todo",
		labels: ["Enhancement", "Backend"],
		assignees: [mockUsers[0]],
		estimatedTime: "2d",
		createdAt: "2024-01-21T08:00:00Z",
		updatedAt: "2024-01-21T08:00:00Z",
	},
	{
		id: "task-7",
		title: "User onboarding flow",
		description:
			"Design and implement a guided tour for new users with interactive tooltips",
		priority: "medium",
		columnId: "done",
		labels: ["Feature", "Design", "Frontend"],
		assignees: [mockUsers[2]],
		dueDate: "2024-01-15",
		estimatedTime: "3d",
		createdAt: "2024-01-10T09:00:00Z",
		updatedAt: "2024-01-15T17:00:00Z",
	},
	{
		id: "task-8",
		title: "Security audit preparation",
		description:
			"Prepare codebase for third-party security audit and fix known vulnerabilities",
		priority: "urgent",
		columnId: "review",
		labels: ["Enhancement", "Backend"],
		assignees: [mockUsers[0], mockUsers[1]],
		dueDate: "2024-02-05",
		estimatedTime: "4d",
		createdAt: "2024-01-19T10:00:00Z",
		updatedAt: "2024-01-23T14:00:00Z",
	},
];
