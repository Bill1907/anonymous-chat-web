"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Form, FormField } from "./ui/form"

interface ChatInputProps {
    id: string
}

const formSchema = z.object({
    message: z.string().min(1),
})


export default function ChatInput({id}: ChatInputProps) {
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            message: "",
        },
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        await fetch(new URL(`/api/chat/${id}`, process.env.NEXT_PUBLIC_SITE_URL), {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
        })
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField 
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                        <Textarea placeholder="Type your message here." {...field} />
                    )}
                />
                <Button>Send message</Button>
            </form>
        </Form>
    )
}