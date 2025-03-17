// components/GridComponent.tsx
"use client";

import { AgGridReact } from 'ag-grid-react';
import { useEffect, useState, useMemo, useCallback, useRef } from "react";
import type { ColDef } from "ag-grid-community";
import { AllCommunityModule, ModuleRegistry, ITextFilterParams, IFilterOptionDef } from "ag-grid-community";
import { themeMaterial } from 'ag-grid-community';
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

ModuleRegistry.registerModules([AllCommunityModule]);
interface Product {
    id: number;
    product_name: string;
    variant: string | null;
    description: string | null;
}

const ProductListContainer = () => {

    const myTheme = themeMaterial.withParams({ accentColor: 'red' });
    const gridRef = useRef<AgGridReact>(null);
    const [rowData, setRowData] = useState<any[]>([]);

    const filterParams: ITextFilterParams = {
        filterOptions: [
        "All",
          {
            displayKey: "stok_habis",
            displayName: "Stok Habis",
            predicate: (_, cellValue: any) => cellValue != null && cellValue === 0,
            numberOfInputs: 0,
          },
          {
            displayKey: "hampir_habis",
            displayName: "Hampir Habis",
            predicate: (_, cellValue: any) => cellValue != null && cellValue < 20,
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
        { 
            headerName: 'Produk', 
            field: 'product_name', 
            filter: true,
            sort: "asc"
            // floatingFilter: true
        },
        { 
            headerName: 'Varian', 
            field: 'variant', 
            filter: true,
            // floatingFilter: true,
        },
        // { 
        //     headerName: 'Stok', 
        //     field: 'current_quantity', 
        //     filter: true,
        //     comparator: (valueA, valueB) => valueA - valueB,
        // },
        { 
            headerName: 'Harga Beli',
            field: 'latest_purchase_price', 
            // filter: true,
            // comparator: (valueA, valueB) => valueA - valueB,
        },
        { 
            headerName: 'Stok',
            field: 'current_quantity', 
            filter: true,
            filterParams: filterParams,
            sortable: false,
            cellRenderer: (params: any) => {
                if (params.value >= 20) {
                    return <Badge className="my-2 w-max bg-green-500">Tersedia</Badge>;
                } else if (params.value === 0) {
                    return <Badge className="my-2 w-max bg-red-500">Stok Habis</Badge>;
                } else {
                    return <Badge className="my-2 w-max bg-orange-500">Hampir Habis</Badge>;
                }
                
            }
        }
    ]);

    const defaultColDef = useMemo(() => { 
        return {
            minWidth: 150,
            flex: 1
        };
    }, []);
    

    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true); // Set loading to true before fetching
            try {
                const response = await fetch('/api/home'); // Replace with your API endpoint
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

    const onBtnExport = useCallback(() => {
        gridRef.current!.api.exportDataAsCsv();
    }, []);

    return (
        <div>
            <div className='my-2 flex items-center justify-between'>
                <h2 className="text-md md:text-xl text-black font-semibold align-middle">
                    Daftar Produk
                </h2>

                <Button variant="outline" onClick={onBtnExport}>
                    Export CSV
                </Button>
            </div>
            <div style={{ width: "100%", height: "50vh" }}>
                <AgGridReact 
                    theme={myTheme} 
                    rowData={products} 
                    columnDefs={columnDefs} 
                    defaultColDef={defaultColDef}
                    ref={gridRef}
                    suppressExcelExport={true}
                />
            </div>
        </div>
        
    );
};

export default ProductListContainer;
