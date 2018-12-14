import { Component, OnInit } from '@angular/core';
import { VillageModel } from '../../_models/village.model';
import { ZpModel } from '../../_models/zp.model';
import { LoanPaymentService } from '../../_services/loan-payment.service';
import { VillageService } from '../../_services/village.service';
import { ZPService } from '../../_services/zp.service';
import { ReceiptEntryService } from '../../_services/receipt-entry.service';
import { ReceiptEntry } from '../../_models/receipt-entry.model';
import { LoanPaymentModel } from '../../_models/loan-payment.model';

@Component({
	selector: 'app-receipt-entry-add',
	templateUrl: './receipt-entry-add.component.html',
	styleUrls: ['./receipt-entry-add.component.css']
})
export class ReceiptEntryAddComponent implements OnInit {

	dropdownList: VillageModel[] = [];
	receiptEntryList: ReceiptEntry[] = [];
	loanDetailsList: LoanPaymentModel[] = [];
	public talukaList: Array<string> = [];
	public villageList: Array<string> = [];
	public workList: Array<string> = [];
	zpDataList: ZpModel[];
	zpModel: ZpModel;
	selectedTaluka: string;
	selectedVillage: string;
	selectedWorkP: string;
	grantDate: String;
	orderNumber: number;
	ledgerNumber: number;
	loanAmount: number; //txtgrantamt
	yerlyInstallment: number;
	totalAmtPaid: number;
	loanBalance: number;
	lastDueDate: Date;
	dueFlag: boolean;
	duePrevFlag: boolean;
	dueNextFlag: boolean;
	total: number;
	install1Amount: number;
	install1Date: Date;
	install2Amount: number;
	install2Date: Date;
	install3Amount: number;
	install3Date: Date;
	ddAmtBal: number;
	varLoanBalance: number;
	varInstallBalance: number;
	varInterestBalance: number;
	varPenalty: number;
	dBalance: number;
	amountRcvd: number;
	interestAmt: number;
	varInstallInerest: number;
	pdFlag: boolean;
	prevReceiptDate: Date;

	model: ReceiptEntry = {
		villageId: null,
		zpId: null,
		installNo: null,
		amountReceived: null,
		dueDate: null,
		receiptNo: null,
		receiptDate: null,
		receiptAmount: null,
		interestAmount: null,
		totalInterest: null,
		ddAmount: null,
		ddNo: null,
		ddDate: null,
		bankName: null,
		ddBalance: null,
		ddFlag: null,
		paidInstallment: null,
		paidInterestAmount: null,
		duePenaultInterest: null,
		interestBalance: null,
		currentInterest: null,
		installmentBalance: null,
		totalBalance: null,
		outstandingBalance: null

	};

	constructor(private villageService: VillageService, private zpService: ZPService, private loanPaymentService: LoanPaymentService, private receiptEntryService: ReceiptEntryService) {
		
	}

	ngOnInit() {
		this.loadVillageModel();
		this.loadZPModel();
		this.loadLaonDetailsModel();
		this.loadReceiptEntryModel();
		this.setValuesToAddRecord();
	}
	public loadVillageModel() {
		this.villageService.getAll().subscribe((data: VillageModel[] = []) => {
			this.dropdownList = data;
			//console.log("All Records", this.dropdownList);
		});
	}

	public loadLaonDetailsModel() {
		this.loanPaymentService.getAll().subscribe((data: LoanPaymentModel[] = []) => {
			this.loanDetailsList = data;
			console.log("All Records", this.loanDetailsList);
		});
	}

	public loadReceiptEntryModel() {
		this.receiptEntryService.getAll().subscribe((data: ReceiptEntry[] = []) => {
			this.receiptEntryList = data;
			console.log("All Records", this.receiptEntryList);
		});
	}

