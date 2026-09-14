"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Sprout } from "lucide-react";
import { Combobox } from "./ui/combo-box";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Textarea } from "./ui/textarea";
import { createPlant } from "@/actions/plant.action";
import toast from "react-hot-toast";
import ImageUpload from "./ImageUpload";

export default function CreateDialog() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    stock: 1,
    price: 1,
    category: "",
    userId: "",
    imageUrl: "",
  });

  const handleChange = (field: string, value: string | number) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const newPlant = await createPlant(formData);
      if (!newPlant) {
        toast.error("You must be signed in to create a plant");
        return;
      }

      console.log("plant created: ", newPlant);
      toast.success("Plant created successfully");
      setOpen(false);
      setFormData({
        name: "",
        description: "",
        stock: 1,
        price: 1,
        category: "",
        userId: "",
        imageUrl: "",
      });
      router.refresh();
    } catch (error) {
      console.error("error creating plant", error);
      toast.error(
        error instanceof Error && error.message === "DUPLICATE_PLANT"
          ? "This exact plant is already in your catalog"
          : "Failed to create plant"
      );
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger
        render={
          <Button
            variant="default"
            className="ml-auto font-bold flex items-center gap-2"
          >
            <span>
              <Sprout className="w-4 h-4" />
              Add Plant
            </span>
          </Button>
        }
      />
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Add a Plant</AlertDialogTitle>
          <AlertDialogDescription>
            Fill out the form below to add a new plant to your inventory.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="block text-base font-medium text-zinc-100">
                Name
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter name"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                className="h-11 border-zinc-700 bg-[#111111] text-white placeholder:text-zinc-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category" className="block text-base font-medium text-zinc-100">
                Category
              </Label>
              <Combobox
                value={formData.category}
                onChange={(val) => handleChange("category", val)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="block text-base font-medium text-zinc-100">
              Description
            </Label>
            <Textarea
              id="description"
              placeholder="Type your message here."
              rows={5}
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
              className="min-h-[100px] border-zinc-700 bg-[#111111] text-white placeholder:text-zinc-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="stock" className="block text-base font-medium text-zinc-100">
                Stock
              </Label>
              <Input
                id="stock"
                type="number"
                placeholder="Enter stock quantity"
                value={formData.stock}
                onChange={(e) => handleChange("stock", Number(e.target.value))}
                className="h-11 border-zinc-700 bg-[#111111] text-white placeholder:text-zinc-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="price" className="block text-base font-medium text-zinc-100">
                Price
              </Label>
              <Input
                id="price"
                type="number"
                placeholder="Enter price"
                value={formData.price}
                onChange={(e) => handleChange("price", Number(e.target.value))}
                className="h-11 border-zinc-700 bg-[#111111] text-white placeholder:text-zinc-500"
              />
            </div>
          </div>

          <div className="space-y-2 py-5">
            <Label className="block text-base font-medium text-zinc-100">
              Plant image
            </Label>
            <ImageUpload
              endpoint="postImage"
              value={formData.imageUrl}
              onChange={(url) => handleChange("imageUrl", url)}
            />
          </div>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <Button type="submit">Submit</Button>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
}