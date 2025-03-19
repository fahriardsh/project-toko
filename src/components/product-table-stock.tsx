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
import DeleteProductButton from '@/components/home-delete-product';
import DetailProductButton from '@/components/home-detail-product';

import { CircleCheck, CircleMinus, CircleAlert, Trash } from "lucide-react"

ModuleRegistry.registerModules([AllCommunityModule]);
interface Product {
    id: number;
    product_name: string;
    variant: string | null;
    description: string | null;
}

const ProductStockList = (productId: any) => {

    const myTheme = themeQuartz.withParams({ accentColor: 'red' });
    const gridRef = useRef<AgGridReact>(null);

    const [columnDefs, setColumnDefs] = useState<ColDef[]>([
        { 
            headerName: 'Type', 
            field: 'transaction_type', 
            filter: true,
            flex: 1
            // floatingFilter: true
        },
        { 
            headerName: 'Quantity', 
            field: 'quantity_change', 
            filter: true,
            flex: 1
            // floatingFilter: true,
        },
        { 
            headerName: 'Transaction Date', 
            field: 'transaction_date', 
            filter: true,
            flex: 1
            // floatingFilter: true,
        }
    ]);

    const defaultColDef = useMemo(() => { 
        return {
            // flex: 1
        };
    }, []);
    

    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true); // Set loading to true before fetching
            try {
                const response = await fetch(`/api/product/product-history-stock?id=${productId.id}`); // Replace with your API endpoint
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();

                console.log(data)
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
                    Stock History
                </h2>
            </div>
            <div style={{ width: "100%", height: "25vh" }}>
                <AgGridReact 
                    theme={myTheme} 
                    rowData={products} 
                    columnDefs={columnDefs} 
                    defaultColDef={defaultColDef}
                    ref={gridRef}
                    suppressExcelExport={true}
                    rowHeight={52}
                />
            </div>
        </div>
        
    );
};

export default ProductStockList;