	public loadTaluka() {
		this.ledgerNumber = null;
		this.grantDate = null;
		this.orderNumber = null;
		this.loanAmount = null;
		this.dropdownList.forEach(talukaDataList => {
			if (this.dropdownList && (!this.talukaList.includes(talukaDataList.taluka))) {
				this.talukaList.push(talukaDataList.taluka);
				this.talukaList.sort();
				//console.log("taluka",this.talukaList);
			}
		});

	}
	public loadVillages() {
		//console.log("Villages", this.dropdownList);
		this.villageList = [];
		this.dropdownList.forEach(villageDataList => {
			if (this.dropdownList && villageDataList.taluka == this.selectedTaluka && (!this.villageList.includes(villageDataList.villageName))) {
				this.villageList.push(villageDataList.villageName);
				this.villageList.sort();
				//this.model.villageId = datalist.villageId;
				//console.log("village",this.villageList);
			}
		});

	}

	public loadWorkParticulars() {
		this.workList = [];
		this.zpDataList.forEach(zpModel => {
			if (this.zpDataList && zpModel.taluka == this.selectedTaluka && zpModel.villageName == this.selectedVillage && (!this.workList.includes(zpModel.workParticulars))) {
				this.workList.push(zpModel.workParticulars);
				this.workList.sort();
				if (zpModel.workParticulars === this.selectedWorkP) {
					this.model.zpId = zpModel.id;
					this.ledgerNumber = zpModel.ledgerNo;
					this.grantDate = zpModel.sanctionDate;
					this.orderNumber = zpModel.orderNumber;
					this.loanAmount = zpModel.loanAmount;
					this.yerlyInstallment = zpModel.yearlyInstAmount;
					this.totalAmtPaid = zpModel.totalAmountPaid;
					if (zpModel.closingFlag == true) {
						//
					}
					if (zpModel.balance == 0 && zpModel.noOfInstallment != 0) {
						this.lastDueDate = zpModel.lastDueDate;
						this.loanBalance = zpModel.loanBalance;
					}
					this.receiptEntryList.forEach(receiptEntryDataList => {
						if (this.receiptEntryList && (!(receiptEntryDataList.zpId == this.model.zpId))) {
							this.dueFlag = true;
							this.model.installNo++;
							this.model.interestBalance = this.model.currentInterest;
							this.model.installmentBalance = this.yerlyInstallment;
							this.model.totalBalance = this.model.installmentBalance + this.model.interestBalance;
						} else {
							if (receiptEntryDataList.outstandingBalance == 0) {

								// this.model.dueDate = this.model.dueDate.
							}

							console.log("zp id", this.model.zpId);
						}
					});

				}

			}
		});//1st foreach
	}//fun

	public loadZPModel() {
		this.zpService.getAll().subscribe((data: ZpModel[] = []) => {
			this.zpDataList = data;
			//console.log("All Records", this.dropdownList);
		});
	}


	public getSelectedTaluka = (value: any) => this.selectedTaluka = value;
	public getSelectedVillage = (value: any) => this.selectedVillage = value;
	public getSelectedWorkP = (value: any) => this.selectedWorkP = value;

	setValuesToAddRecord(){
		this.dueFlag = false;
		this.duePrevFlag = false;
		this.dueNextFlag = false;
		this.receiptEntryList.forEach(model =>{
			if(model.zpId == this.model.zpId){
				if(this.model.outstandingBalance == 0){
					this.model.dueDate = new Date(model.dueDate.getDate + '365');
					console.log("Due date.." , this.model.dueDate)
					if(this.model.dueDate <= this.lastDueDate &&  this.varLoanBalance > 0){
						this.dueNextFlag = true;
					}else{
						alert("All installments are completed");
					}
					this.incrementInstallmentNo();
					this.model.installmentBalance = this.yerlyInstallment;
					this.model.interestBalance = this.model.currentInterest;
					this.model.totalBalance = this.model.installmentBalance + this.model.interestBalance;
				} else {
					this.model.installmentBalance  = model.paidInstallment;
					this.model.interestBalance = model.totalInterest;
					this.duePrevFlag = true;
					this.model.installNo = model.installNo;
					this.model.dueDate = model.ddDate;
				}
			}else{
				this.dueFlag = true;
				this.incrementInstallmentNo();
				this.model.interestBalance = this.model.currentInterest;
				this.model.installmentBalance = this.yerlyInstallment;
				this.model.totalBalance = this.model.installmentBalance + this.model.interestBalance;
				this.calDueDate();
			}
		});
		this.varInstallBalance = this.model.installmentBalance;
		this.getDDBalance();
	}

