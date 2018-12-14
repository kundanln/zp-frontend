import { VillageModel } from "./village.model";
export class ZpModel {
    id? : number;
	ledgerNo : number;
	villageId : number;
	villageName : string;
	taluka : string;
	district : string;
	workParticulars : string;
	openingBalance : number;
	loanAmount : number;
	orderNumber : number;
	sanctionDate : string;
	noOfInstallment : number;
	lastDueDate : Date;
	balance : number;
	yearlyInstAmount : number;
	totalAmountPaid : number;
	loanBalance : number;
	closingBalance : number;
	closingFlag : boolean;
	//villageModel : VillageModel;
}