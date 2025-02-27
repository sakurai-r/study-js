import { TripPlanItem } from "../../lib/types";

type SpotCardProps = {
  spot: TripPlanItem;
};

export default function SpotCard({ spot }: SpotCardProps) {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden p-4 flex flex-col items-center">
      <h3 className="font-bold text-lg">{spot.spot}</h3>
      <p className="text-gray-700 text-sm text-center">{spot.description}</p>
      <p className="text-blue-600 font-bold mt-2">
        滞在時間： {spot.duration}分
      </p>
      {spot.travel_time !== null && (
        <p className="text-red-600 font-bold mt-2">
          移動時間: {spot.travel_time}分
        </p>
      )}
    </div>
  );
}
