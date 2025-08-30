import { currentDate } from "@/app/utils/date"
export const Header =()=>
{
    return(
    <section><h1 className="text-3xl font-semibold mb-6 text-center  ">
        Closing Duties Checklist
        <span className="block text-lg  mt-2">{currentDate}</span> {/* Display the current date */}
      </h1>
      </section>);
}