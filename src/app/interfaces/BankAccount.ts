import { AccountType } from "./AccountType";
import { Bank } from "./Bank";

export interface BankAccount {
    bankAccountId: number;
    Bank: Bank;
    accountNumber: string;
    accountName: string;
    AccountType: AccountType;
    isActive: boolean;
    typeAccounts: string;
  }