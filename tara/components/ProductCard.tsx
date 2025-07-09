    'use client'

    import { useMotionValue, useSpring, motion } from "framer-motion"
    import { ArrowRight } from "lucide-react"
    import Image from "next/image"
import { useRouter } from "next/navigation"
    import { useCallback, useState } from "react"

    interface Product {
        id: number;
        name: string;
        description: string;
        price: number;
        stock: number;
        isFeatured: boolean;
        tags: string[];
        images: string[];
        categoryId: number;
        companyId: number;
        createdAt: string;
        updatedAt: string;
    }

    const ProductCard = ({ data, idx }: { data: Product, idx: number }) => {
        const cursorX = useMotionValue(0);
        const cursorY = useMotionValue(0);
        const router = useRouter();

        const springX = useSpring(cursorX, { damping: 20, stiffness: 200 });
        const springY = useSpring(cursorY, { damping: 20, stiffness: 200 });

        const [isHover, setIsHover] = useState(false);

        const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
            const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            cursorX.set(x);
            cursorY.set(y);
        }

        const handleClick = useCallback(() => {
            router.push(`/product/${data.id}`);
        }, [data.id, router]);


        return (
            <div
                key={idx}
                className='relative mb-5 break-inside-avoid overflow-hidden group'
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setIsHover(true)}
                onMouseLeave={() => setIsHover(false)}
                onClick={handleClick} 
            >
                {/* Cursor follower with blur */}
                {isHover && (
                    <motion.div
                        className="absolute top-0 left-0 pointer-events-none z-50"
                        style={{
                            translateX: springX,
                            translateY: springY,    
                        }}
                    >
                        {/* Outer blur effect */}
                        <div className="w-20 h-20 bg-white opacity-30 rounded-full blur-2xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

                        {/* Main white circle */}
                        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center relative">
                            <ArrowRight className="text-black w-5 h-5" />
                        </div>
                    </motion.div>
                )}

                {/* Product image */}
                <Image
                    alt={`img-${idx}`}
                    src={JSON.parse(data.images[0]).secure_url}
                    width={300}
                    height={300}
                    className='w-full h-auto rounded-md object-cover group-hover:scale-125 transition-all duration-300'
                />

                {/* Info panel */}
                <div
                    className='cursor-pointer absolute z-10 bottom-0 w-full bg-white/60 translate-y-96 left-0 text-black group-hover:-translate-y-2 transition-all duration-300 ease-in-out p-2'
                    onMouseEnter={() => setIsHover(false)}
                    onMouseLeave={() => setIsHover(true)}
                >
                    <motion.h1 className='font-bold text-xl line-clamp-2 tracking-wide alegreya-sans-bold border-b border-gray-900'>
                        {data.name}
                    </motion.h1>
                    <p className='text-md line-clamp-2 tracking-widest mt-2 workSansRegular'>
                        {data.description}
                    </p>
                </div>
            </div>
        )
    }

    export default ProductCard
