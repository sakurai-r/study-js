import { TripPlanItem } from "../../lib/types";

type TimelineProps = {
  data: TripPlanItem[];
};

export default function Timeline({ data }: TimelineProps) {
  return (
    <div className="relative border-l-4 border-blue-500 p-4 space-y-6">
      {data.map((item, index) => (
        <div key={index} className="ml-4">
          <div className="absolute -left-2 w-4 h-4 bg-blue-500 rounded-full"></div>
          <h3 className="font-bold text-lg">
            {item.time} - {item.spot}
          </h3>
          <p className="text-gray-700">{item.description}</p>
        </div>
      ))}
    </div>
  );
}