	calDueDate() {
		var pDate: Date;
		var days: number = 365;
		this.loanDetailsList.forEach(loanDetailsModel => {
			if (loanDetailsModel.zpId == this.model.zpId) {
				if (loanDetailsModel != null) {
					pDate = loanDetailsModel.grantDate;
					pDate.getDate + '365';
					this.model.dueDate = new Date(pDate.getDate + '365');
				}
			}
		});
	}
	addUpdateReceiptEntryMaster() {
		this.dueFlag = false;
		this.dueNextFlag = false;
		this.duePrevFlag = false;
		this.model.totalInterest = this.model.interestBalance + this.model.duePenaultInterest;
		this.model.totalBalance = this.model.installmentBalance + this.model.interestBalance + this.model.duePenaultInterest;
		this.model.outstandingBalance = this.model.totalBalance;
		if (this.model.ddBalance == 0 && this.model.ddFlag == false) {
			this.model.ddBalance = this.model.ddAmount - (this.model.interestAmount + this.model.receiptAmount);
			if (this.model.ddBalance == 0)
				this.model.ddFlag = false;
			else
				this.model.ddFlag = true;
		} else {
			this.model.ddBalance = this.model.ddBalance - (this.model.interestAmount + this.model.receiptAmount);
			if (this.model.ddBalance == 0)
				this.model.ddFlag = false;
			else
				this.model.ddFlag = true;
		}
		this.updateBalance();
		this.receiptEntryService.create(this.model).subscribe(() => {
			console.log('Receipt Entry Model : ', this.model);
			alert('Record Added Successfully');
			//this.router.navigate(['./enquiry/enq-list',{ 'lastInsert' : this.model.firstName }]);
			//this.loadAllEnquiry();
		},
			error => {
				throw error;
			});

		console.log('form data to add in databse', this.model);

	}
	updateBalance() {
		this.total = this.total + this.model.receiptAmount + this.model.interestAmount;
		this.zpModel.totalAmountPaid = this.total;
		this.zpModel.loanBalance = this.zpModel.loanBalance - this.model.receiptAmount;
		if (this.zpModel.loanBalance == 0 && this.model.totalBalance == 0) {
			if (this.model.ddBalance > 0)
				this.zpModel.closingBalance = this.model.ddBalance;
			else
				this.zpModel.closingBalance = 0;
			this.zpModel.closingFlag = true;
			//closing label visible true
		} else {
			this.zpModel.closingBalance = 0;
		}
		this.zpService.update(this.zpModel);
	}

	incrementInstallmentNo() {
		this.receiptEntryList.forEach(receiptEntryDataList => {
			if (this.receiptEntryList && (receiptEntryDataList.zpId == this.model.zpId)) {
				this.model.installNo++;
			} else {
				this.model.installNo = 1;
			}

		});
		if (this.dueFlag == false) {
			this.model.currentInterest = Math.round(this.zpModel.loanBalance * 0.05);
		} else {
			this.model.currentInterest = 0;
		}
	}

	calTotalBalance() {
		var total = 0;
		this.zpDataList.forEach(zpModel => {
			if (zpModel.id == this.model.zpId) {
				this.total = total + zpModel.totalAmountPaid;
			}
		})
	}

