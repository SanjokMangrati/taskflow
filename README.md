# TaskFlow Pro - Kanban Board & Task Management Demo

A modern Kanban board demo built with Next.js, TypeScript, and Tailwind CSS. This demo showcases drag-and-drop functionality, responsive design, and professional UI/UX patterns.

## 🚀 Features

### Core Functionality

- **Drag & Drop Interface**: Smooth task movement between columns using @dnd-kit
- **Task Management**: Create, edit, delete, and view tasks with detailed information
- **Column Management**: Re-orderable columns with drag-and-drop support
- **Real-time Search**: Filter tasks by title, description, or labels
- **Responsive Design**: Fully responsive across desktop, tablet, and mobile devices

### Task Features

- **Priority Levels**: Low, Medium, High, and Urgent with color coding
- **Status Tracking**: Automatic status updates based on column position
- **Labels & Categories**: Multiple label support with color-coded badges
- **Team Assignment**: Multi-user assignment with avatar display
- **Due Dates**: Date tracking with visual indicators
- **Time Estimation**: Task time estimation and tracking
- **Detailed View**: Comprehensive task details in modal view

### User Experience

- **Professional UI**: Clean, modern interface with gradient accents
- **Accessibility**: ARIA labels, keyboard navigation, and screen reader support
- **Visual Feedback**: Hover effects, animations, and loading states
- **Mobile Optimized**: Touch-friendly interface for mobile devices

## 🛠️ Technology Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript for type safety
- **Styling**: Tailwind CSS with custom components
- **UI Components**: shadcn/ui component library
- **Drag & Drop**: @dnd-kit for smooth interactions
- **Icons**: Lucide React icon library
- **Date Handling**: date-fns for date formatting

## 📁 Project Structure

```
├── app/
│   ├── globals.css          # Global styles and Tailwind configuration
│   ├── layout.tsx           # Root layout component
│   └── page.tsx             # Main application page
├── components/
│   ├── kanban/
│   │   ├── kanban-board.tsx     # Main board component with drag-and-drop
│   │   ├── kanban-column.tsx    # Individual column component
│   │   ├── kanban-context.tsx   # State management context
│   │   ├── task-card.tsx        # Task card component
│   │   └── task-dialog.tsx      # Task creation/editing modal
│   ├── layout/
│   │   └── header.tsx           # Application header with search and navigation
│   └── ui/                      # shadcn/ui components (auto-generated)
├── lib/
│   ├── mock-data.ts         # Sample data for demonstration
│   ├── types.ts             # TypeScript type definitions
│   └── utils.ts             # Utility functions
└── public/                  # Static assets and images
```

## 🎯 Key Components

### KanbanBoard

The main board component that orchestrates drag-and-drop functionality and manages the overall layout.

### KanbanColumn

Individual column component that handles task dropping and displays column-specific information.

### TaskCard

Reusable task card component with drag handle, status indicators, and action menus.

### TaskDialog

Multi-purpose modal for creating, editing, and viewing task details with form validation.

### KanbanContext

Centralized state management using React Context API for tasks, columns, and UI state.

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn package manager

### Installation

1. Download or clone the project files
2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm start
```
