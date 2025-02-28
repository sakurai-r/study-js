"use client";

import { useEffect, useState } from "react";
import { Calendar, Clock } from "lucide-react";

export default function DateTimeDisplay() {
  const [dateTime, setDateTime] = useState(getFormattedDateTime());

  useEffect(() => {
    const interval = setInterval(() => {
      setDateTime(getFormattedDateTime());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  function getFormattedDateTime() {
    const now = new Date();
    const formattedDate = now.toLocaleDateString("ja-JP", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    const formattedTime = now.toLocaleTimeString("ja-JP", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    return { date: formattedDate, time: formattedTime };
  }

  return (
    <div className="flex items-center w-full  py-2 bg-gray-100 text-gray-800 shadow-md">
      <div className="flex items-center gap-2 px-6">
        <Calendar size={20} />
        <span className="text-lg font-semibold">{dateTime.date}</span>
      </div>

      <div className="flex items-center gap-2">
        <Clock size={20} />
        <span className="text-lg font-semibold">{dateTime.time}</span>
      </div>
    </div>
  );
}
