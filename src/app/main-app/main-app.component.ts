import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker/ngx-bootstrap-datepicker';
import { DateModel } from '../_models/Data.model';

import { VillageModel } from '../_models/village.model';
import { ZpModel } from '../_models/zp.model';
import { LoanPaymentModel } from '../_models/loan-payment.model';
import { VillageService } from '../_services/village.service';
import { ZPService } from '../_services/zp.service';
import { LoanPaymentService } from '../_services/loan-payment.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-main-app',
  templateUrl: './main-app.component.html',
  styleUrls: ['./main-app.component.css']
})
export class MainAppComponent implements OnInit {
  
  
   

  frmDate: string;
  toDate: string;

  selectedTaluka: string;
  selectedVillage: string;
  selectedWorkP: string;
 
  public villageList: Array<string> = [];
  public talukaList: Array<string> = [];
  public workList: Array<string> = [];

  dropdownList: VillageModel[] = [];
  villagemodel: VillageModel;

  zpdatalist:ZpModel[]=[];
  zpmodel: ZpModel;

  loanpaymentdatalist:LoanPaymentModel[]=[];
  loanpaymentmodel: LoanPaymentModel;
  

  

  datePickerConfig: Partial<BsDatepickerConfig>;
  
  constructor(private routes: Router,private route: ActivatedRoute,private datePipe: DatePipe,private villageService: VillageService, private zpService: ZPService, private loanPaymentService: LoanPaymentService) { 

          this.datePickerConfig = Object.assign({},

            {
                //containerClass: 'theme-dark-blue',
                showWeekNumbers : false,
                dateInputFormat: 'YYYY/MM/DD'
            }
        )
  }


  dateModel: DateModel = {

    fromDate: null,
    toDate: null,
    year: null,
}
reports: any[] = [
  { id: 1, name: 'Month'},
  
  ];


  onSubmitMonth(){

    this.frmDate = this.datePipe.transform(this.dateModel.fromDate, "yyyy-MM-dd");
    this.toDate = this.datePipe.transform(this.dateModel.toDate, "yyyy-MM-dd");
    //  console.log("from date  : ",this.frmDate);
    //  console.log("to date  : ",this.toDate);
    this.routes.navigate(['/month-report'], { queryParams: { 'fromDate': this.frmDate, 'toDate': this.toDate } });

  }

  onSubmitYear(){
    

    this.routes.navigate(['/year-report'], { queryParams: { 'year': this.dateModel.year} });
    
  }

  onSubmitLoanIntersonDate(){
    this.routes.navigate(['/loan-balance-date'],{queryParams: { 'inputTaluka': this.selectedVillage,'inputVillage':this.selectedVillage,'inputWorkParticulars':this.selectedWorkP}});
    this.selectedTaluka = '';
    this.selectedVillage = '';
    this.selectedWorkP  = '';
  }

  onSubmitvillagewise(){
    this.routes.navigate(['/village-wise']);
  }

  onSubmitReport(){
    this.routes.navigate(['/reports'], { queryParams: { 'inputTaluka': this.selectedVillage,'inputVillage':this.selectedVillage} });
    this.selectedTaluka = '';
    this.selectedVillage = '';
  }


  ngOnInit() {
    this.loadVillageModel();
    this.loadZpModel();
    this.loadpayementModel();
  }
  
  public loadVillageModel(){
    this.villageService.getAll().subscribe((data: VillageModel[] = []) => {
      this.dropdownList = data;
      console.log("All loadVillage Records", this.dropdownList);
  });
}

  public loadZpModel(){

    this.zpService.getAll().subscribe((zpdata: ZpModel[]=[])=>{
       this.zpdatalist = zpdata;
      //console.log("All load zpmmodel records", this.zpdatalist);
          
    });

  }

  public loadpayementModel(){

    this.loanPaymentService.getAll().subscribe((loandata:LoanPaymentModel[]=[])=>{
      this.loanpaymentdatalist=loandata;
      //console.log("All load payment records",this.loanpaymentdatalist);
    });
  }

  
  public loadVillages(){
    this.villageList = [];
    this.dropdownList.forEach(villagelist =>{
      if(this.dropdownList && villagelist.taluka==this.selectedTaluka && (!this.villageList.includes(villagelist.villageName))){
          this.villageList.push(villagelist.villageName);
          this.villageList.sort();
        }

    });

  }

  public loadTaluka(){

    this.dropdownList.forEach(talukaDataList => {
      if (this.dropdownList && (!this.talukaList.includes(talukaDataList.taluka))) {
          this.talukaList.push(talukaDataList.taluka);
          this.talukaList.sort();
          //console.log("taluka",this.talukaList);
      }
  });

  }
  public loadWorkParticulars(){

    this.workList = [];
    this.zpdatalist.forEach(zpModel => {
        if (this.zpdatalist && zpModel.taluka == this.selectedTaluka && zpModel.villageName == this.selectedVillage && (!this.workList.includes(zpModel.workParticulars))) {
            this.workList.push(zpModel.workParticulars);
            this.workList.sort();
        }
    });
    if (this.workList.length == 0) {
        alert("Loan is not given to this village");
       // this.clearFeilds();
    }

  }

  public getSelectedTaluka = (value: any) => this.selectedTaluka = value;
	public getSelectedVillage = (value: any) => this.selectedVillage = value;
	public getSelectedWorkP = (value: any) => this.selectedWorkP = value;
		
	

 logout(){ 

    this.routes.navigate(['/login']);
  }
}
