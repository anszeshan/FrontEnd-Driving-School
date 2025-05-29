"use client"

import AdminDashboardLayout from "@/components/admin-dashboard-layout"

export default function AdminReviewsPage() {
  return (
    <AdminDashboardLayout>
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <h1 className="text-2xl font-bold mb-2">Review Management</h1>
        <p className="text-muted-foreground text-center max-w-md">
          The review system has been disabled as per requirements.
        </p>
      </div>
    </AdminDashboardLayout>
  )
}
