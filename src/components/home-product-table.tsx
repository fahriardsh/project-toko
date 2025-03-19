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

const ProductListContainer = () => {

    const myTheme = themeQuartz.withParams({ accentColor: 'red' });
    const gridRef = useRef<AgGridReact>(null);

    const filterParams: INumberFilterParams = {
        filterOptions: [
        'empty',
          {
            displayKey: "kosong",
            displayName: "Kosong",
            predicate: (_, cellValue: any) => cellValue != null && cellValue == 0,
            numberOfInputs: 0,
          },
          {
            displayKey: "hampir_habis",
            displayName: "Hampir Habis",
            predicate: (_, cellValue: any) => cellValue != null && cellValue < 20 && cellValue > 0,
            numberOfInputs: 0,
          },
          {
            displayKey: "tersedia",
            displayName: "Tersedia",
            predicate: (_, cellValue: any) => cellValue != null && cellValue >= 20,
            numberOfInputs: 0,
          }
        ] as IFilterOptionDef[],
        maxNumConditions: 1,
      };

    const [columnDefs, setColumnDefs] = useState<ColDef[]>([
        // {
        //     field: 'actions',
        //     headerName: 'Actions',
        //     cellRenderer: (params: any) => {
        //         return <Button variant="link">Detail</Button>
        //     },
        //     flex: 1
        // },
        { 
            headerName: 'Produk', 
            field: 'product_name', 
            filter: true,
            sort: "asc",
            flex: 1
            // floatingFilter: true
        },
        { 
            headerName: 'Varian', 
            field: 'variant', 
            filter: true,
            flex: 1
            // floatingFilter: true,
        },
        { 
            headerName: 'Deskripsi', 
            field: 'description', 
            filter: true,
            flex: 1
            // floatingFilter: true,
        },
        { 
            headerName: 'Harga Beli',
            field: 'latest_purchase_price',
            width: 150,
            // filter: true,
            // comparator: (valueA, valueB) => valueA - valueB,
        },
        { 
            headerName: 'Stok',
            field: 'current_quantity', 
            filter: "agNumberColumnFilter",
            filterParams: filterParams,
            sortable: false,
            cellRenderer: (params: any) => {
                if (params.value >= 20) {
                    return <Badge variant="outline" className="my-2 p-1 w-max text-white" style= {{backgroundColor: "#4CAF50"}}><CircleCheck></CircleCheck>Tersedia</Badge>;
                } else if (params.value == 0) {
                    return <Badge variant="outline" className="my-2 p-1 w-max text-white" style= {{backgroundColor: "#F44336"}}><CircleMinus></CircleMinus>Kosong</Badge>;
                } else {
                    return <Badge variant="outline" className="my-2 p-1 w-max" style= {{backgroundColor: "#FFEB3B"}}><CircleAlert></CircleAlert>Hampir Habis</Badge>;
                }
            },
            width: 140,
            resizable: false
        },
        {
            field: 'actions',
            headerName: 'Actions',
            cellRenderer: (params: any) => {
                return <div className='pt-2 flex gap-2'>
                    <DetailProductButton id = {params.data.product_id}></DetailProductButton>
                    <DeleteProductButton id = {params.data.product_id}></DeleteProductButton>
                </div>
                
            },
            width: 150,
            resizable: false
        },
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

    const clearFilters = useCallback(() => {
        gridRef.current!.api.setFilterModel(null);
      }, []);    

    const onBtnExport = useCallback(() => {
        gridRef.current!.api.exportDataAsCsv();
    }, []);

    return (
        <div>
            <div className='my-2 flex items-center justify-between'>
                <h2 className="text-md md:text-xl text-black font-semibold align-middle">
                    Daftar Produk
                </h2>
            </div>
            <div className='my-2 flex items-center justify-between'>
                <Button variant="outline" onClick={onBtnExport}>
                    Export CSV
                </Button>
                <div className='flex gap-2'>
                    <Button variant="ghost" onClick={clearFilters}>
                        Reset Filter
                    </Button>
                    <AddProductButton />
                </div>
            </div>
            <div style={{ width: "100%", height: "50vh" }}>
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

export default ProductListContainer;
