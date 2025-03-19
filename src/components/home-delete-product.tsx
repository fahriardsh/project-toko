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
import { Trash } from "lucide-react"

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

export default function DeleteProductButton(product_id: any) {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const successMsg = "Produk berhasil dihapus.";

  const onSubmit = async () => {

    const valuesToSend = {
      id: product_id.id
    }
    
    try {
      const response = await fetch('/api/product/product-delete', {
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
          setError(data.error || 'Delete product failed');
      }
    } catch (e: any) {
        setError(e.message || 'An error occurred');
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" className='h-8 w-8'>
          <Trash />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[450px]">
        <DialogHeader>
          <DialogTitle>Apa kamu yakin ingin menghapus produk ini?</DialogTitle>
          <DialogDescription>
            Semua data yang terkait pada produk ini akan dihapus.
          </DialogDescription>
        </DialogHeader>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        {success && <AlertSuccess name={successMsg} />}
        <DialogFooter>
          <Button type="button" variant="ghost" onClick={() => setOpen(false)}>
            Batal
          </Button>
          <Button type="submit" variant="destructive" onClick={onSubmit}>
            Hapus
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}