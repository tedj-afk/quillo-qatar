"use client";

import { useEffect, useState } from "react";
import Cal, { getCalApi } from "@calcom/embed-react";
import { bookingUrl } from "@/lib/booking";

const calendarUrl = new URL(bookingUrl);
const calendarConfig = {
  ...Object.fromEntries(calendarUrl.searchParams),
  layout: "month_view",
  theme: "light",
} as const;

export default function BookingCalendar() {
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    let active = true;
    void getCalApi({ namespace: "quillo-booking" }).then(cal => {
      if (!active) return;
      cal("ui", {
        theme: "light",
        cssVarsPerTheme: {
          light: { "cal-brand": "#171816" },
          dark: { "cal-brand": "#171816" },
        },
        hideEventTypeDetails: false,
        layout: "month_view",
      });
    }).catch(() => { if (active) setFailed(true); });
    return () => { active = false; };
  }, []);

  if (failed) return <p role="status">The embedded calendar could not load. Please use the calendar link below.</p>;
  return (
    <Cal
      namespace="quillo-booking"
      calOrigin={calendarUrl.origin}
      calLink={calendarUrl.pathname.replace(/^\/+|\/+$/g, "")}
      config={calendarConfig}
      className="ag-booking-calendar"
    />
  );
}
