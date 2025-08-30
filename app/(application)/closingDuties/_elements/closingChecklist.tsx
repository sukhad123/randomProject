"use client";
import { useState } from "react";
import CardComponent from "./card";
import { useRouter } from "next/navigation";
import {Select, SelectItem} from "@heroui/react";
import React from "react"

export default function TaskList() {
    const router = useRouter();
    const [name,setName] = useState<string>("");

 const employees = [
  { key: "anjel", label: "Anjel" },
  { key: "babs", label: "Babs" },
  { key: "sukhad", label: "Sukhad" },
  { key: "john", label: "John" },
  { key: "julian", label: "Julian" },
  { key: "jebish", label: "Jebish" },
  { key: "mansub", label: "Mansub" },
];
//closerEmployee
const [closerEmployee, setCloserEmployee] = useState('')

const[getEmployee,setEmployee] =useState<boolean>(true);
  //TODO: Move this to different file
  const allTasks = [
    "Flip all items on the Line. Top up beverages and backups.",
    "Empty/Dispose proteins. Drain/Clean steam table.",
    "Clean and season flat top. Pull out the drip tray.",
    "Filter/Flush the Fryer (Alternate Days).",
    "Turn off Gas/Check propane levels/backup.",
    "Label items away/FIFO all prep.",
    "Create linebacks up. Make sure Walkin is organized.",
    "Clean/Wipe/Put away ALL DISHES.",
    "Check chemical levels.",
    "Check dishwasher/Clean out filters.",
    "Scrub sink/stinky garbage.",
    "Scrub/Wipe/Organize/ sanitize surfaces.",
    "Empty hand sink/fill water.",
    "Take out trash/box/cardboard.",
    "Check for spoons/unwrapped/unlabeled items.",
    "PM temperature log.",
  ];

  const [taskStatus, setTaskStatus] = useState<(boolean | null)[]>(
    Array(allTasks.length).fill(null)
  );
    const [value, setValue] = React.useState("");

  const handleSelectionChange = (e:any)=> {
    setValue(e.target.value);
    setEmployee(false);
  };

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSetTask = (value: boolean) => {
    const updated = [...taskStatus];
    updated[currentIndex] = value;
    setTaskStatus(updated);

    // move to next task if available
    if (currentIndex < allTasks.length - 1) {
      setCurrentIndex(currentIndex + 1);
  
    } else {
    //  router.push("/")
      alert(taskStatus)

    }
  };


  return (<>
{getEmployee ? (
  <Select
      className="max-w-xs "
      items={employees}
      placeholder="Select an employee"
        variant="bordered"
            onChange={handleSelectionChange}
      
    >
      {(animal) => <SelectItem >{animal.label}</SelectItem>}
    </Select>
):(
      <CardComponent
        title={allTasks[currentIndex]}
        value={taskStatus[currentIndex]}
        setValue={handleSetTask}
        progress = {(currentIndex+1)/16*(100)}
      />)}
      </>
 
  );
}
