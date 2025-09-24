'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/authStore';

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const FormSchema = z.object({
    email: z.email(),
    password: z.string().min(2, {
        message: "Пароль должен быть больше 4-х символов!",
    }),
})

export default function LoginPage() {
    const [error, setError] = useState('');
    const router = useRouter();
    const { setUser } = useAuthStore();

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            email: "",
            password: ''
        },
    })

    const onSubmit = async (data: z.infer<typeof FormSchema>) => {
        const {email, password} = data;
        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
                credentials: 'include',
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.error || 'Ошибка входа');
                return;
            }

            setUser(data.user, data.accessToken);
            router.push('/dashboard');
            router.refresh();

        } catch (err) {
            setError('Ошибка сети');
        }
    };

    return (
        <div style={{ padding: '40px', maxWidth: '500px', margin: 'auto' }}>

            {error && <p style={{ color: 'red' }}>{error}</p>}
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6 m-auto">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Username</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormDescription>
                                    Ваш рабочий Email
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Пароль</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit">Войти</Button>
                </form>
            </Form>
        </div>
    );
}