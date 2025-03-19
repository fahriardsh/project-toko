// components/GridComponent.tsx
"use client";

import { AgGridReact } from 'ag-grid-react';
import { useEffect, useState, useMemo, useCallback, useRef } from "react";
import type { ColDef } from "ag-grid-community";
import { AllCommunityModule, ModuleRegistry, INumberFilterParams, IFilterOptionDef } from "ag-grid-community";
import { Button } from "@/components/ui/button"
// import { Badge } from "@/components/ui/badge"

import ProductStockList from '@/components/product-table-stock';
import {ProductBarchartContainer} from '@/components/product-barchart';

import { Pen, Trash } from "lucide-react"

// import {
//   Alert,
//   AlertDescription,
//   AlertTitle,
// } from "@/components/ui/alert"

ModuleRegistry.registerModules([AllCommunityModule]);

interface Product {
    product: any;
    productId: number;
    product_name: string;
    variant: string;
    description: string;
    current_quantity: number;
    latest_purchase_price: number;
    latest_price_update_time: string;
    last_inventory_update: string;
}

// Remove unused type definition: type Params = Promise<{ id: any }>;
// type Params = Promise<{ productId: any }>;

async function getProduct(productId: number): Promise<Product | null> {

    try {
        // Build the URL with the id as a query parameter.
        const baseUrl = process.env.NODE_ENV === 'development'
        ? 'http://localhost:3000/'  // Your development URL
        : 'project-toko-seven.vercel.app'; // Leave empty in production (it will be relative)
        const url = baseUrl + `/api/product/product-id?id=${productId}`;

        const response = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        // Remove the body for GET requests. The data should be sent through the query string.
        });

        if (!response.ok) {
        console.error("Error fetching product:", response.status, response.statusText);
        return null; // Handle non-200 responses
        }

        const data: Product = await response.json(); // Type assertion to Product

        return data; // Return the product data
    } catch (e: any) {
        console.error("Error fetching product:", e);
        return null; // Handle errors
    }
}

function formatDate(dateString: string): string {
    try {
      const date = new Date(dateString);
  
      // Check if the date is valid
      if (isNaN(date.getTime())) {
        return "Invalid Date";
      }
  
      const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false, // Use 24-hour format
        timeZone: 'Asia/Jakarta' // Set timezone to Asia/Jakarta
      };
  
      return date.toLocaleDateString('en-ID', options); // Use Indonesian locale (id-ID)
    } catch (error) {
      console.error("Error formatting date:", error);
      return "Invalid Date";
    }
}

function formatRupiah(amount: number): string {
    try {
      const formatter = new Intl.NumberFormat('en-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 2, // Display two decimal places
      });
  
      return formatter.format(amount);
    } catch (error) {
      console.error("Error formatting Rupiah:", error);
      return "Invalid Number";
    }
  }

const ProductCardDetail = (id: any) => {

    const [product, setProduct] = useState<Product | null>(null);  // Store single product
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true);
            setError(null); // Clear any previous errors
            try {
                const fetchedProduct = await getProduct(id.id);

                if (fetchedProduct) {
                    setProduct(fetchedProduct.product);  // Store fetched product
                } else {
                    setError("Product not found.");
                }
            } catch (e: any) {
                console.error("Error fetching product:", e);
                setError(e.message || "Failed to load product.");
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id.id]); // Only re-run if id changes

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!product) {
        return <div>Product not found.</div>; // Ensure something is rendered when product is null
    }

    return (
        <div>
            <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2">
                <div className="relative p-6 rounded-xl border bg-blue-500 text-card-foreground shadow text-white">
                    <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <div className="tracking-tight text-sm font-bold">Product Details</div>
                        <Button variant="outline" className='h-8 w-auto' style={{color: "#2196F3", borderColor: "#2196F3"}}><Pen/> Edit</Button>
                    </div>
                    <div className="py-1">
                        <div className="text-2xl font-bold">{product.product_name}</div> {/* Access property of 'product' */}
                        <p className="text-xs text-muted-foreground">{product.description}</p> {/* Access property of 'product' */}
                    </div>
                    <div className="py-1">
                        <div className="text-xs font-medium">Variant</div>
                        <div className="text-md font-bold">{product.variant? product.variant : "-"}</div>
                    </div>
                    <div className="py-1">
                        <div className="text-xs font-medium">Description</div>
                        <div className="text-sm font-medium">{product.description? product.description : "-"}</div>
                    </div>
                    <br />
                    <div className="absolute flex gap-2 bottom-4">
                        <Button variant="outline" className='mb-2 h-8 w-auto' style={{color: "#2196F3", borderColor: "#2196F3"}}>Add Stock</Button>
                        <Button variant="ghost" className='h-8 w-auto ghost'><Trash/></Button>
                    </div>
                </div>
                <div className="rounded-xl border bg-card text-card-foreground shadow">
                    <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
                        <div className="tracking-tight text-sm font-medium">Total Expired Stock (in 1 week)</div>
                    </div>
                    <div className="p-6 pt-0">
                        <div className="text-xl font-bold">{product.current_quantity? product.current_quantity : 0} <span className="text-muted-foreground text-xs">Unit</span></div>
                    </div>
                    <div className="p-6 pt-0">
                        <ProductBarchartContainer />
                    </div>
                </div>
                <div className="rounded-xl border bg-card text-card-foreground shadow">
                    <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
                        <div className="tracking-tight text-sm font-medium">Latest Purchase Price</div>
                    </div>
                    <div className="p-6 pt-0">
                        <div className="text-xl font-bold">{product.latest_purchase_price? formatRupiah(product.latest_purchase_price) : 0} <span className="text-muted-foreground text-xs"></span></div>
                        <p className="text-xs text-muted-foreground">{product.latest_price_update_time? formatDate(product.latest_price_update_time) : "Today"}</p>
                    </div>
                </div>
                <div className="rounded-xl border bg-card text-card-foreground shadow">
                    <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
                        <div className="tracking-tight text-sm font-medium">Total Stock Available</div>
                    </div>
                    <div className="px-6 py-0">
                        <div className="text-xl font-bold">{product.current_quantity? product.current_quantity : 0} <span className="text-muted-foreground text-xs">Unit</span></div>
                        <p className="text-xs text-muted-foreground">{product.last_inventory_update? formatDate(product.last_inventory_update) : "Today"}</p>
                    </div>
                    <div className="px-6 pt-0 pb-6">
                        <ProductStockList id={id.id}></ProductStockList>                      
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCardDetail;
