

"use client"
import { useState ,useEffect} from 'react'
 
import {Checkbox} from "@heroui/checkbox";
const ClosingDuties = () => {
  // Initialize state for all checkboxes
  const [duties, setDuties] = useState({
    serviceSide1: false,
    serviceSide2: false,
    serviceSide3: false,
    serviceSide4: false,
    serviceSide5: false,
    prepSide1: false,
    prepSide2: false,
    dishPit1: false,
    dishPit2: false,
    dishPit3: false,
    dishPit4: false,
    kitchen1: false,
    kitchen2: false,
    kitchen3: false,
    kitchen4: false,
    kitchen5: false,
  })
  useEffect(()=>{
    console.log(duties);
    
  },[duties])
   const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  })
  

  // Toggle the checkbox state
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target
    setDuties(prev => ({
      ...prev,
      [name]: checked,
    }))
  }

  return (
    <div className="max-w-3xl mx-auto p-6 rounded-lg shadow-md">
      <h1 className="text-3xl font-semibold mb-6 text-center  ">
        Closing Duties Checklist
        <span className="block text-lg  mt-2">{currentDate}</span> {/* Display the current date */}
      </h1>

      <form className="space-y-4">
        <h2 className="text-xl font-semibold">Service Side</h2>
        <div className="space-y-2">
          {[
            'Flip all items on the Line. Top up beverages and backups.',
            'Empty/Dispose proteins. Drain/Clean steam table.',
            'Clean and season flat top. Pull out the drip tray.',
            'Filter/Flush the Fryer (Alternate Days).',
            'Turn off Gas/Check propane levels/backup.',
          ].map((task, index) => (
            <div key={index} className="flex items-center">
              <Checkbox
                onChange={handleChange}
                className="mr-2"
              />
              <label htmlFor={`serviceSide${index + 1}`}>{task}</label>
            </div>
          ))}
        </div>

        <h2 className="text-xl font-semibold">Prep Side</h2>
        <div className="space-y-2">
          {[
            'Label items away/FIFO all prep.',
            'Create linebacks up. Make sure Walkin is organized.',
          ].map((task, index) => (
            <div key={index} className="flex items-center">
              <Checkbox
                id={`prepSide${index + 1}`}
                name={`prepSide${index + 1}`}
                
                onChange={handleChange}
                className="mr-2"
              />
              <label htmlFor={`prepSide${index + 1}`}>{task}</label>
            </div>
          ))}
        </div>

        <h2 className="text-xl font-semibold">Dish Pit</h2>
        <div className="space-y-2">
          {[
            'Clean/Wipe/Put away ALL DISHES.',
            'Check chemical levels.',
            'Check dishwasher/Clean out filters.',
            'Scrub sink/stinky garbage.',
          ].map((task, index) => (
            <div key={index} className="flex items-center">
              <Checkbox
                id={`dishPit${index + 1}`}
                name={`dishPit${index + 1}`}
               
                onChange={handleChange}
                className="mr-2"
              />
              <label htmlFor={`dishPit${index + 1}`}>{task}</label>
            </div>
          ))}
        </div>

        <h2 className="text-xl font-semibold">Kitchen</h2>
        <div className="space-y-2">
          {[
            'Scrub/Wipe/Organize/ sanitize surfaces.',
            'Empty hand sink/fill water.',
            'Take out trash/box/cardboard.',
            'Check for spoons/unwrapped/unlabeled items.',
            'PM temperature log.',
          ].map((task, index) => (
            <div key={index} className="flex items-center">
              <Checkbox
                id={`kitchen${index + 1}`}
                name={`kitchen${index + 1}`}
                
                onChange={handleChange}
                className="mr-2"
              />
              <label htmlFor={`kitchen${index + 1}`}>{task}</label>
            </div>
          ))}
        </div>

        <div className="mt-6 text-center">
          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 focus:outline-none"
          >
            Submit Checklist
            
          </button>
        </div>
      </form>
    </div>
  )
}

export default ClosingDuties
