"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { cookies } from "next/headers"

const formSchema = z.object({
  nickname: z.string().min(2).max(50),
})

export default function LoginForm() {
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            nickname: "",
          },
    })


    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        console.log(form)
        const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
        const validationRes = await fetch(`${siteUrl}/api/account/validate?nickname=${values.nickname}`)
        const { isValid } = await validationRes.json()

        if (isValid) {
            const res = await fetch(`${siteUrl}/api/account/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            })

            if (res.ok) {
                const { token } = await res.json()
                
            } else {
                alert("로그인 실패!")
            }
        } else {
            form.setError("nickname", {
                type: "manual",
                message: "사용자 이름이 이미 존재합니다.",
            })
        }
    }

    return (
    <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
                control={form.control}
                name="nickname"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>사용자 이름</FormLabel>
                    <FormControl>
                        <Input placeholder="" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
            />
            <Button type="submit">Submit</Button>
        </form>
    </Form>
    )
}