	ddAmountFocusLost() {
		if (this.varLoanBalance != 0 && this.model.ddAmount >= this.loanBalance) {
			this.ddAmtBal = this.model.ddAmount - this.varLoanBalance;
			this.model.receiptAmount = this.loanBalance;
			this.model.interestAmount = 0;
			this.model.interestBalance = 0;
			if (this.ddAmtBal > 0) {
				this.calculateInterestDDBalance();
			}
		} else {
			if (this.varInstallBalance != 0) {
				if (this.model.ddAmount >= this.varInstallBalance) {
					this.model.receiptAmount = this.varInstallBalance;
					this.model.installmentBalance = 0;
					this.model.interestAmount = 0;
					this.ddAmtBal = this.model.ddAmount - this.varInstallBalance;
					if (this.ddAmtBal > 0) {
						this.calculateInterestDDBalance();
					}
				} else {
					this.model.receiptAmount = this.model.ddAmount;
					this.model.interestAmount = 0;
					this.model.installmentBalance = this.varInstallBalance - this.model.ddAmount;
				}

			} else if (this.varInterestBalance != 0) {
				this.model.receiptAmount = 0;
				if (this.model.ddAmount >= this.varInterestBalance) {
					this.ddAmtBal = this.model.ddAmount;
					this.calculateInterestDDBalance();
				} else {
					this.model.interestAmount = this.model.ddAmount;
					this.model.interestBalance = this.varInterestBalance - this.model.ddAmount;
				}
			} else if (this.varPenalty != 0) {
				this.model.receiptAmount = 0;
				if (this.model.ddAmount >= this.varPenalty) {
					this.model.interestAmount = this.varPenalty;
					this.ddAmtBal = this.model.ddAmount - this.varPenalty;
					this.model.duePenaultInterest = 0;
					this.model.ddBalance = this.ddAmtBal;
				} else {
					this.model.duePenaultInterest = this.varPenalty - this.model.ddAmount;
					this.model.interestAmount = this.model.ddAmount;
				}
			}
		}
		this.model.totalBalance = this.model.installmentBalance + this.model.interestBalance + this.model.duePenaultInterest;
	}

	interestAmountFocusLost() {
		var totInterest = 0;
		if (this.varInterestBalance != 0) {
			if (this.model.interestAmount > this.varInterestBalance && this.model.duePenaultInterest != 0) {
				totInterest = Math.round(this.model.interestAmount - this.varInterestBalance);
				this.model.interestBalance = 0;
				if (totInterest <= this.model.duePenaultInterest) {
					this.model.duePenaultInterest = Math.round(this.varPenalty - totInterest);
				} else {
					this.model.duePenaultInterest = 0;
				}
			} else {
				this.model.interestBalance = this.varInterestBalance - this.model.interestAmount;
			}
			this.model.totalBalance = this.model.installmentBalance + this.model.interestBalance + this.model.duePenaultInterest;
		}
	}

	receiptAmountFocusLost() {
		if (this.varInstallBalance != 0) {
			this.model.installmentBalance = this.varInstallBalance - this.model.receiptAmount;
			this.loanBalance = this.varLoanBalance - this.model.receiptAmount;
			this.model.totalBalance = this.model.installmentBalance + this.model.interestBalance + this.model.duePenaultInterest;
		}
	}

