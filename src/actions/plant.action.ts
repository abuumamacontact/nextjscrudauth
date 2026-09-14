"use server";

import { prisma } from "@/lib/prisma";
import { getUserId } from "./user.action";
import { revalidatePath } from "next/cache";
import { Prisma } from "@prisma/client";

export async function getPlants(searchTerm?: string) {
  try {
    const currentUserId = await getUserId();

    const whereClause: Prisma.PlantsWhereInput = {
      userId: currentUserId,
    };

    if (searchTerm) {
      whereClause.name = {
        contains: searchTerm,
        mode: "insensitive",
      };
    }

    const userPlants = await prisma.plants.findMany({
      where: whereClause,
    });

    return { success: true, userPlants };
  } catch (error) {
    console.error("Error in getPlants", error);
    throw error;
  }
}

export async function getPlantById(id: string) {
  const currentUserId = await getUserId();

  if (!currentUserId) return null;

  return await prisma.plants.findFirst({
    where: { id, userId: currentUserId },
  });
}

export async function getPlantByRoute(id: string, slugName?: string) {
  const currentUserId = await getUserId();

  if (!currentUserId) return null;

  const plantName = slugName?.replace(/-/g, " ").trim();

  return await prisma.plants.findFirst({
    where: {
      userId: currentUserId,
      OR: [
        { id },
        ...(plantName
          ? [{ name: { equals: plantName, mode: "insensitive" as const } }]
          : []),
      ],
    },
  });
}

export async function createPlant(data: Prisma.PlantsCreateInput) {
  try {
    const currentUserId = await getUserId();
    if (!currentUserId) return;

    const name = data.name.trim();
    const category = data.category.trim();
    const description = data.description?.trim() || null;
    const imageUrl = data.imageUrl?.trim() || null;

    const duplicatePlant = await prisma.plants.findFirst({
      where: {
        userId: currentUserId,
        name: { equals: name, mode: "insensitive" },
        category: { equals: category, mode: "insensitive" },
        description,
        imageUrl,
        stock: data.stock,
        price: data.price,
      },
    });

    if (duplicatePlant) {
      throw new Error("DUPLICATE_PLANT");
    }

    const newPlant = await prisma.plants.create({
      data: {
        ...data,
        name,
        category,
        description,
        imageUrl,
        userId: currentUserId,
      },
    });
    revalidatePath("/plants");
    return newPlant;
  } catch (error) {
    console.error("Error Creating Plant:", error);
    throw error;
  }
}

export async function editPlant(
  id: string, //identify which plant we are editing
  data: Prisma.PlantsUpdateInput
) {
  try {
    const currentUserId = await getUserId();
    await prisma.plants.update({
      where: { id },
      data: {
        ...data,
        userId: currentUserId,
      },
    });
    revalidatePath("/plants");
  } catch (error) {
    console.error("Error updating plant:", error);
    throw error;
  }
}

export async function deletePlant(
  id: string //identify which plant we are editing
) {
  try {
    const currentUserId = await getUserId();
    if (!currentUserId) return;

    const deletedPlant = await prisma.plants.delete({
      where: { id },
    });
    revalidatePath("/plants");
    return deletedPlant;
  } catch (error) {
    console.error("Error deleting plant:", error);
    throw error;
  }
}

export async function createAloeVera() {
  const currentUserId = await getUserId();

  if (!currentUserId) {
    throw new Error("You must be signed in to create a plant.");
  }

  const existingPlant = await prisma.plants.findFirst({
    where: {
      userId: currentUserId,
      name: "aloe vera",
    },
  });

  if (existingPlant) {
    return existingPlant;
  }

  const plant = await prisma.plants.create({
    data: {
      name: "aloe vera",
      description: "A low-maintenance indoor plant",
      category: "Indoor",
      price: 2,
      stock: 32,
      userId: currentUserId,
    },
  });

  revalidatePath("/");
  revalidatePath("/plants");
  return plant;
}