"use client"
import Image from "next/image";
import './globals.css'
import HomePage from "@/pages/home";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <HomePage/>
    </main>
  );
}