	receiptDateFocusLost() {
		var dd, tin, yd: number;
		this.pdFlag = false;
		// ----- check if current receipt date is less than prev receipt date---remaining
		if (this.model.receiptDate < this.prevReceiptDate) {
			alert("This Receipt date is less than previous receipt date. You can not add record.");
		} else {
			if (this.dueFlag) {
				this.calculateInterest();
				this.model.currentInterest = this.varInstallInerest;
			}
			if (this.dueFlag || this.dueNextFlag) {
				if (this.model.receiptDate > this.model.dueDate) {
					yd = this.model.dueDate.getMonth() - this.model.receiptDate.getMonth()
						+ (12 * (this.model.dueDate.getFullYear() - this.model.receiptDate.getFullYear()));
					if (yd = 0) {
						this.model.interestBalance = this.model.currentInterest;
						this.model.duePenaultInterest = 0;
					} else {
						this.model.interestBalance = Math.round(this.model.currentInterest + (this.model.currentInterest / 12) * yd);
						this.model.duePenaultInterest = Math.round((this.model.installmentBalance + (this.model.interestBalance) * 0.02) / 12) * yd;
					}
				} else {
					this.model.duePenaultInterest = 0;
					this.model.interestBalance = this.model.currentInterest;
				}
				this.varInterestBalance = this.model.interestBalance;
				this.varPenalty = this.model.duePenaultInterest;
				this.model.totalBalance = this.model.installmentBalance + this.model.interestBalance + this.model.duePenaultInterest;
			} else {
				if (this.duePrevFlag) {
					this.varInterestBalance = this.model.interestBalance;
					this.model.currentInterest = Math.round(this.model.installmentBalance * 0.05);
					if (this.model.receiptDate > this.model.dueDate) {
						if (this.prevReceiptDate > this.model.dueDate) {
							yd = this.prevReceiptDate.getMonth() - this.model.receiptDate.getMonth()
								+ (12 * (this.prevReceiptDate.getFullYear() - this.model.receiptDate.getFullYear()));
						} else {
							yd = this.model.dueDate.getMonth() - this.model.receiptDate.getMonth()
								+ (12 * (this.model.dueDate.getFullYear() - this.model.receiptDate.getFullYear()));
						}
						if (yd == 0) {
							this.model.duePenaultInterest = 0;
						} else {
							this.model.interestBalance = Math.round(this.model.interestBalance + (this.model.currentInterest / 12) * yd);
							this.model.duePenaultInterest = Math.round((this.model.installmentBalance + (this.model.interestBalance) * 0.02) / 12) * yd;
						}
					} else {
						this.model.duePenaultInterest = 0;
					}
					this.varInterestBalance = this.model.interestBalance;
					this.varPenalty = this.model.duePenaultInterest;
					this.model.totalBalance = this.model.installmentBalance + this.model.interestBalance + this.model.duePenaultInterest;
				}
			}
			this.displayDDBalance();
			this.model.totalBalance = this.model.installmentBalance + this.model.interestBalance + this.model.duePenaultInterest;
		}
	}
	getDDBalance() {
		this.receiptEntryList.forEach(model =>{
			if(model.zpId == this.model.zpId){
				this.prevReceiptDate  = this.model.receiptDate;
				
			}
		});
	}

	calculateInterest() {
		var dd1, dd2, tin1, tin2, sum;
		if (this.install1Amount != null) {
			dd1 = this.model.dueDate.getMonth() - this.install1Date.getMonth()
				+ (12 * (this.model.dueDate.getFullYear() - this.install1Date.getFullYear()));
			tin1 = Math.round(((this.install1Amount) * 0.05) / 12);
			sum = dd1 * tin1;
		}
		if (this.install2Amount != null) {
			dd2 = this.model.dueDate.getMonth() - this.install2Date.getMonth()
				+ (12 * (this.model.dueDate.getFullYear() - this.install2Date.getFullYear()));
			tin2 = Math.round(((this.install2Amount) * 0.05) / 12);
			sum = sum + (dd2 * tin2);
		}
		if (this.install3Amount != null) {
			dd2 = this.model.dueDate.getMonth() - this.install3Date.getMonth()
				+ (12 * (this.model.dueDate.getFullYear() - this.install3Date.getFullYear()));
			tin2 = Math.round(((this.install3Amount) * 0.05) / 12);
			sum = sum + (dd2 * tin2);
		}
		this.varInstallInerest = sum;
	}

