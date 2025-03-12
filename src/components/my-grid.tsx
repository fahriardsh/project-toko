// components/MyGrid.tsx
'use client';

import React, { useState, useCallback, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { ColDef, GridApi, GridReadyEvent, CellValueChangedEvent } from 'ag-grid-community';
import { ClientSideRowModelModule } from 'ag-grid-community';
import { provideGlobalGridOptions } from 'ag-grid-community';

// Mark all grids as using legacy themes
provideGlobalGridOptions({ theme: "legacy" });

interface Product {
    id: number;
    product_name: string;
    variant: string | null;
    description: string | null;
}

interface MyGridProps {
    rowData: Product[];
    onUpdateProduct: (product: Product) => Promise<void>;
}

const MyGrid: React.FC<MyGridProps> = ({ rowData, onUpdateProduct }) => {
    
    const [columnDefs, setColumnDefs] = useState<ColDef[]>([
        { field: 'product_name', sortable: true, filter: true, editable: true, flex: 1 },
        { field: 'variant', sortable: true, filter: true, editable: true, flex: 1  },
        { field: 'description', sortable: true, filter: true, editable: true, flex: 1  },
    ]);

    const gridRef = useRef<AgGridReact>(null);
    const [gridApi, setGridApi] = useState<GridApi | null>(null);
    const [modules, setModules] = useState([ClientSideRowModelModule]);

    const onGridReady = useCallback((params: GridReadyEvent) => {
        setGridApi(params.api);
    }, []);

    const onCellValueChanged = useCallback((event: CellValueChangedEvent<Product>) => {
        const updatedProduct = event.data;  // The updated row data
        onUpdateProduct(updatedProduct); // Call the callback function to update the DB
    }, [onUpdateProduct]);

    return (
        <div className="ag-theme-alpine" style={{ height: '400px', width: '100%' }}>
            <AgGridReact
                ref={gridRef}
                rowData={rowData}
                columnDefs={columnDefs}
                modules={modules}
                rowSelection="multiple"
                onGridReady={onGridReady}
                onCellValueChanged={onCellValueChanged} // Add this line
            />
        </div>
    );
};

export default MyGrid;