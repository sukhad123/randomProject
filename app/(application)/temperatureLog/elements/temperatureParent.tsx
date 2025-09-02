"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@heroui/button";
import { TemperatureLogCard, TemperatureEntry } from "./temperatureLog";

const FRIDGE_THRESH_F = { min: 33, max: 41 };
const FREEZER_THRESH_F = { min: -10, max: 10 }; // adjust to your SOP

const initial: TemperatureEntry[] = [
  { dateISO: new Date().toISOString(), locationName: "Walk-in", unit: "F", openingTemp: null, closingTemp: null, notes: "", staff: "", shift: "AM" },
  { dateISO: new Date().toISOString(), locationName: "Line Fridge", unit: "F", openingTemp: null, closingTemp: null, notes: "", staff: "", shift: "AM" },
  { dateISO: new Date().toISOString(), locationName: "Line Freezer", unit: "F", openingTemp: null, closingTemp: null, notes: "", staff: "", shift: "AM" },
  { dateISO: new Date().toISOString(), locationName: "Salad Low Boy", unit: "F", openingTemp: null, closingTemp: null, notes: "", staff: "", shift: "AM" },
  { dateISO: new Date().toISOString(), locationName: "Double Door", unit: "F", openingTemp: null, closingTemp: null, notes: "", staff: "", shift: "AM" },
  { dateISO: new Date().toISOString(), locationName: "Storage Freezer", unit: "F", openingTemp: null, closingTemp: null, notes: "", staff: "", shift: "AM" },
  { dateISO: new Date().toISOString(), locationName: "Dishwasher", unit: "F", openingTemp: null, closingTemp: null, notes: "", staff: "", shift: "AM" },
];

export default function TempLogPage() {
  const router = useRouter();
  const [entries, setEntries] = useState<TemperatureEntry[]>(initial);
  const [current, setCurrent] = useState(0);

  const total = entries.length;
  const entry = entries[current];
  const isLast = current === total - 1;

  const thresholdsFor = (loc: string) =>
    /freezer/i.test(loc) ? FREEZER_THRESH_F : FRIDGE_THRESH_F;

  const handleChange = (next: TemperatureEntry) =>
    setEntries(prev => prev.map((e, i) => (i === current ? next : e)));

  const saveOne = async (e: TemperatureEntry) => {
    // await fetch("/api/temp-log", { method: "POST", body: JSON.stringify(e) });
    console.log("Saving:", e);
  };

  const done = () => {
    alert("✅ All done! Temperature logs saved.");
    router.push('/')
    // If you prefer a hard reload instead:
    // window.location.reload();
  };

  const prev = () => setCurrent(i => Math.max(0, i - 1));
  const next = () => setCurrent(i => Math.min(total - 1, i + 1));

  return (
    <div className="max-w-2xl mx-auto space-y-4">
      <div className="flex items-center justify-between">
        <div className="text-sm text-foreground-500">
          Entry {current + 1} / {total} — {entry.locationName}
        </div>
      </div>

      <TemperatureLogCard
        value={entry}
        onChange={handleChange}
        onSave={async () => {
          await saveOne(entries[current]);
          if (isLast) {
            done();
          } else {
            next();
          }
        }}
        openingThreshold={thresholdsFor(entry.locationName)}
        closingThreshold={thresholdsFor(entry.locationName)}
        staffOptions={["B. Mang", "Sukhad", "J. Doe"]}
        showShiftToggle
        compact
      />

      <div className="flex justify-between gap-2">
        <Button variant="flat" onPress={prev} isDisabled={current === 0}>
          Previous
        </Button>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            onPress={() => {
              if (isLast) done();
              else next();
            }}
          >
            Skip
          </Button>
          <Button
            color="primary"
            onPress={async () => {
              await saveOne(entries[current]);
              if (isLast) done();
              else next();
            }}
          >
            Save & Next
          </Button>
        </div>
      </div>
    </div>
  );
}
