// components/MyButton.tsx  (You can put this in a 'components' folder)
import { useRouter } from 'next/router';
// import React from 'react';
// import { Button } from "@/components/ui/button"

// // interface MyButtonProps {
// //   productId: string; // Or number, depending on your ID type
// //   label?: string;  // Optional: Button label
// // }

// // const MyButton: React.FC<MyButtonProps> = ({ productId, label }) => {
// export default function DetailProductButton(productId: any) {
//   const router = useRouter();

//   const handleClick = () => {
//     router.push(`/products/${productId}`); // Navigate to the dynamic route
//   };

//   return (
//     // <button onClick={handleClick}>
//     //   {`View Product ${id}`} {/* Use label prop or default text */}
//     // </button>
//     <Button variant="outline" className='h-8 w-auto' style={{color: "#2196F3", borderColor: "#2196F3"}} onClick={handleClick}>Details</Button>

//   );
// };

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

export default function DetailProductButton(productId: any) {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const successMsg = "Produk berhasil dihapus.";
  // const router = useRouter();

  const onSubmit = async () => {

    window.open(`/product/${productId.id}`, '_blank');
  
  };

  return (
    // <button onClick={handleClick}>
    //   {`View Product ${id}`} {/* Use label prop or default text */}
    // </button>
    <Button variant="outline" className='h-8 w-auto' onClick={onSubmit}>Details</Button>
  );
}