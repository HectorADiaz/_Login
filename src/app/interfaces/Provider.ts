import { EntityAccount } from "./EntityAccount";

export interface Provider {
    providersId: number;
    businessName: string;
    commercialName: string;
    fiscalAddress?: string;
    nit?: string;
    phone?: string;
    email?: string;
    managerName?: string;
    managerPhone?: string;
    EntityAccounts?: EntityAccount[]; // Lista opcional de cuentas bancarias
  }  //TODO Los bancos no son obligatarios
  


  