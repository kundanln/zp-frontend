import { ZpModel } from "./zp.model";

export class LoanPaymentModel{
    id ? : number;
	zpId : number;
	installmentNumber : number;
	grantDate : Date;
	receiptNo : number;
	chequeNo : number;
	bankName : string;
	issueDate : Date;
	installmentAmount : number;
	amount : number;
	
	
}