// components/BackButton.tsx
'use client';

import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function BackButton() {
    const router = useRouter();

    return (
        <button onClick={() => router.back()} className="flex items-center gap-2 text-gray-600 hover:text-black transition-colors">
            <ArrowLeft size={20} />
            <span className="font-medium">Back</span>
        </button>
    );
}