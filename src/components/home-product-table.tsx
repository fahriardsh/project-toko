// components/ProductListContainer.tsx
'use client';

import React, { useState, useEffect } from 'react';
import MyGrid from './my-grid';

interface Product {
    id: number;
    product_name: string;
    variant: string | null;
    description: string | null;
}

const ProductListContainer = () => {
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

    const handleUpdateProduct = async (updatedProduct: Product) => {
        try {
            const response = await fetch(`/api/products/${updatedProduct.id}`, {
                method: 'PUT', // Or PATCH depending on your API
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedProduct),
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            // After successful update, fetch the updated product list
            const data = await response.json();

            if (data.error) {
                setError(data.error);
            }

            // Update the local state to reflect the changes, or refetch all products for simplicity
            setProducts(products.map(product =>
                product.id === updatedProduct.id ? data.product : product
            ));
            console.log(data);
        } catch (e: any) {
            console.error('Failed to update product:', e);
            setError('Failed to update product.');
        }
    };

    if (loading) {
        return <div>Loading products...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            {products.length > 0 ? (
                <MyGrid rowData={products} onUpdateProduct={handleUpdateProduct} />
            ) : (
                <div>No products found.</div>
            )}
        </div>
    );
};

export default ProductListContainer;