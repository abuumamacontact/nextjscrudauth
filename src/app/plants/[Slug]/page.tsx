import PlantCard from './PlantCard';
import { getPlantByRoute } from '@/actions/plant.action';
import { hexclaveServerApp } from '@/hexclave/server';


export async function generateMetadata({
  params,
}: {
  params: Promise<{ Slug: string }>;
}) {
  const resolvedParams = await params;
  const slug = resolvedParams.Slug ?? "";
  const [id, ...nameParts] = slug.split("--");

  const plant = id ? await getPlantByRoute(id, nameParts.join("--")) : null;

  return {
    title: plant ? plant.name : "Plant Details",
    description: plant ? plant.description : "Plant details page",
  };
}

async function page({ params }: { params: Promise<{ Slug: string }> }) {
  const user = await hexclaveServerApp.getUser();
  const resolvedParams = await params;
  const slug = resolvedParams.Slug ?? "";
  const [id, ...nameParts] = slug.split("--");

  if (!user) {
    return (
      <div className="flex justify-center mt-20 items-center">
        <a href="/Signin" className="underline">
          Sign in to view this plant
        </a>
      </div>
    );
  }

  if (!id) {
    return <div className="mt-7 px-4">Plant not found.</div>;
  }

  const plant = await getPlantByRoute(id, nameParts.join("--"));

  return (
     <div className="mt-7 max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-10 gap-6">
              <div className="lg:col-span-full">
                <PlantCard plant={plant} />
              </div>
            </div>
  )
}

export default page