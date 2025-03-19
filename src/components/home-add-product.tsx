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

const formSchema = z.object({
  name: z.string().min(1, {
    message: "Nama Produk tidak boleh kosong.",
  }),
  variant: z.string().min(0, {  
    message: "",
  }),
  description: z.string().min(0, {
    message: "",
  })
})

export default function AddProductButton() {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const successMsg = "Produk baru berhasil ditambahkan.";

  const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
          name: "",
          variant: "",
          description: ""
      },
  })

  useEffect(() => {
      if (open) {
          // Reset the form when the dialog opens
          form.reset({ 
            name: "", 
            variant: "", 
            description: ""
          }); // Reset to initial values
      }
  }, [open, form.reset]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {

    const valuesToSend = {
      name: values.name,
      variant: values.variant? values.variant : null,
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
        {success && <AlertSuccess name={successMsg} />}
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