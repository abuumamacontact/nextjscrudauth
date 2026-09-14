"use client";

import { useState } from "react";
import { EditIcon } from "lucide-react";
import toast from "react-hot-toast";

import { editPlant } from "@/actions/plant.action";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Combobox } from "./ui/combo-box";
import ImageUpload from "./ImageUpload";

interface Plant {
  id: string;
  name: string;
  description?: string | null;
  stock: number;
  price: number;
  category: string;
  imageUrl?: string | null;
}

interface EditDialogProps {
  plant: Plant;
}

export default function EditDialog({ plant }: EditDialogProps) {
  const [formData, setFormData] = useState({
    name: plant.name.trim(),
    description: (plant.description || "").trim(),
    stock: plant.stock,
    price: plant.price,
    category: plant.category.trim(),
    imageUrl: plant.imageUrl || "",
  });

  const handleChange = (field: string, value: string | number) => {
    setFormData((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await editPlant(plant.id, formData);
      toast.success("Plant edited successfully");
    } catch (error) {
      console.error("Error editing plant", error);
      toast.error("Failed to edit plant");
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger
        render={
          <Button
            variant="outline"
            className="h-7 gap-1.5 rounded-md border-zinc-300 bg-white px-3 text-xs font-medium text-zinc-900 shadow-sm hover:bg-zinc-100 hover:text-zinc-950"
          />
        }
      >
        <EditIcon className="h-3.5 w-3.5" />
        Edit Plant
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Edit Plant</AlertDialogTitle>
          <AlertDialogDescription>Update the plant details below.</AlertDialogDescription>
        </AlertDialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor={`edit-name-${plant.id}`}>Name</Label>
              <Input
                id={`edit-name-${plant.id}`}
                value={formData.name}
                onChange={(event) => handleChange("name", event.target.value)}
              />
            </div>
            <div>
              <Label htmlFor={`edit-category-${plant.id}`}>Category</Label>
              <Combobox
                value={formData.category}
                onChange={(value) => handleChange("category", value)}
              />
            </div>
          </div>

          <Label htmlFor={`edit-description-${plant.id}`}>Description</Label>
          <Textarea
            id={`edit-description-${plant.id}`}
            value={formData.description}
            onChange={(event) => handleChange("description", event.target.value)}
          />

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor={`edit-stock-${plant.id}`}>Stock</Label>
              <Input
                id={`edit-stock-${plant.id}`}
                type="number"
                value={formData.stock}
                onChange={(event) => handleChange("stock", Number(event.target.value))}
              />
            </div>
            <div>
              <Label htmlFor={`edit-price-${plant.id}`}>Price</Label>
              <Input
                id={`edit-price-${plant.id}`}
                type="number"
                value={formData.price}
                onChange={(event) => handleChange("price", Number(event.target.value))}
              />
            </div>
          </div>

             {/*Image Upload*/}
          <div className="py-5">
            <ImageUpload
              endpoint="postImage"
              value={formData.imageUrl}
              onChange={(url) => {
                handleChange("imageUrl", url);
              }}
            />
          </div>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction type="submit">Save changes</AlertDialogAction>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
