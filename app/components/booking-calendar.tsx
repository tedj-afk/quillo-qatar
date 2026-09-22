"use client";

import { useEffect } from "react";
import Cal, { getCalApi } from "@calcom/embed-react";
import { bookingUrl } from "@/lib/booking";

const calendarUrl = new URL(bookingUrl);
const calendarConfig = {
  ...Object.fromEntries(calendarUrl.searchParams),
  layout: "month_view",
  theme: "light",
} as const;

export default function BookingCalendar() {
  useEffect(() => {
    let active = true;
    void getCalApi({ namespace: "hippo-booking" }).then(cal => {
      if (!active) return;
      cal("ui", {
        theme: "light",
        cssVarsPerTheme: {
          light: { "cal-brand": "#ff5000" },
          dark: { "cal-brand": "#ff5000" },
        },
        hideEventTypeDetails: false,
        layout: "month_view",
      });
    });
    return () => { active = false; };
  }, []);

  return (
    <Cal
      namespace="hippo-booking"
      calOrigin={calendarUrl.origin}
      calLink={calendarUrl.pathname.replace(/^\/+|\/+$/g, "")}
      config={calendarConfig}
      className="ag-booking-calendar"
    />
  );
}
