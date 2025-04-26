"use client"

import { useState } from "react";
import Image from "next/image";

// Custom Accordion Component
const AccordionItem = ({ question, answer, isOpen, onClick }) => {
    return (
        <div>
            <button
                className="flex w-full justify-between py-4 text-left font-medium focus:outline-none cursor-pointer"
                onClick={onClick}
            >
                <span className="text-base md:text-l">{question}</span>
                <svg
                    className={`h-5 w-5 transform transition-transform ${isOpen ? "rotate-180" : ""}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>
            <div className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-96 pb-4" : "max-h-0"}`}>
                <p className="text-gray-600 text-justify text-sm md:text-l">{answer}</p>
            </div>
        </div>
    )
}

export default function FAQSection() {
    const [openItem, setOpenItem] = useState(null)

    const toggleItem = (index) => {
        setOpenItem(openItem === index ? null : index)
    }

    const faqItems = [
        {
            question: "Apa itu Scheduro?",
            answer:
                "Scheduro adalah aplikasi yang dirancang untuk membantumu mengelola tugas dan waktumu secara efektif. Dengan Scheduro, kamu memiliki kendali penuh untuk memprioritaskan dan fokus pada hal-hal yang benar-benar penting bagimu.",
        },
        {
            question: "Bagaimana Scheduro membantu mengatur tugas?",
            answer:
                "Scheduro menyediakan fitur untuk membuat daftar tugas, menetapkan tenggat waktu, memberikan prioritas, dan melacak progresnya. Dengan visibilitas yang jelas terhadap semua tugasmu, kamu dapat mengatur tugasmu dengan lebih terstruktur.",
        },
        {
            question: "Apa manfaat menggunakan Scheduro untuk manajemen waktu?",
            answer:
                "Manfaat utama Scheduro dalam manajemen waktu adalah membantumu mengidentifikasi bagaimana waktumu digunakan, mengalokasikan waktu secara lebih efisien untuk tugas-tugas yang paling signifikan. Ini membantu mengurangi penundaan dan meningkatkan produktivitas.",
        },
        {
            question: "Apakah ada batasan jumlah tugas yang dapat dikelola?",
            answer:
                "Saat ini, Scheduro tidak memberlakukan batasan jumlah tugas yang dapat Anda kelola, sehingga Anda bebas mengatur semua tugas Anda.",
        },
        {
            question: "Apakah Scheduro mudah digunakan?",
            answer:
                "Scheduro dirancang dengan antarmuka yang intuitif dan mudah dipahami, sehingga Anda dapat dengan cepat mulai mengelola tugas dan waktumu tanpa kesulitan. Fokusnya adalah memberikan kontrol yang sederhana namun efektif.",
        },
    ]

    return (
        <section id="faq" className="mx-auto max-w-6xl px-6 py-32 text-center">
            <h2 className="text-[#6387CE] text-3xl mb-4 md:mb-4 font-bold tracking-wider uppercase">FAQ</h2>

            <div className="flex flex-col gap-4 md:gap-8 md:flex-row">
                {/* Sticky Image Section */}
                <div className="flex-1 md:sticky md:top-20 h-fit md:-mt-14 md:-ml-8">
                    <div className="relative w-full h-[300px] md:h-[500px] overflow-hidden rounded-xl flex justify-center">
                        <Image
                            src="https://res.cloudinary.com/dy8fe8tbe/image/upload/v1745596674/FAQ_ihx6j5.svg"
                            alt="FAQ Illustration"
                            width={500}
                            height={300}
                            className="w-full max-w-xs md:max-w-md h-auto"
                            priority
                        />
                    </div>
                </div>

                {/* FAQ List Section */}
                <div className="flex-1 -mt-4 md:mt-8 text-left md:-ml-24 md:mr-14">
                    <div className="rounded-lg space-y-2 p-8 md:p-6">
                        {faqItems.map((item, index) => (
                            <AccordionItem
                                key={index}
                                question={item.question}
                                answer={item.answer}
                                isOpen={openItem === index}
                                onClick={() => toggleItem(index)}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
