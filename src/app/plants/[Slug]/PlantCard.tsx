
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Badge } from "../../../components/ui/badge";
import { getPlantById } from "@/actions/plant.action";


type Plant = Awaited<ReturnType<typeof getPlantById>>;

interface PlantCardProps {
  plant: Plant;
}

const fallbackPlantImage =
  "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&w=1200&q=80";

export default function PlantCard({ plant }: PlantCardProps) {

    
  if (!plant) {
    return <div>Plant data is not available.</div>;
  }

  const imageSrc = plant.imageUrl?.trim() ? plant.imageUrl : fallbackPlantImage;

  return (
    <Card className="max-w">
      <div className="flex flex-row">
        <div className="basis-2/4">
          <CardHeader>
            <div className="rounded-lg overflow-hidden">
              <img
                src={imageSrc}
                alt={plant.name || "Plant image"}
                className="w-full h-auto object-cover"
              />
            </div>
          </CardHeader>
        </div>
        <div className="basis-2/4 flex flex-col justify-between">
          <CardContent className="mt-8 space-y-3">
            <CardTitle className="text-5xl font-bold">{plant.name}</CardTitle>
            <CardTitle className="text-3xl font-bold">${plant.price}</CardTitle>
            <Badge>{plant.category}</Badge>
            <CardDescription>Stock: {plant.stock}</CardDescription>
            <CardDescription className="text-white">
              {plant.description}
            </CardDescription>
          </CardContent>
        </div>
      </div>
    </Card>
  );
}