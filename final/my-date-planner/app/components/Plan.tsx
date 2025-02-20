type PlanProps = {
  data: {
    time: string;
    spot: string;
    description: string;
  }[];
};

export default function Plan({ data }: PlanProps) {
  return (
    <div className="p-4 space-y-4 bg-white rounded-lg shadow-md">
      {data.map((item, index) => (
        <div key={index} className="border p-2">
          <h3 className="font-bold">
            {item.time} - {item.spot}
          </h3>
          <p>{item.description}</p>
        </div>
      ))}
    </div>
  );
}
