import { IPerson } from "@/lib/utils";
import { createContext } from "react";

type HouseholdContextType = {
    people: IPerson[];
    setPeople: (people: IPerson[]) => void;

}

const HouseholdContext = createContext<HouseholdContextType>(
    {
        people: [],
        setPeople: () => {}
    }
);

export default HouseholdContext;