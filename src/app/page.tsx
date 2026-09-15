import PlantCatalog from "@/components/ui/PlantCatalog";
import Hero from "@/components/Hero";
import { createAloeVera, getPlants } from "@/actions/plant.action";
import { hexclaveServerApp } from "@/hexclave/server";

export const dynamic = "force-dynamic";

async function addAloeVera(): Promise<void> {
  "use server";
  await createAloeVera();
}

export default async function Page() {
  const user = await hexclaveServerApp.getUser();
  const plants = user ? await getPlants() : undefined;
  const userPlants = plants?.userPlants ?? [];

  return (
    <main>
      <Hero />
      {!user && (
        <div className="px-8 pt-8">
          <a href="/handler/sign-in" className="underline">
            Sign in to see your plant catalog
          </a>
        </div>
      )}
      {user && userPlants.length === 0 && (
        <form action={addAloeVera} className="mx-8 mt-8 rounded-md border p-5">
          <p className="mb-3">No plants found for this Google account.</p>
          <button
            type="submit"
            className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
          >
            Add Aloe Vera
          </button>
        </form>
      )}
      <div id="catalog">
        <PlantCatalog plants={userPlants} />
      </div>
    </main>
  );
}