	calculateInterestDDBalance() {
		if (this.varInterestBalance != 0) {
			if (this.ddAmtBal >= this.varInterestBalance) {
				this.ddAmtBal = this.ddAmtBal - this.varInterestBalance;
				this.model.interestBalance = 0;
				if (this.varPenalty != 0) {
					if (this.ddAmtBal >= this.varPenalty) {
						this.ddAmtBal = this.ddAmtBal - this.varPenalty;
						this.model.duePenaultInterest = 0;
						this.model.interestAmount = this.varInterestBalance + this.varPenalty;
						this.model.ddBalance = this.ddAmtBal;
					} else {
						this.model.duePenaultInterest = this.varPenalty - this.ddAmtBal;
						this.model.interestAmount = this.varInterestBalance + this.ddAmtBal;
					}

				} else {
					this.model.interestAmount = this.varInterestBalance;
				}
			} else {
				this.model.interestBalance = this.varInterestBalance - this.ddAmtBal;
				this.model.interestAmount = this.ddAmtBal;
			}
		} else {
			if (this.varPenalty != 0) {
				if (this.ddAmtBal >= this.varPenalty) {
					this.ddAmtBal = this.ddAmtBal - this.varPenalty;
					this.model.duePenaultInterest = 0;
					this.model.interestAmount = this.varPenalty;
					this.model.ddBalance = this.ddAmtBal;
				} else {
					this.model.duePenaultInterest = this.varPenalty - this.ddAmtBal;
					this.model.interestAmount = this.ddAmtBal;
				}
			}

		}
	}

	displayDDBalance() {
		if (this.model.ddFlag == true) {
			if (this.dBalance != 0) {
				if (this.varInstallBalance != 0) {
					if (this.dBalance >= this.varInstallBalance) {
						this.model.receiptAmount = this.varInstallBalance;
						this.model.installmentBalance = 0;
						this.ddAmtBal = this.dBalance - this.varInstallBalance;
						if (this.ddAmtBal > 0) {
							this.calculateInterestDDBalance();
						}
					} else {
						this.model.receiptAmount = this.dBalance;
						this.model.interestAmount = 0;
						this.model.installmentBalance = this.varInstallBalance - this.dBalance;
					}
				} else {
					if (this.varInterestBalance != 0) {
						if (this.dBalance >= this.varInterestBalance) {
							this.model.receiptAmount = 0;
							this.model.interestAmount = this.varInterestBalance;
							this.model.interestBalance = 0;
							this.ddAmtBal = this.dBalance - this.varInterestBalance;
							if (this.ddAmtBal > 0) {
								this.calculateInterestDDBalance();
							}
						} else {
							this.model.receiptAmount = 0;
							this.model.interestAmount = this.dBalance;
							this.model.interestBalance = this.varInterestBalance - this.dBalance;
						}
					} else {
						if (this.varPenalty != 0) {
							if (this.dBalance >= this.varPenalty) {
								this.model.receiptAmount = 0;
								this.model.interestAmount = this.varPenalty;
								this.ddAmtBal = this.dBalance - this.varPenalty;
								this.model.duePenaultInterest = 0;
								this.model.ddBalance = this.ddAmtBal;
							} else {
								this.model.duePenaultInterest = this.varPenalty - this.dBalance;
								this.model.receiptAmount = 0;
								this.model.interestAmount = this.dBalance;
							}
						}
					}
				}
			}
		}
	}

	updateZPBalance() {
		var loanBal, totalAmount;
		this.zpDataList.forEach(zpModel => {
			if (zpModel.id == this.model.zpId) {
				loanBal = this.amountRcvd + zpModel.loanBalance;
				totalAmount = zpModel.totalAmountPaid + (this.amountRcvd - this.interestAmt);
				this.zpModel.loanBalance = loanBal;
				this.zpModel.totalAmountPaid = totalAmount;
			}
			if (this.zpModel.closingFlag == true && loanBal > 0)
				this.zpModel.closingFlag = false;
		});
		this.zpService.update(this.zpModel);
	}

}
