"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Plus, Trash, Edit, Check } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Alert, AlertDescription } from "@/components/ui/alert"
import SchoolDashboardLayout from "@/components/school-dashboard-layout"

export default function ServicesPage() {
  const [services, setServices] = useState([
    {
      id: 1,
      name: "Car License (B)",
      description: "Standard driving license for cars and light vehicles up to 3.5 tons.",
      active: true,
    },
    {
      id: 2,
      name: "Motorcycle License (A)",
      description: "License for motorcycles of all engine sizes.",
      active: true,
    },
    {
      id: 3,
      name: "Refresher Courses",
      description: "Courses for those who already have a license but need to refresh their skills.",
      active: true,
    },
    {
      id: 4,
      name: "Intensive Courses",
      description: "Accelerated learning program to get your license in a shorter time frame.",
      active: true,
    },
  ])

  const [newService, setNewService] = useState({
    name: "",
    description: "",
    active: true,
  })

  const [editingService, setEditingService] = useState(null)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [serviceToDelete, setServiceToDelete] = useState(null)
  const [saveSuccess, setSaveSuccess] = useState(false)

  const handleAddService = () => {
    const id = services.length > 0 ? Math.max(...services.map((s) => s.id)) + 1 : 1
    setServices([...services, { ...newService, id }])
    setNewService({ name: "", description: "", active: true })
    setIsAddDialogOpen(false)
    showSuccessMessage()
  }

  const handleEditService = () => {
    setServices(services.map((service) => (service.id === editingService.id ? editingService : service)))
    setIsEditDialogOpen(false)
    showSuccessMessage()
  }

  const handleDeleteService = () => {
    setServices(services.filter((service) => service.id !== serviceToDelete))
    setIsDeleteDialogOpen(false)
    showSuccessMessage()
  }

  const handleToggleActive = (id) => {
    setServices(services.map((service) => (service.id === id ? { ...service, active: !service.active } : service)))
    showSuccessMessage()
  }

  const showSuccessMessage = () => {
    setSaveSuccess(true)
    setTimeout(() => setSaveSuccess(false), 3000)
  }

  return (
    <SchoolDashboardLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Manage Services</h1>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-rose-500 hover:bg-rose-600">
              <Plus className="mr-2 h-4 w-4" />
              Add Service
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Service</DialogTitle>
              <DialogDescription>Add a new service that your driving school offers</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Service Name</Label>
                <Input
                  id="name"
                  value={newService.name}
                  onChange={(e) => setNewService({ ...newService, name: e.target.value })}
                  placeholder="e.g. Car License (B)"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newService.description}
                  onChange={(e) => setNewService({ ...newService, description: e.target.value })}
                  placeholder="Describe what this service includes"
                  rows={3}
                />
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="active"
                  checked={newService.active}
                  onCheckedChange={(checked) => setNewService({ ...newService, active: checked })}
                />
                <Label htmlFor="active">Active</Label>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddService} disabled={!newService.name}>
                Add Service
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {saveSuccess && (
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Alert className="bg-green-50 text-green-600 border-green-200">
            <Check className="h-4 w-4 mr-2" />
            <AlertDescription>Changes saved successfully!</AlertDescription>
          </Alert>
        </motion.div>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Your Services</CardTitle>
          <CardDescription>Manage the services your driving school offers</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {services.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No services added yet. Click "Add Service" to get started.
              </div>
            ) : (
              services.map((service) => (
                <div key={service.id} className="flex items-start justify-between p-4 border rounded-lg">
                  <div className="space-y-1">
                    <div className="flex items-center">
                      <h3 className="font-medium">{service.name}</h3>
                      <div
                        className={`ml-2 px-2 py-0.5 text-xs rounded-full ${service.active ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}`}
                      >
                        {service.active ? "Active" : "Inactive"}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">{service.description}</p>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" onClick={() => handleToggleActive(service.id)}>
                      {service.active ? "Deactivate" : "Activate"}
                    </Button>
                    <Dialog
                      open={isEditDialogOpen && editingService?.id === service.id}
                      onOpenChange={(open) => {
                        setIsEditDialogOpen(open)
                        if (open) setEditingService(service)
                      }}
                    >
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Edit Service</DialogTitle>
                          <DialogDescription>Update the details of this service</DialogDescription>
                        </DialogHeader>
                        {editingService && (
                          <div className="space-y-4 py-4">
                            <div className="space-y-2">
                              <Label htmlFor="edit-name">Service Name</Label>
                              <Input
                                id="edit-name"
                                value={editingService.name}
                                onChange={(e) => setEditingService({ ...editingService, name: e.target.value })}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="edit-description">Description</Label>
                              <Textarea
                                id="edit-description"
                                value={editingService.description}
                                onChange={(e) => setEditingService({ ...editingService, description: e.target.value })}
                                rows={3}
                              />
                            </div>
                            <div className="flex items-center space-x-2">
                              <Switch
                                id="edit-active"
                                checked={editingService.active}
                                onCheckedChange={(checked) => setEditingService({ ...editingService, active: checked })}
                              />
                              <Label htmlFor="edit-active">Active</Label>
                            </div>
                          </div>
                        )}
                        <DialogFooter>
                          <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                            Cancel
                          </Button>
                          <Button onClick={handleEditService}>Save Changes</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                    <Dialog
                      open={isDeleteDialogOpen && serviceToDelete === service.id}
                      onOpenChange={(open) => {
                        setIsDeleteDialogOpen(open)
                        if (open) setServiceToDelete(service.id)
                      }}
                    >
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" className="text-red-500">
                          <Trash className="h-4 w-4 mr-1" />
                          Delete
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Delete Service</DialogTitle>
                          <DialogDescription>
                            Are you sure you want to delete this service? This action cannot be undone.
                          </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                          <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                            Cancel
                          </Button>
                          <Button variant="destructive" onClick={handleDeleteService}>
                            Delete
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </SchoolDashboardLayout>
  )
}
