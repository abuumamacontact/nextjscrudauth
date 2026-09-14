import Link from "next/link";

interface PlantCatalogProps {
  plants: Array<{
    id: string;
    name: string;
    category: string;
    price: number;
    stock: number;
    description: string | null;
    imageUrl: string | null;
  }>;
}

const fallbackPlantImage =
  "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&w=1200&q=80";

export default function PlantCatalog({ plants }: PlantCatalogProps) {

  return (
    <section className="p-8">
      <h1 className="text-3xl font-bold mb-6">Plant Catalog</h1>

      {/* Search and category */}
      <div className="flex gap-4 mb-6">
        <input
          type="text"
          placeholder="Filter plants..."
          className="flex-1 rounded-md border border-gray-700 bg-black px-4 py-3"
        />

        <select className="rounded-md border border-gray-700 bg-black px-4 py-3">
          <option>All categories</option>
          <option>Indoor</option>
          <option>Outdoor</option>
        </select>
      </div>

      {/* Table */}
      <div className="w-full overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="px-4 py-3 text-left">Plant ID</th>
              <th className="px-4 py-3 text-left">Image</th>
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">Category</th>
              <th className="px-4 py-3 text-left">Price</th>
              <th className="px-4 py-3 text-left">Stock</th>
              <th className="px-4 py-3 text-left">Description</th>
              <th className="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {plants.map(function (plant): import("react").JSX.Element {
              const plantUrl = `/plants/${plant.id}--${plant.name
                .toLowerCase()
                .trim()
                .replace(/\s+/g, "-")}`;

              return (
                <tr
                  key={plant.id}
                  className="cursor-pointer border-b border-gray-800 hover:bg-gray-900"
                >
                  <td className="px-4 py-4">
                    <Link href={plantUrl} className="hover:underline">
                      {plant.id}
                    </Link>
                  </td>
                  <td className="px-4 py-4">
                    <img
                      src={plant.imageUrl?.trim() ? plant.imageUrl : fallbackPlantImage}
                      alt={plant.name}
                      className="h-12 w-12 rounded object-cover"
                    />
                  </td>
                  <td className="px-4 py-4">
                    <Link href={plantUrl} className="font-medium hover:underline">
                      {plant.name}
                    </Link>
                  </td>
                  <td className="px-4 py-4">{plant.category}</td>
                  <td className="px-4 py-4">{plant.price}</td>
                  <td className="px-4 py-4">{plant.stock}</td>
                  <td className="max-w-xs px-4 py-4">
                    {plant.description || "No description"}
                  </td>

                  <td className="px-4 py-4">
                    <div className="flex gap-2">
                      <Link
                        href={plantUrl}
                        className="rounded-md bg-blue-600 px-3 py-2 text-white"
                      >
                        View
                      </Link>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}