import ModelTemplate from "../closingDuties/_elements/test";
import { Header } from "../closingDuties/_elements/header";
import TempLogPage from "./elements/temperatureParent";
export default function Page() {
  return (<ModelTemplate header={<Header />} body={<TempLogPage />} />
  );
}
