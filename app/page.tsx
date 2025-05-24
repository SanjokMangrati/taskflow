import { KanbanBoard } from "@/components/kanban/kanban-board"
import { KanbanProvider } from "@/components/kanban/kanban-context"
import { Header } from "@/components/layout/header"

export default function Home() {
  return (
    <KanbanProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Header />
        <main className="container mx-auto px-2 sm:px-4 py-4 sm:py-8">
          <KanbanBoard />
        </main>
      </div>
    </KanbanProvider>
  )
}
