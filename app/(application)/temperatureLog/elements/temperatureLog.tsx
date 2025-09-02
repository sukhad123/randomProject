
"use client";

import React, { useMemo, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Input,
  Button,
  Chip,
  Divider,
  Select,
  SelectItem,
  Textarea,
  Switch,
} from "@heroui/react";
import { Thermometer, Check, AlertTriangle } from "lucide-react";

type TempUnit = "F" | "C";
//TODO: Move this to different file
export type TemperatureEntry = {
  id?: string;
  dateISO: string;             // e.g. new Date().toISOString()
  locationName: string;        // e.g. "Walk-in"
  unit: TempUnit;              // "F" | "C"
  openingTemp: number | null;
  closingTemp: number | null;
  notes?: string;
  staff?: string;              // optional staff name / initials
  shift?: "AM" | "PM";         // optional
};

export type Thresholds = {
  min: number; // inclusive
  max: number; // inclusive
};

type Props = {
  value: TemperatureEntry;
  onChange?: (next: TemperatureEntry) => void;
  onSave?: (data: TemperatureEntry) => Promise<void> | void;
  openingThreshold?: Thresholds; // e.g. fridge F: { min: 33, max: 41 }
  closingThreshold?: Thresholds;
  staffOptions?: string[];      // dropdown options
  showShiftToggle?: boolean;    // AM/PM switch
  disabled?: boolean;
  compact?: boolean;
};

function isInRange(val: number | null, t?: Thresholds) {
  if (val == null || !t) return true; // treat empty as neutral
  return val >= t.min && val <= t.max;
}

export const TemperatureLogCard: React.FC<Props> = ({
  value,
  onChange,
  onSave,
  openingThreshold,
  closingThreshold,
  staffOptions = [],
  showShiftToggle = true,
  disabled = false,
  compact = false,
}) => {
  const [pending, setPending] = useState(false);

  const openingOK = isInRange(value.openingTemp, openingThreshold);
  const closingOK = isInRange(value.closingTemp, closingThreshold);

  const overallOK = useMemo(() => {
    const okOpen = value.openingTemp == null ? true : openingOK;
    const okClose = value.closingTemp == null ? true : closingOK;
    return okOpen && okClose;
  }, [openingOK, closingOK, value.openingTemp, value.closingTemp]);

  const setField = <K extends keyof TemperatureEntry>(key: K, v: TemperatureEntry[K]) => {
    onChange?.({ ...value, [key]: v });
  };

  const parseNum = (s: string) => (s.trim() === "" ? null : Number(s));

  const unitChipColor = value.unit === "F" ? "primary" : "secondary";

  const headerIcon = overallOK ? (
    <Chip color="success" startContent={<Check size={14} />} variant="flat">
      OK
    </Chip>
  ) : (
    <Chip color="danger" startContent={<AlertTriangle size={14} />} variant="flat">
      Check
    </Chip>
  );

  const labelSize = compact ? "sm" : "md";
  const inputSize = compact ? "sm" : "md";

  const handleSave = async () => {
    if (!onSave) return;
    try {
      setPending(true);
      await onSave(value);
    } finally {
      setPending(false);
    }
  };

  return (
    <Card shadow="sm" className={compact ? "max-w-xl" : "max-w-2xl"}>
      <CardHeader className="flex justify-between items-center gap-3">
        <div className="flex items-center gap-2">
          <Thermometer size={18} />
          <div className="font-semibold">{value.locationName}</div>
          <Chip size="sm" color={unitChipColor} variant="flat">
            °{value.unit}
          </Chip>
        </div>
        {headerIcon}
      </CardHeader>
      <Divider />
      <CardBody className="grid grid-cols-1 md:grid-cols-2 gap-4">

        {/* <Select
          label="Staff"
          labelPlacement="outside"
          selectedKeys={value.staff ? [value.staff] : []}
          onSelectionChange={(keys) => {
            const [first] = Array.from(keys) as string[];
            setField("staff", first || "");
          }}
          size={inputSize}
          isDisabled={disabled}
        >
          {staffOptions.map((s) => (
            <SelectItem key={s} value={s}>
              {s}
            </SelectItem>
          ))}
        </Select> */}

        <Input
          type="number"
          label="Opening Temp"
          labelPlacement="outside"
          size={inputSize}
          value={value.openingTemp !== null && value.openingTemp !== undefined ? String(value.openingTemp) : ""}
          onChange={(e) => setField("openingTemp", parseNum(e.target.value))}
          description={
            openingThreshold
              ? `Range: ${openingThreshold.min}–${openingThreshold.max}°${value.unit}`
              : undefined
          }
          validationState={
            value.openingTemp == null ? undefined : openingOK ? "valid" : "invalid"
          }
          color={value.openingTemp == null ? "default" : openingOK ? "success" : "danger"}
          isDisabled={disabled}
        />

        <Input
          type="number"
          label="Closing Temp"
          labelPlacement="outside"
          size={inputSize}
          value={value.closingTemp !== null && value.closingTemp !== undefined ? String(value.closingTemp) : ""}
          onChange={(e) => setField("closingTemp", parseNum(e.target.value))}
          description={
            closingThreshold
              ? `Range: ${closingThreshold.min}–${closingThreshold.max}°${value.unit}`
              : undefined
          }
          validationState={
            value.closingTemp == null ? undefined : closingOK ? "valid" : "invalid"
          }
          color={value.closingTemp == null ? "default" : closingOK ? "success" : "danger"}
          isDisabled={disabled}
        />

        <Textarea
          label="Notes"
          labelPlacement="outside"
          minRows={compact ? 2 : 3}
          size={inputSize}
          value={value.notes ?? ""}
          onChange={(e) => setField("notes", e.target.value)}
          isDisabled={disabled}
          className="md:col-span-2"
        />

    
      </CardBody>
     
    </Card>
  );
};
