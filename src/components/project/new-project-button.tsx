"use client"

import { Plus, Loader2 } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

// Skema validasi menggunakan Zod
const formSchema = z.object({
  name: z.string().min(3, "Project name must be at least 3 characters.").max(50, "Project name cannot exceed 50 characters."),
  description: z.string().max(200, "Description cannot exceed 200 characters.").optional(),
})

export function NewProjectButton() {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await fetch("/api/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })

      if (!response.ok) {
        throw new Error("Failed to create project.")
      }

      const project = await response.json()
      toast.success("Project created successfully!")
      setIsOpen(false)
      router.refresh() // Refresh dashboard to show new project
      router.push(`/editor/${project.id}`) // Arahkan ke halaman editor
    } catch (error: any) {
      toast.error(error.message || "Something went wrong.")
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <Button
        variant="outline"
        className="group relative flex flex-col items-center justify-center gap-4 rounded-xl border border-dashed border-[#444] p-8 text-[#e0e0e0] hover:border-[#708F96] hover:bg-[#2d2d2d] transition-all"
        onClick={() => setIsOpen(true)}
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 group-hover:bg-[#708F96]/20 transition-colors">
          <Plus className="h-6 w-6 text-[#708F96]" />
        </div>
        <div className="text-center">
          <h3 className="font-semibold">New Project</h3>
          <p className="text-sm text-muted-foreground">Start generating code from scratch</p>
        </div>
      </Button>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-[#e0e0e0]">Create New Project</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 py-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Name</FormLabel>
                  <FormControl>
                    <Input placeholder="My Awesome Project" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description (Optional)</FormLabel>
                  <FormControl>
                    <Textarea placeholder="A brief description of my project..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button 
              type="submit" 
              variant="gradient" 
              className="w-full mt-4"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Create Project
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}