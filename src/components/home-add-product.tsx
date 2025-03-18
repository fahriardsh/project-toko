import { useEffect } from "react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea"
import { AlertSuccess } from "@/components/alert-success";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Plus } from "lucide-react"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { time } from "console";

const formSchema = z.object({
  name: z.string().min(1, {
    message: "Nama Produk tidak boleh kosong.",
  }),
  variant: z.string().min(0, {  
    message: "",
  }),
  purchaseprice: z.string().min(1, {
    message: "Harga Beli tidak boleh kosong.",
  }),
  sellingprice: z.string().min(0, {
    message: "",
  }),
  description: z.string().min(0, {
    message: "",
  })
})

// function formatDate(date: Date): string {
//   const year = date.getFullYear();
//   const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
//   const day = String(date.getDate()).padStart(2, '0');
//   const hours = String(date.getHours()).padStart(2, '0');
//   const minutes = String(date.getMinutes()).padStart(2, '0');
//   const seconds = String(date.getSeconds()).padStart(2, '0');

//   return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}+00`;
// }

export default function AddProductButton() {
  const [open, setOpen] = useState(false);
  const [productName, setProductName] = useState("");
  const [productVariant, setProductVariant] = useState("");
  // const [productStock, setProductStock] = useState("");
  // const [productExp, setProductExp] = useState("");
  // const [productDescription, setProductDescription] = useState("");
  // const [productPurchasePrice, setProductPurchasePrice] = useState("");
  // const [productSellingPrice, setProductSellingPrice] = useState("");

  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
          name: "",
          variant: "",
          purchaseprice: "",
          sellingprice: "",
          description: ""
      },
  })

  useEffect(() => {
      if (open) {
          // Reset the form when the dialog opens
          form.reset({ 
            name: "", 
            variant: "", 
            purchaseprice: "", 
            sellingprice: "",
            description: ""
          }); // Reset to initial values
      }
  }, [open, form.reset]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {

    const valuesToSend = {
      name: values.name,
      variant: values.variant? values.variant : null,
      purchaseprice: values.purchaseprice,
      sellingprice: values.sellingprice? values.sellingprice : null,
      description: values.description? values.description : null
    }
    
    try {
      const response = await fetch('/api/product/product-add', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(valuesToSend),
      });

      if (response.ok) {
          setSuccess(true);
          setTimeout(() => {
            window.location.reload();
          }, 1500);
      } else {
          const data = await response.json();
          setError(data.error || 'Add product failed');
      }
    } catch (e: any) {
        setError(e.message || 'An error occurred');
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Plus /> Tambah Produk
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[450px]">
        <DialogHeader>
          <DialogTitle>Tambah Produk Baru</DialogTitle>
          <DialogDescription>
            Isi form di bawah ini untuk menambahkan produk baru.
          </DialogDescription>
        </DialogHeader>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        {success && <AlertSuccess />}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid gap-4 py-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Nama Produk*</FormLabel>
                        <FormControl>
                            <Input {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="variant"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Varian</FormLabel>
                        <FormControl>
                            <Input {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="purchaseprice"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Harga Beli*</FormLabel>
                        <FormControl>
                            <Input type="number" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="sellingprice"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Harga Jual</FormLabel>
                        <FormControl>
                            <Input type="number" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
              />
              <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                      <FormItem>
                          <FormLabel>Deskripsi</FormLabel>
                          <FormControl>
                              <Textarea {...field} />
                          </FormControl>
                          <FormMessage />
                      </FormItem>
                  )}
              />
              {/* <div className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Nama Produk*
                </Label>
                <Input
                  id="name"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  className="col-span-2"
                />
              </div>
              <div className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor="variant" className="text-right">
                  Varian
                </Label>
                <Input
                  id="variant"
                  value={productVariant}
                  onChange={(e) => setProductVariant(e.target.value)}
                  className="col-span-2"
                />
              </div> */}
              {/* <div className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor="stock" className="text-right">
                  Stok
                </Label>
                <Input
                  id="stock"
                  value={productStock}
                  onChange={(e) => setProductStock(e.target.value)}
                  className="col-span-2"
                  type="number" // Use number input for price
                />
              </div>
              <div className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor="exp" className="text-right">
                  Kadaluarsa
                </Label>
                <Input
                  id="exp"
                  value={productExp}
                  onChange={(e) => setProductExp(e.target.value)}
                  className="col-span-2 justify-end"
                  type="date" // Use number input for price
                />
              </div> */}
              {/* <div className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor="price" className="text-right">
                  Harga Beli*
                </Label>
                <Input
                  id="purchase_price"
                  value={productPurchasePrice}
                  onChange={(e) => setProductPurchasePrice(e.target.value)}
                  className="col-span-2"
                  type="number" // Use number input for price
                />
              </div>
              <div className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor="price" className="text-right">
                  Harga Jual
                </Label>
                <Input
                  id="selling_price"
                  value={productSellingPrice}
                  onChange={(e) => setProductSellingPrice(e.target.value)}
                  className="col-span-2"
                  type="number" // Use number input for price
                />
              </div> */}
            </div>
            <DialogFooter>
              <Button type="button" variant="ghost" onClick={() => setOpen(false)}>
                Batal
              </Button>
              <Button type="submit" variant="outline">
                Tambah
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}