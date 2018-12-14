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
    public installNoList : Array<number> = [];
    loanPaymentDatalist: LoanPaymentModel[];
    loanPaymentModel: LoanPaymentModel;
    zpDataList: ZpModel[];
    zpModel: ZpModel;
    selectedTaluka : string;
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
        grantDate: null,
        receiptNo: null,
        chequeNo: null,
        bankName: null,
        issueDate: null,
        installmentAmount: null,
        amount: null
    };

    datePickerConfigWithMin : Partial<BsDatepickerConfig>;
    datePickerConfigWithoutMin : Partial<BsDatepickerConfig>;
    
    constructor(private router: Router, private route: ActivatedRoute, private villageService: VillageService, private zpService: ZPService , private loanPaymentService : LoanPaymentService) {
        this.selectControl.valueChanges.subscribe(value => console.log(value));
        if(this.route.snapshot.queryParamMap.has('updateId'))
        {   
            this.updateId =+this.route.snapshot.queryParamMap.get('updateId');
            this.getRecordByID(this.updateId);
        
        }  


        this.datePickerConfigWithMin = Object.assign({ },
        
            { 
               // containerClass : 'theme-dark-blue',
                showWeekNumbers : false,
                dateInputFormat : 'YYYY/MM/DD',
                minDate : new Date()
            }
        )
        
        this.datePickerConfigWithoutMin = Object.assign({ },
        
            { 
                //containerClass : 'theme-dark-blue',
                showWeekNumbers : false,
                dateInputFormat : 'YYYY/MM/DD',
                minDate : new Date()
            }
        )
     }

    ngOnInit() {
        this.loadVillageModel();
        this.loadZPModel();

    }
    public loadVillageModel() {
        this.villageService.getAll().subscribe((data: VillageModel[] = []) => {
            this.dropdownList = data;
            console.log("All Records", this.dropdownList);
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
                    this.zpModel = zpModel;
                    console.log("zp id", this.model.zpId);
                }
            }
        });

    } 
    public loadinstallNumber() {
        this.loanPaymentDatalist.forEach(model => {
        if(this.zpModel.villageName == this.selectedVillage && this.zpModel.workParticulars == this.selectedWorkP && this.model.zpId == this.zpModel.id){
            this.installNoList.push(model.installmentNumber);
        }
    });
    }
    public workPFocusLost() {
        if (this.button == "Add") {
            this.checkInstallNumber();
        } else {
            this.loadinstallNumber();
        }
    }

    public loadZPRecordsById(id: number) {
        //  console.log("kundan");
        //  this.zpDataList.forEach(zpmodel =>{
        //     if(zpmodel.id == id){
        //         this.orderNumber = zpmodel.orderNumber;
        //         this.ledgerNumber = zpmodel.ledgerNo;
        //         this.grantDate = zpmodel.sanctionDate;
        //         this.loanAmount = zpmodel.loanAmount;
        //         console.log("Updated:",this.orderNumber);
        //     }
        //   });
        this.zpService.getAll().subscribe((data: ZpModel[] = []) => {

            this.zpDataList = data;

            this.zpDataList.forEach(dataModel => {
                //console.log("All of record",dataModel.taluka);
                if (dataModel.id == id) {
                    console.log("All of record", dataModel.taluka);
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
        // this.talukaList = [];
        this.loanPaymentService.getAll().subscribe((data: LoanPaymentModel[] = []) => {
            this.loanPaymentDatalist = data;
            console.log("loanPaymentDatalist", this.loanPaymentDatalist);
            this.loanPaymentDatalist.forEach(loanPaymentModel => {

                if (loanPaymentModel.zpId == id) {

                    this.button = 'Update';
                    this.model = loanPaymentModel;
                    console.log(this.model);
                }
            });
            this.loadZPRecordsById(id);

        },
            error => {
                throw error;
            });

    }

    public loadZPModel() {
        this.zpService.getAll().subscribe((data: ZpModel[] = []) => {
            this.zpDataList = data;
            //console.log("All Records", this.dropdownList);
        });
    }


    public getSelectedTaluka = (value: any) => this.selectedTaluka = value;
    public getSelectedVillage = (value: any) => this.selectedVillage = value;
    public getSelectedWorkP = (value: any) => this.selectedWorkP = value;

    addUpdateLoanPaymentMaster() {

        if (this.button == 'Add') {
            this.loanPaymentService.create(this.model).subscribe(() => {

                //      this.dropdownList=[];
                alert('Record Added Successfully');
                this.router.navigate(['./loan-payment-list', { 'lastInsert': this.model.id }]);
                //this.loadAllEnquiry();
            },
                error => {
                    throw error;
                });
            console.log('form data to add in databse', this.model);

        } else if (this.button == 'Update') {
            this.zpService.update(this.model).subscribe(() => {

                alert('Record updated Successfully');
                this.button = 'Update';
                this.router.navigate(['./loan-payment-list', { 'lastUpdate': this.model.id }]);
                console.log('form data to update in database', this.model);
            },
                error => {
                    throw error;
                });
        }

    }

    public checkInstallNumber() {
        this.loanPaymentDatalist.forEach(lpModel => {
            if (lpModel.zpId == this.model.zpId) {
                this.model.installmentNumber = lpModel.installmentNumber + 1;
            } else {
                this.model.installmentNumber = 1;
            }
        });
    }


    calculateInterest() {
        var dataList;

        this.loanPaymentService.getRecordaForCalculateInterest(this.model.zpId).subscribe((data: any) => {
            dataList = data;
            dataList.forEach(element => {
                //calculate difference from two dates in days.
                var diff = Math.abs(element.grantDate.getTime() - this.model.grantDate.getTime());
                this.daysDiff = Math.ceil(diff / (1000 * 3600 * 24));
                //calculate interest.
                this.tinterest = (element.amount * 0.05) / 365;
                this.interestSum += (this.daysDiff * this.tinterest);
            });
        });
    }

    public calBalance() {
        var model;
        this.zpDataList.forEach(model => {
            if (model.id == this.model.zpId) {
                if (model.noOfInstallment == 0) {
                    model.noOfInstallment = this.model.installmentNumber;
                } else {
                    model.noOfInstallment = this.model.installmentNumber + 1;
                }
                model.balance = this.model.amount;
                if (this.model.amount == 0) {
                    model.lastDueDate = new Date(this.model.grantDate.getDate() + (365 * 10));
                }
            }
        });
        this.zpService.update(model).subscribe(() => {
            //alert('Record updated Successfully');
            //console.log('form data to update in database', this.model);
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
                    this.zpDataList.forEach(zpmodel => {
                        if (this.model.id == this.model.zpId) {
                            this.model.amount = zpmodel.balance - this.model.installmentAmount;
                        }
                    })
                }
            }
        }
    }

    Cancel() {

        if (this.button == 'दुरुस्ती करा') {
            this.router.navigate(['./loan-payment-add']);
        } else {
            console.log("cancel click");

        }
    }
}
