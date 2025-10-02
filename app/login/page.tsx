'use client'
import Image from "next/image";
import {useEffect, useState} from "react";
import LoginPage from "@/app/components/LoginForm";

export default function Home() {

    return (
        <div className="min-h-screen p-8 pb-20 gap-16 sm:p-20">
            <LoginPage />
        </div>
    );
}
