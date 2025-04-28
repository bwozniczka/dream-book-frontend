import AdminPanel from "@/components/admin/admin-panel"

export default function AdminPage() {
    return (
        <main className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Admin Control Panel</h1>
            <AdminPanel />
        </main>
    )
}
