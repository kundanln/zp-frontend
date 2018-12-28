import { Component, OnInit } from '@angular/core';
import { VillageModel } from '../../_models/village.model';
import { ZpModel } from '../../_models/zp.model';
import { LoanPaymentService } from '../../_services/loan-payment.service';
import { VillageService } from '../../_services/village.service';
import { ZPService } from '../../_services/zp.service';
import { ReceiptEntryService } from '../../_services/receipt-entry.service';
import { ReceiptEntry } from '../../_models/receipt-entry.model';
import { LoanPaymentModel } from '../../_models/loan-payment.model';
import { DatePipe } from '@angular/common';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker/public_api';
import { parseDate, formatDate } from 'ngx-bootstrap/chronos/public_api';
import { Router } from '@angular/router';

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
	rcptEntryEZPIdList: ReceiptEntry[] = [];
	zpModel: ZpModel;
	installmentList: any[] = [];
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
	zpmBalance: number;
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

	datePickerConfigWithMin: Partial<BsDatepickerConfig>;
	datePickerConfigWithoutMin: Partial<BsDatepickerConfig>;
	constructor(private router: Router, private villageService: VillageService, private zpService: ZPService, public datepipe: DatePipe, private loanPaymentService: LoanPaymentService, private receiptEntryService: ReceiptEntryService) {

		this.datePickerConfigWithMin = Object.assign({},

            {
                // containerClass : 'theme-dark-blue',
                showWeekNumbers: false,
                dateInputFormat: 'YYYY-MM-DD',
                minDate: new Date()
            }
        )

        this.datePickerConfigWithoutMin = Object.assign({},

            {
                //containerClass : 'theme-dark-blue',
                showWeekNumbers: false,
                dateInputFormat: 'YYYY-MM-DD',
                minDate: new Date()
            }
        )

	}


	ngOnInit() {
		this.loadVillageModel();
		this.loadZPModel();
		this.loadLaonDetailsModel();
		this.loadReceiptEntryModel();
		//this.setValuesToAddRecord();
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
			//console.log("All Records", this.loanDetailsList);
		});
	}

	public loadReceiptEntryModel() {
		this.receiptEntryService.getAll().subscribe((data: ReceiptEntry[] = []) => {
			this.receiptEntryList = data;
			//console.log("receipt Entry List", this.receiptEntryList);
		});
	}

	public loadTaluka() {
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
			}
		});//1st foreach
		if (this.workList.length == 0) {
            alert("Loan is not given to this village");
            this.clearFeilds();
        }
	}

	public setValuesOnWPFocusLost() {
		this.zpDataList.forEach(zpModel => {
			if (this.zpDataList && zpModel.taluka == this.selectedTaluka && zpModel.villageName == this.selectedVillage) {
				if (zpModel.workParticulars === this.selectedWorkP) {
					this.model.zpId = zpModel.id;
					this.ledgerNumber = zpModel.ledgerNo;
					this.grantDate = zpModel.sanctionDate;
					this.orderNumber = zpModel.orderNumber;
					this.loanAmount = zpModel.loanAmount;
					this.yerlyInstallment = zpModel.yearlyInstAmount;
					this.total = zpModel.receivedAmount;//totalAmtPaid
					this.zpmBalance = zpModel.balance;
					if (zpModel.closingFlag == true) {
						alert("Loan fully recovered hence account may be closed.");
					}
					if (zpModel.balance == 0 && zpModel.noOfInstallment != 0) {
						this.lastDueDate = zpModel.lastDueDate;
						this.loanBalance = zpModel.loanBalance;
						this.varLoanBalance = zpModel.loanBalance;
					}
					this.setValuesToAddRecord();
					this.loanPaymentService.getInstallmentdetails(this.model.zpId).subscribe((dataList: LoanPaymentModel[] = []) => {
						this.installmentList = dataList;
						this.installmentList.forEach(data => {
							if (data.installmentNumber == 1) {
								this.install1Amount = data.installmentAmount;
								this.install1Date = data.installmentDate;
							} else if (data.installmentNumber == 2) {
								this.install2Amount = data.installmentAmount;
								this.install2Date = data.installmentDate;
							} else if (data.installmentNumber == 3) {
								this.install3Amount = data.installmentAmount;
								this.install3Date = data.installmentDate;
							}
						});
					},
						error => {
							throw error;
						});

				}

			}
		});//1st foreach
		//this.calTotalBalance();	 
	}

	public loadZPModel() {
		this.zpService.getAll().subscribe((data: ZpModel[] = []) => {
			this.zpDataList = data;
			//console.log("All Records", this.dropdownList);
		});
	}


	public getSelectedTaluka = (value: any) => this.selectedTaluka = value;
	public getSelectedVillage = (value: any) => this.selectedVillage = value;
	public getSelectedWorkP = (value: any) => {
		this.selectedWorkP = value;
		this.setValuesOnWPFocusLost();
	}

	setValuesToAddRecord() {
		this.dueFlag = false;
		this.duePrevFlag = false;
		this.dueNextFlag = false;
		var dueDate, lastDueDate;
		this.receiptEntryList.forEach(model => {
			if (model.zpId == this.model.zpId) {
				this.rcptEntryEZPIdList.push(model);
			}
		});
		this.rcptEntryEZPIdList.forEach((model, index, array) => {
			if (index === (array.length - 1)) {
				this.prevReceiptDate = model.receiptDate;
				this.model.totalBalance = model.outstandingBalance;
				if (this.rcptEntryEZPIdList.length != 0) {
					if (model.outstandingBalance == 0) {
						dueDate = new Date(model.dueDate);
						this.model.dueDate = new Date(dueDate.getFullYear() + 1, dueDate.getMonth(), dueDate.getDate());
						lastDueDate = new Date(this.lastDueDate);
						if (this.model.dueDate <= lastDueDate && this.varLoanBalance > 0) {
							this.dueNextFlag = true;
						} else {
							alert("All installments are completed");
						}
						this.incrementInstallmentNo();
						this.model.installmentBalance = this.yerlyInstallment;
						this.model.interestBalance = this.model.currentInterest;
						this.model.totalBalance = this.model.installmentBalance + this.model.interestBalance;
						console.log("Total Balance : ", this.model.totalBalance);
					} else {
						this.model.installmentBalance = model.paidInstallment;
						this.model.interestBalance = model.totalInterest;
						this.duePrevFlag = true;
						this.model.installNo = model.installNo;
						this.model.dueDate = model.dueDate;
					}
				} else {
					this.dueFlag = true;
					this.incrementInstallmentNo();
					this.model.interestBalance = this.model.currentInterest;
					this.model.installmentBalance = this.yerlyInstallment;
					this.model.totalBalance = this.model.installmentBalance + this.model.interestBalance;
					this.calDueDate();
				}
			}
		});

		this.varInstallBalance = this.model.installmentBalance;
		//this.getDDBalance();
	}

	calDueDate() {
		var year, month, day;
		var pDate;
		this.loanDetailsList.forEach(loanDetailsModel => {
			if (loanDetailsModel.zpId == this.model.zpId) {
				if (loanDetailsModel != null) {
					pDate = new Date(loanDetailsModel.installmentDate);
					year = pDate.getFullYear();
					month = pDate.getMonth();
					day = pDate.getDate();
					this.model.dueDate = new Date(year, month, day + 365);
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
			alert("Loan fully recovered hence account may be closed.");
		} else {
			this.zpModel.closingBalance = 0;
		}
		this.zpService.update(this.zpModel);
	}

	incrementInstallmentNo() {
		this.model.installNo = 1;
		this.receiptEntryList.forEach(receiptEntryDataList => {
			if (receiptEntryDataList.zpId == this.model.zpId) {
				this.model.installNo = receiptEntryDataList.installNo;
			}
		});
		if (this.receiptEntryList) {
			this.model.installNo++;
		} else {
			this.model.installNo = 1;
		}
		if (this.dueFlag == false) {
			this.model.currentInterest = Math.round(this.loanBalance * 0.05);
		} else {
			this.model.currentInterest = 0;
		}
	}

	calTotalBalance() {
		var total = 0;
		this.zpDataList.forEach(zpModel => {
			if (zpModel.id == this.model.zpId) {
				this.total = total + zpModel.receivedAmount;//zpModel.totalAmountPaid
			}
		});
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
		var yd: number;
		this.pdFlag = false;
		var prevReceiptDate, dueDate;
		// ----- check if current receipt date is less than prev receipt date---remaining
		prevReceiptDate = new Date(this.prevReceiptDate.toLocaleString() + 'T12:00:00-06:00');
		dueDate = new Date(this.model.dueDate.toLocaleString() + 'T12:00:00-06:00');
		if (this.model.receiptDate < prevReceiptDate && this.model.receiptDate != null) {
			alert("This Receipt date is less than previous receipt date. You can not add record.");
		} else {
			if (this.dueFlag) {
				this.calculateInterest();
				this.model.currentInterest = this.varInstallInerest;
			}
			if (this.dueFlag || this.dueNextFlag) {
				if (this.model.receiptDate > dueDate) {
					/*'if amount is received after due date then calculate penal on ((inst. amt+intere.amt) * 0.02) before updating both bal
						also calculate difference between receipt date and due date in months
						and calculate ((inst. amt+intere.amt) * 0.02)*month_differnce*/
					//calculate difference between receipt date and due date in months
					yd = this.model.receiptDate.getMonth() - dueDate.getMonth()
						+ (12 * (this.model.receiptDate.getFullYear() - dueDate.getFullYear()));
					if (yd == 0) {
						//if amount_rece in same m then show value of txtcint in txtinterest_bal only. no penelty
						this.model.interestBalance = this.model.currentInterest;
						//if amount is received on the same year as the year of due date then do not take year diff in calculation
						this.model.duePenaultInterest = 0;
					} else {
						//confirm the 5% cal of interest * month if amt recv after one month then prev 5% + ((txtcint)/12)i.e. 5% + one month interest
						this.model.interestBalance = Math.round((this.model.currentInterest + ((this.model.currentInterest / 12) * yd)));
						this.model.duePenaultInterest = Math.round((((this.model.installmentBalance + (this.model.interestBalance)) * 0.02) / 12) * yd);
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
					if (this.model.receiptDate > dueDate) {
						/*if amount is received after due date then calculate penal on ((inst. amt+intere.amt) * 0.02) before updating both bal
							also calculate difference between Current receipt date and Previous receipt date in years
							and calculate ((inst. amt+intere.amt) * 0.02)*year_differnce */
						if (prevReceiptDate > dueDate) {
							yd = this.model.receiptDate.getMonth() - prevReceiptDate.getMonth()
								+ (12 * (this.model.receiptDate.getFullYear() - prevReceiptDate.getFullYear()));
						} else {
							yd = this.model.receiptDate.getMonth() - dueDate.getMonth()
								+ (12 * (this.model.receiptDate.getFullYear() - dueDate.getFullYear()));
						}
						if (yd == 0) {
							/*if amount_rece in same m then show value of txtcint in txtinterest_bal only. no penel
									if amount is received on the same year as the year of due date then do not take year diff in calculation */
							this.model.duePenaultInterest = 0;
						} else {
							/*confirm the 5% cal of interest * month
								if amt rece after one month then prev 5% + ((txtcint)/12)i.e. 5% + one month interest
									new 29May04- take 5% interest on inst bal **confirm this calculation 5%on instbal+interestbal */
							this.model.interestBalance = Math.round((this.varInterestBalance + ((this.model.currentInterest / 12) * yd)));
							this.model.duePenaultInterest = Math.round((((this.model.installmentBalance + (this.model.interestBalance)) * 0.02) / 12) * yd);
						}
					} else {
						//if amt received within due date not necessary to cal intr so it is zero
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
		this.rcptEntryEZPIdList.forEach(model => {
			this.prevReceiptDate = model.receiptDate;
		});
	}

	calculateInterest() {
		var dd1, dd2, tin1, tin2, sum, dueDate, install1Date, install2Date, install3Date;
		dueDate = new Date(this.model.dueDate.toLocaleString() + 'T12:00:00-06:00');
		install1Date = new Date(this.install1Date.toLocaleString() + 'T12:00:00-06:00');
		install2Date = new Date(this.install2Date.toLocaleString() + 'T12:00:00-06:00');
		install3Date = new Date(this.install3Date.toLocaleString() + 'T12:00:00-06:00');
		if (this.install1Amount != null) {
			//take date difference between inst1_date and first due_date in days
			dd1 = dueDate.getMonth() - install1Date.getMonth()
				+ (12 * (dueDate.getFullYear() - install1Date.getFullYear()));
			tin1 = Math.round(((this.install1Amount) * 0.05) / 12);
			sum = dd1 * tin1;
		}
		if (this.install2Amount != null) {
			dd2 = dueDate.getMonth() - install2Date.getMonth()
				+ (12 * (dueDate.getFullYear() - install2Date.getFullYear()));
			tin2 = Math.round(((this.install2Amount) * 0.05) / 12);
			sum = sum + (dd2 * tin2);
		}
		if (this.install3Amount != null) {
			dd2 = dueDate.getMonth() - install3Date.getMonth()
				+ (12 * (dueDate.getFullYear() - install3Date.getFullYear()));
			tin2 = Math.round(((this.install3Amount) * 0.05) / 12);
			sum = sum + (dd2 * tin2);
		}
		this.varInstallInerest = sum;
	}

	calculateInterestDDBalance() {
		//for calculating balance of dd after receiving interest amt
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

	clearFeilds() {
        this.orderNumber = 0;
        this.ledgerNumber = 0;
        this.grantDate = null;
        this.loanAmount = 0;
		//this.model.installNo = 0;
		this.loanAmount = 0;
		this.yerlyInstallment = 0;
		this.loanBalance = 0;
		this.total = 0;
		this.lastDueDate = null;
		this.install1Amount = 0;
		this.install1Date = null;
		this.install2Amount = 0;
		this.install2Date = null;
		this.install3Amount = 0;
		this.install3Date = null;
		this.selectedVillage = '';
    	this.selectedWorkP  = '';
    }

	cancel() {

		//if (this.button == 'दुरुस्ती करा') {
		this.router.navigate(['./receipt-entry-add']);
		//} else {
		//console.log("cancel click");

		//}
	}

}
