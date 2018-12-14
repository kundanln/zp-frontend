import { VillageModel } from "./village.model";
export class ReceiptEntry{
    id ?: number;
	villageId : number;
	zpId : number;
	installNo : number;
	amountReceived : number;
	dueDate : Date;
	receiptNo : number;
	receiptDate : Date;
	receiptAmount : number;
	interestAmount : number;
	totalInterest : number;
	interestBalance : number;
	ddAmount : number;
	ddNo : number;
	ddDate : Date;
	bankName : string;
	ddBalance : number;
	ddFlag : boolean;
	paidInstallment : number;
	paidInterestAmount : number;
	duePenaultInterest : number;
	currentInterest : number;
	installmentBalance : number;
	totalBalance : number;
	outstandingBalance : number;
}