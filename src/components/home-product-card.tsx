// components/GridComponent.tsx
"use client";

import { AgGridReact } from 'ag-grid-react';
import { useEffect, useState, useMemo, useCallback, useRef } from "react";
import type { ColDef } from "ag-grid-community";
import { AllCommunityModule, ModuleRegistry, INumberFilterParams, IFilterOptionDef } from "ag-grid-community";
import { themeQuartz } from 'ag-grid-community';
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

import AddProductButton from '@/components/home-add-product';

import { CircleCheck, CircleMinus, CircleAlert } from "lucide-react"

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"

ModuleRegistry.registerModules([AllCommunityModule]);
interface Product {
    id: number;
    product_name: string;
    variant: string | null;
    description: string | null;
}

const ProductCardContainer = () => {

    const myTheme = themeQuartz.withParams({ accentColor: 'red' });
    const gridRef = useRef<AgGridReact>(null);
    const [rowData, setRowData] = useState<any[]>([]);

    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true); // Set loading to true before fetching
            try {
                const response = await fetch('/api/product/product-all'); // Replace with your API endpoint
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                if (data.error) {
                    setError(data.error);
                } else {
                    setProducts(data.products);
                }
            } catch (e: any) {
                console.error('Failed to fetch products:', e);
                setError('Failed to load products.');
            } finally {
                setLoading(false); // Set loading to false regardless of success or failure
            }
        };

        fetchProducts();
    }, []);

    return (
        <div>
            <div className='my-2 flex items-center justify-between'>
                <h2 className="text-md md:text-xl text-black font-semibold align-middle">
                    Daftar Produk
                </h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <div className="rounded-xl border bg-card text-card-foreground shadow">
                    <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
                        <div className="tracking-tight text-sm font-medium">Total Unit Produk</div>
                    </div>
                    <div className="p-6 pt-0">
                        <div className="text-2xl font-bold">$45,231.89</div>
                        {/* <p className="text-xs text-muted-foreground">+20.1% from last month</p> */}
                    </div>
                </div>
                <div className="rounded-xl border bg-card text-card-foreground shadow">
                    <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
                        <div className="tracking-tight text-sm font-medium">Produk Hampir Habis</div>
                    </div>
                    <div className="p-6 pt-0">
                        <div className="text-2xl font-bold">$45,231.89</div>
                        {/* <p className="text-xs text-muted-foreground">+20.1% from last month</p> */}
                    </div>
                </div>
                <div className="rounded-xl border bg-card text-card-foreground shadow">
                    <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
                        <div className="tracking-tight text-sm font-medium">Produk Hampir Kadaluarsa</div>
                    </div>
                    <div className="p-6 pt-0">
                        <div className="text-2xl font-bold">$45,231.89</div>
                        {/* <p className="text-xs text-muted-foreground">+20.1% from last month</p> */}
                    </div>
                </div>
                <div className="rounded-xl border bg-card text-card-foreground shadow">
                    <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
                        <div className="tracking-tight text-sm font-medium">Nilai Inventaris</div>
                    </div>
                    <div className="p-6 pt-0">
                        <div className="text-2xl font-bold">$45,231.89</div>
                        {/* <p className="text-xs text-muted-foreground">+20.1% from last month</p> */}
                    </div>
                </div>
            </div>
        </div>
        
    );
};

export default ProductCardContainer;
