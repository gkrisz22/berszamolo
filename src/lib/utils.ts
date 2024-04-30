import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatNumber(number: number, currency: string = "Ft") {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " " + currency;
}

export interface IPerson {
  id: number;               // Azonosító
  name: string;             // Név
  salary: number;           // Bruttó bér
  under25: boolean;         // 25 év alattiak SZJA mentessége
  freshMarried: boolean;    // Friss házasok kedvezménye
  marriageDate?: Date;      // Házasságkötés dátuma
  taxReducted: boolean;     // Személyi adókedvezmény
  familyDiscount: boolean;  // Családi kedvezmény
  unemployed?: number;      // Eltartott
  reducted?: number;        // Eltartott és kedvezményezett
  nettoSalary?: number;     // Nettó bér
};

export const calculateNetto = (person: IPerson) => {
  
  let szja = person.salary * 0.15;
  let tb = person.salary * 0.185;

  let netto = person.salary - szja - tb;

  if (person.under25 && person.salary <= 499952) {
    szja = 0; 
  } else if (person.under25 && person.salary > 499952) {
    const diff = person.salary - 499952;

    szja = diff * 0.15;
  }


  if (tb < 0) {
    tb = 0;
  }

  let osszes_ado = szja + tb;
  if (person.taxReducted) {
    osszes_ado = (osszes_ado - 77300) > 0 ? osszes_ado - 77300 : 0;
  }

  if (person.freshMarried && person.marriageDate) {
    const now = new Date();
    const diff = now.getFullYear() - person.marriageDate.getFullYear();
    if (diff < 2) {
      osszes_ado -= 5000;
    } else if (diff === 2) {
      if (now.getMonth() >= person.marriageDate.getMonth() + 1) {
        osszes_ado -= 5000;
      }
    }
  }

  if(person.familyDiscount && person.unemployed && person.reducted) {
    if(person.reducted === 1) {
      osszes_ado -= 10000 * person.unemployed;
    }
    else if(person.reducted === 2) {
      osszes_ado -= 20000 * person.unemployed;
    }
    else if(person.reducted === 3) {
      osszes_ado -= 33000 * person.unemployed;
    }
  }


  if(osszes_ado < 0) {
    osszes_ado = 0;
  }

  netto = person.salary - osszes_ado;


  return Math.round(netto);


};