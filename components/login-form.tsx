"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useRouter } from 'next/navigation'

const formSchema = z.object({
  nickname: z.string().min(2).max(50),
})

export default function LoginForm() {
    const router = useRouter()
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            nickname: "",
          },
    })


    const onSubmit = async (values: z.infer<typeof formSchema>) => {

        const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
        // const validationRes = await fetch(`${siteUrl}/api/account/validate?nickname=${values.nickname}`)
        // const { isValid } = await validationRes.json()

        const res = await fetch(new URL('/api/account/login', siteUrl), {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
        })

        console.log(res)

        if (res.ok) {
            const { token } = await res.json()
            document.cookie = `token=${token}`
            alert("로그인 성공!")
            router.push('/chat/main')
        } else {
            alert("로그인 실패!")
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