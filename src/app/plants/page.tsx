

import { getPlants } from "@/actions/plant.action";
import CreateDialog from "@/components/Createdialog";
import InventoryTable from "@/components/InventoryTable";
import { hexclaveServerApp } from "@/hexclave/server";

async function page() {
  const user = await hexclaveServerApp.getUser();
  const plants = await getPlants();

  return (
    <>
      {user ? (
        <div className="mt-7 max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-10 gap-6">
          <div className="lg:col-span-full">
            <div className="mb-4 flex justify-end">
              <CreateDialog />
            </div>
            <InventoryTable plants={plants} />
          </div>
        </div>
      ) : (
        <div className="flex justify-center mt-20 items-center">
          <a href="/Signin" className="underline">
            Sign in to view your plants
          </a>
        </div>
      )}
    </>
  );
}

export default page;