import AdminPanel from "@/components/admin/admin-panel"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function AdminPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Admin Control Panel</h1>
        <AdminPanel />
      </main>
      <Footer />
    </div>
  )
}
