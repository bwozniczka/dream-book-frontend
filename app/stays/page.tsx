import RecentStays from "@/components/recent-stays"

export default function StaysPage() {
    return (
        <main className="container mx-auto px-4 py-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold mb-8">Your Stays</h1>
                <p className="text-muted-foreground mb-6">View and manage your recent and upcoming stays across properties.</p>
                <RecentStays />
            </div>
        </main>
    )
}
