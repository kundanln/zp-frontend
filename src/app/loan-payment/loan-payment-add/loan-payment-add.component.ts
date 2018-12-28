import { Component, OnInit } from '@angular/core';
import { LoanPaymentModel } from '../../_models/loan-payment.model';
import { ZpModel } from '../../_models/zp.model';
import { ZPService } from '../../_services/zp.service';
import { VillageModel } from '../../_models/village.model';
import { VillageService } from '../../_services/village.service';
import { LoanPaymentService } from '../../_services/loan-payment.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker/ngx-bootstrap-datepicker';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'app-loan-payment-add',
    templateUrl: './loan-payment-add.component.html',
    styleUrls: ['./loan-payment-add.component.css']
})
export class LoanPaymentAddComponent implements OnInit {
    dropdownList: VillageModel[] = [];
    public talukaList: Array<string> = [];
    public villageList: Array<string> = [];
    public workList: Array<string> = [];
    public installNoList: Array<number> = [];
    loanPaymentDatalist: LoanPaymentModel[];
    loanPaymentModel: LoanPaymentModel;
    zpDataList: ZpModel[];
    zpModel: ZpModel;
    selectedTaluka: string;
    selectedVillage: string;
    selectedWorkP: string;
    grantDate: string;
    orderNumber: number;
    ledgerNumber: number;
    loanAmount: number;
    button = "Add";
    updateId: number;
    daysDiff: number;
    tinterest: number;
    interestSum: number;
    totalInstallAmount: number;
    public selectControl = new FormControl();
    model: LoanPaymentModel = {
        zpId: null,
        installmentNumber: null,
        installmentDate: null,
        receiptNo: null,
        chequeNo: null,
        bankName: null,
        issueDate: null,
        installmentAmount: null,
        amount: null
    };

    datePickerConfigWithMin: Partial<BsDatepickerConfig>;
    datePickerConfigWithoutMin: Partial<BsDatepickerConfig>;

    constructor(private router: Router, private route: ActivatedRoute,  public datepipe: DatePipe, private villageService: VillageService, private zpService: ZPService, private loanPaymentService: LoanPaymentService) {
        this.selectControl.valueChanges.subscribe(value => console.log(value));
        if (this.route.snapshot.queryParamMap.has('updateId')) {
            this.updateId = +this.route.snapshot.queryParamMap.get('updateId');
            this.getRecordByID(this.updateId);

        }


        this.datePickerConfigWithMin = Object.assign({},

            {
                // containerClass : 'theme-dark-blue',
                showWeekNumbers: false,
                dateInputFormat: 'YYYY/MM/DD',
                minDate: new Date()
            }
        )

        this.datePickerConfigWithoutMin = Object.assign({},

            {
                //containerClass : 'theme-dark-blue',
                showWeekNumbers: false,
                dateInputFormat: 'YYYY/MM/DD',
                minDate: new Date()
            }
        )
    }

    ngOnInit() {
        this.loadVillageModel();
        this.loadZPModel();
        this.loadLoanPaymentModel();

    }
    public loadVillageModel() {
        this.villageService.getAll().subscribe((data: VillageModel[] = []) => {
            this.dropdownList = data;
            //console.log("All Records", this.dropdownList);
        });
    }

    public loadZPModel() {
        this.zpService.getAll().subscribe((data: ZpModel[] = []) => {
            this.zpDataList = data;
            //console.log("All Records", this.dropdownList);
        });
    }

    public loadLoanPaymentModel() {
        this.loanPaymentService.getAll().subscribe((data: LoanPaymentModel[] = []) => {
            this.loanPaymentDatalist = data;
            //console.log("loanPaymentDatalist", this.loanPaymentDatalist);
        },
            error => {
                throw error;
            });
    }

