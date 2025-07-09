// app/(yourlayout)/page.tsx
import DrawerCompo from "@/components/DrawerCompo";
import Navbar from "@/components/Navbar"
import ProductCard2 from "@/components/ProductCard2";
import axiosInstance from "@/helper/axiosInstance";
import { Product } from "@/lib/type";
import { Store } from "lucide-react";
import Link from "next/link";


interface PageProps {
    searchParams: {
        page?: string;
        companyId?: string;
        categoryId?: string;
    };
}


const LIMIT = 20;

const Page = async ({ searchParams }: PageProps) => {
    const currentPage = parseInt(searchParams.page || "1", 10);
    const offset = (currentPage - 1) * LIMIT;
    const query = new URLSearchParams({
        page: offset.toString(),
        limit: LIMIT.toString(),
    });

    if (searchParams.companyId) query.append("companyId", searchParams.companyId);
    if (searchParams.categoryId) query.append("categoryId", searchParams.categoryId);

    const res = await axiosInstance.get(`/product?${query.toString()}`);
    const companies = await axiosInstance.get('/company').then((res)=>res.data);
    const category = await axiosInstance.get('/category').then((res) => res.data);
    console.log("company", companies);
    console.log("category",category);
    const products: Product[] = res.data.products;
    const total: number = Number(res.data.havemore); // You need to send `total` from backend

    const totalPages = Math.ceil(total / LIMIT);
    console.log(totalPages);

    return (
        <section className="h-full">
            <Navbar />
            <header className="border-b bg-white sticky top-0 z-40">
                <div className="flex justify-between px-4 py-4">
                    <div className="flex items-center gap-4 mb-4">
                        <Store className="h-8 w-8 text-primary" />
                        <div>
                            <h1 className="alegreya-sans-extrabold text-3xl font-extrabold">Product Catalog</h1>
                            <p className="workSansLight text-sm text-muted-foreground">
                                Discover our curated collection of premium products
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 mb-4">
                        {/* list one */}
                        <DrawerCompo list={companies.companys} heading="Company"/>
                        <DrawerCompo list={category.categories} heading="Category" />

                    </div>
                </div>
            </header>

            <div className="mt-4 flex justify-center gap-4 w-screen flex-wrap">
                {products.map((product, idx) => (
                    <ProductCard2 key={idx} product={product} />
                ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center items-center gap-4 py-6">
                {Array.from({ length: totalPages }, (_, i) => (
                    <Link
                        key={i}
                        href={`?page=${i + 1}`}
                        className={`px-3 py-1 border rounded ${currentPage === i + 1
                                ? "bg-black text-white"
                                : "bg-white text-black hover:bg-gray-200"
                            }`}
                    >
                        {i + 1}
                    </Link>
                ))}
            </div>
        </section>
    );
};

export default Page;
