'use client';

import { useRouter } from 'next/navigation';

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
import Image from 'next/image';
import {useAuth} from "@/context/AuthContext";

const FormSchema = z.object({
    email: z.email(),
    password: z.string().min(2, {
        message: "Пароль должен быть больше 4-х символов!",
    }),
})

export default function LoginPage() {
    const router = useRouter();
    const { login, register, error, isLoading } = useAuth();

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
            await login(email, password);
            // if (isLogin) {
            //     await login(email, password);
            // } else {
            //     await register(email, password);
            // }
            router.push('/dashboard');
        } catch (err) {
            console.log('Ошибка сети');
        }
    };

    return (
        <div style={{ padding: '40px', maxWidth: '400px', margin: 'auto' }} className="flex flex-col items-center">

            <Image
                src="https://unitsys.ru/files/images/new/logo.svg"
                alt="Логотип"
                width={200}
                height={30}
                className="mb-5"
            />
            <h1 className="text-2xl font-bold text-center mb-10">Вход в админ-панель</h1>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full mb-3">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Логин</FormLabel>
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
                                    <Input {...field} type='password'/>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" className="w-full">
                        {isLoading ? 'Loading...' : 'Войти'}
                    </Button>
                </form>
            </Form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
}