    public loadTaluka() {
        this.clearFeilds();
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
        });
        if (this.workList.length == 0) {
            alert("Loan is not given to this village");
            this.clearFeilds();
        }
    }

    setValuesOnWPFocusLost() {
        this.zpDataList.forEach(zpModel => {
            if (this.zpDataList && zpModel.taluka == this.selectedTaluka && zpModel.villageName == this.selectedVillage) {
                if (zpModel.workParticulars === this.selectedWorkP && this.selectedWorkP != null) {
                    if (zpModel.lastDueDate == null) {
                        this.model.zpId = zpModel.id;
                        this.ledgerNumber = zpModel.ledgerNo;
                        this.grantDate = zpModel.sanctionDate;
                        this.orderNumber = zpModel.orderNumber;
                        this.loanAmount = zpModel.loanAmount;
                        this.zpModel = zpModel;
                        this.loadInstallNumber();
                        //console.log("zp id", this.model.zpId);
                    } else {
                        alert("All installments are issued.You cannot add record.")
                        this.clearFeilds();
                    }
                }
            }
        });

    }


    public loadZPRecordsById(id: number) {
        this.zpService.getAll().subscribe((data: ZpModel[] = []) => {
            this.zpDataList = data;
                this.zpDataList.forEach(dataModel => {
                    if (dataModel.id == id) {
                        this.selectedTaluka = dataModel.taluka;
                        this.selectedVillage = dataModel.villageName
                        this.selectedWorkP = dataModel.workParticulars
                        this.orderNumber = dataModel.orderNumber;
                        this.ledgerNumber = dataModel.ledgerNo;
                        this.grantDate = dataModel.sanctionDate;
                        this.loanAmount = dataModel.loanAmount;
                    }
                });
            });
    }



    getRecordByID(id: number) {
        this.loanPaymentService.getAll().subscribe((data: LoanPaymentModel[] = []) => {
            this.loanPaymentDatalist = data;
            this.loanPaymentDatalist.forEach(loanPaymentModel => {
                if (loanPaymentModel.id == id) {

                    this.button = 'Update';
                    this.model = loanPaymentModel;
                    //console.log(this.model);
                }
            });
            this.loadZPRecordsById(this.model.zpId);
        },
            error => {
                throw error;
            });
        
    }

    public getSelectedTaluka = (value: any) => this.selectedTaluka = value;
    public getSelectedVillage = (value: any) => this.selectedVillage = value;
    public getSelectedWorkP = (value: any) => {
        this.selectedWorkP = value;
        this.setValuesOnWPFocusLost();
    }

    addUpdateLoanPaymentMaster() {

        if (this.button == 'Add') {
            this.loanPaymentService.create(this.model).subscribe(() => {

                alert('Record Added Successfully');
                this.router.navigate(['./loan-payment-list', { 'lastInsert': this.model.id }]);

            },
                error => {
                    alert("Loan Payment Record not Added");
                    throw error;
                });
            //console.log('form data to add in databse', this.model);

        } else if (this.button == 'Update') {
            this.loanPaymentService.update(this.model).subscribe(() => {

                alert('Record updated Successfully');
                this.button = 'Update';
                this.router.navigate(['./loan-payment-list', { 'lastUpdate': this.model.id }]);
                //console.log('form data to update in database', this.model);
            },
                error => {
                    alert("Loan Payment Record not Updated");
                    throw error;
                });
        }
        this.calBalance();
    }

    public loadInstallNumber() {
        
        if (this.button == "Add") {
            this.model.installmentNumber = 1;
            this.loanPaymentDatalist.forEach(lpModel => {
                if (lpModel.zpId == this.model.zpId) {
                    if (lpModel.amount != 0) {
                        this.model.installmentNumber = lpModel.installmentNumber + 1;
                    }
                } else {
                    this.model.installmentNumber = 1;
                }
            });
        } // else if (this.button == "Update") {
        //     this.loanPaymentDatalist.forEach(model => {
        //         if (this.zpModel.villageName == this.selectedVillage && this.zpModel.workParticulars == this.selectedWorkP && this.model.zpId == this.zpModel.id) {
        //             this.installNoList.push(model.installmentNumber);
        //         }
        //     });
        // }
    }


    //calculate noOfInstallment, lastDueDate and balance and update in ZPMaster db.
    public calBalance() {
        this.zpDataList.forEach(model => {
            if (model.id == this.model.zpId) {
                if (model.noOfInstallment == 0) {
                    model.noOfInstallment = this.model.installmentNumber;
                } else {
                    model.noOfInstallment = this.model.installmentNumber + 1;
                }
                model.balance = this.model.amount;
                var year,month,day;
                if (this.model.amount == 0) {
                    //this.model.installmentDate = new Date(this.datepipe.transform(this.model.installmentDate, 'yyyy-MM-dd'));
                    //installGetdate = new Date(this.model.installmentDate);
                    year = this.model.installmentDate.getFullYear();
                    month = this.model.installmentDate.getMonth();
                    day = this.model.installmentDate.getDate();
                    model.lastDueDate = new Date(year + 10, month, day);
                }
            }
            this.zpModel = model;
        });
        this.zpService.update(this.zpModel).subscribe(() => {
            //console.log('form data to update in database', this.zpModel);
        },
            error => {
                throw error;
            });
    }

    public installAmtLostFocus() {
        if (this.button == "Add") {
            if (this.model.installmentAmount != null) {
                if (this.model.installmentNumber == 1) {
                    this.model.amount = this.loanAmount - this.model.installmentAmount;
                } else {
                    this.loanPaymentDatalist.forEach(model => {
                        if (this.model.zpId == model.zpId) {
                            this.model.amount = this.zpModel.balance - this.model.installmentAmount;
                        }
                    });
                }
            }
            if (this.model.amount < 0) {
                this.model.amount = 0;
            }
        }
    }

    // calculateInterest() {
    //     var dataList;

    //     this.loanPaymentService.getRecordaForCalculateInterest(this.model.zpId).subscribe((data: any) => {
    //         dataList = data;
    //         dataList.forEach(element => {
    //             //calculate difference from two dates in days.
    //             var diff = Math.abs(element.grantDate.getTime() - this.model.grantDate.getTime());
    //             this.daysDiff = Math.ceil(diff / (1000 * 3600 * 24));
    //             //calculate interest.
    //             this.tinterest = (element.amount * 0.05) / 365;
    //             this.interestSum += (this.daysDiff * this.tinterest);
    //         });
    //     });
    // }

    clearFeilds() {
        this.orderNumber = 0;
        this.ledgerNumber = 0;
        this.grantDate = null;
        this.loanAmount = 0;
        this.model.installmentNumber = 0;
    }

    cancel() {

        if (this.button == 'दुरुस्ती करा') {
            this.router.navigate(['./loan-payment-add']);
        } else {
            console.log("cancel click");

        }
    }
}
