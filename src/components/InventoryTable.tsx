"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Search } from "lucide-react";
import EditDialog from "./EditDialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { cn } from "@/lib/utils";
import DeleteDialog from "./DeleteDialog";

export interface Plant {
  id: string;
  name: string;
  description?: string | null;
  category: string;
  price: number;
  stock: number;
}

interface Plants {
  userPlants: Plant[];
}

interface InventoryTableProps {
  plants?: Plants;
}

export default function InventoryTable({ plants }: InventoryTableProps) {
  const router = useRouter();

  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const userPlants = plants?.userPlants ?? [];

  // Filter plants by name and category (if selected)
  const filteredPlants = userPlants.filter(
    (plant) =>
      plant.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory === "" || plant.category === selectedCategory)
  );


  if (!plants) {
    return (
      <div className="w-full space-y-4">
        <div className="flex items-center gap-2 py-4">
          <div className="h-10 w-full max-w-sm animate-pulse rounded-md bg-muted" />
          <div className="h-10 w-32 animate-pulse rounded-md bg-muted" />
          <div className="h-10 w-32 animate-pulse rounded-md bg-muted" />
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <div className="h-4 w-full animate-pulse rounded bg-muted" />
              </TableHead>
              <TableHead>
                <div className="h-4 w-full animate-pulse rounded bg-muted" />
              </TableHead>
              <TableHead>
                <div className="h-4 w-full animate-pulse rounded bg-muted" />
              </TableHead>
              <TableHead>
                <div className="h-4 w-full animate-pulse rounded bg-muted" />
              </TableHead>
              <TableHead>
                <div className="h-4 w-full animate-pulse rounded bg-muted" />
              </TableHead>
              <TableHead className="text-right">
                <div className="h-4 w-full animate-pulse rounded bg-muted" />
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 5 }).map((_, i) => (
              <TableRow key={i}>
                <TableCell>
                  <div className="h-4 w-full animate-pulse rounded bg-muted" />
                </TableCell>
                <TableCell>
                  <div className="h-4 w-full animate-pulse rounded bg-muted" />
                </TableCell>
                <TableCell>
                  <div className="h-4 w-full animate-pulse rounded bg-muted" />
                </TableCell>
                <TableCell>
                  <div className="h-4 w-full animate-pulse rounded bg-muted" />
                </TableCell>
                <TableCell>
                  <div className="h-4 w-full animate-pulse rounded bg-muted" />
                </TableCell>
                <TableCell className="text-right">
                  <div className="h-4 w-full animate-pulse rounded bg-muted" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="flex items-center gap-2 py-4">
        <div className="relative max-w-sm w-full">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
          <input
            placeholder="Filter plants..."
            className="h-10 w-full rounded-md border border-zinc-700 bg-zinc-950 pl-10 text-sm text-white outline-none ring-0 placeholder:text-zinc-400"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <select
          aria-label="Filter by category"
          className={cn("h-10 rounded-md border border-zinc-700 bg-zinc-950 px-3 text-sm text-white outline-none")}
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">All categories</option>
          {Array.from(new Set(userPlants.map((plant) => plant.category))).map(
            (category) => <option key={category} value={category}>{category}</option>
          )}
        </select>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Plant ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredPlants.map((plant) => {
            const plantSlug = `${plant.id}--${plant.name
              .toLowerCase()
              .trim()
              .replace(/\s+/g, "-")}`;
            const plantUrl = `/plants/${plantSlug}`;

            return (
              <TableRow
                key={plant.id}
                onClick={() => router.push(plantUrl)}
                className="cursor-pointer"
              >
                <TableCell>
                  <Link
                    href={plantUrl}
                    className="hover:underline"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {plant.id}
                  </Link>
                </TableCell>

                <TableCell>
                  <Link
                    href={plantUrl}
                    className="font-medium hover:underline"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {plant.name}
                  </Link>
                </TableCell>
                <TableCell>{plant.category}</TableCell>
                <TableCell>{plant.price}</TableCell>
                <TableCell className="font-bold">{plant.stock}</TableCell>

                <TableCell className="text-right">
                  <div
                    className="flex justify-end space-x-4"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      type="button"
                      className="text-sm underline"
                      onClick={() => router.push(plantUrl)}
                    >
                      View
                    </button>
                    <EditDialog plant={plant} />
                    <DeleteDialog plant={plant} />
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}