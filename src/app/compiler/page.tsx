import React from 'react'
import Information from '@/components/Information';
import Compiler from '@/components/Compiler';

export default function Page() {
    return (
        <div className="w-full h-screen flex justify-center">
            <Information />
            <Compiler />
        </div>
    )
}