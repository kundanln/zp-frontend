import { Component, ViewChild, OnInit } from '@angular/core';
import { ZPService } from '../../_services/zp.service';
import { ZpModel } from '../../_models/zp.model';
import { VillageAddComponent } from '../../village-master/village-add/village-add.component';
import { VillageModel } from '../../_models/village.model';
import { VillageService } from '../../_services/village.service';
import { Router, ActivatedRoute } from "@angular/router";
import { NgForm } from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-zp-add',
  templateUrl: './zp-add.component.html',
  styleUrls: ['./zp-add.component.css']
})
export class ZpAddComponent implements OnInit {
  villageDataList: VillageModel;
  zpDataList : ZpModel;
  villageModelList: VillageModel[] = [];
  villageAddComponent : VillageAddComponent;
  public talukaList : Array<string> = [];
  public villageList : Array<string> = [];
  button = "Add";
  isValid="Add";
  isinvalid="Update";
  updateId : number ;
  model : ZpModel = {
    ledgerNo : null,
	  villageId : null,
	  villageName : null,
	  taluka : null,
    district : null,
    workParticulars : null,
    openingBalance : null,
    loanAmount : null,
    orderNumber : null,
    sanctionDate : null,
    noOfInstallment: null,
    lastDueDate : null,
    balance : null,
    yearlyInstAmount : null,
    totalAmountPaid : null,
    loanBalance : null,
    closingBalance : null,
    closingFlag : null
  };
  
  datePickerConfigWithMin : Partial<BsDatepickerConfig>;
  datePickerConfigWithoutMin : Partial<BsDatepickerConfig>;

  @ViewChild('modelForm')
  public modelFormref: NgForm;

  constructor(private router: Router, private route: ActivatedRoute, private villageService : VillageService, private zpService : ZPService,public datepipe: DatePipe) {
    zpService : ZPService;
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
  }

  public loadVillageModel() {
    this.villageService.getAll().subscribe((data: VillageModel[] = []) => {
      this.villageModelList = data;
      //console.log("All Records", this.villageModelList);
    });
  }

  public loadTaluka(event : any) {
    console.log("Taluka", this.villageModelList);
    this.model.villageName = '';
    this.villageModelList.forEach(villageDataList => {
        if(this.villageModelList && (!this.talukaList.includes(villageDataList.taluka))) {
           this.talukaList.push(villageDataList.taluka);
           this.talukaList.sort();
           //console.log("taluka",this.talukaList);
        }
    });
    
  }
  public loadVillages(event : any) {
    //console.log("Villages", this.dropdownList);
    this.villageList = [];
    this.villageModelList.forEach(villageDataList => {
        if(this.villageModelList && villageDataList.taluka === this.model.taluka && (!this.villageList.includes(villageDataList.villageName))){
          this.villageList.push(villageDataList.villageName);
          this.villageList.sort();
          //this.model.villageId = villageDataList.id;
          //console.log("taluka",this.villageList);
        }
    });
    
  }

  getRecordByID(id: number) {
    this.zpService.getRecoredById(id).subscribe((data: ZpModel) => {
        this.zpDataList = data;
        this.button = 'Update';
        this.model = this.zpDataList;
        //console.log("getting data for editing zp ", this.zpDataList);

    },
    error=>{
        throw error;
    });
}

  addUpdateZPMaster() {
  this.model.sanctionDate = this.datepipe.transform(this.model.sanctionDate, 'yyyy-MM-dd');

    if(this.button=='Add'){
      
   this.villageModelList.forEach(villagemodel =>{
    if(villagemodel.taluka == this.model.taluka && villagemodel.villageName == this.model.villageName){
     // this.model.villageModel = villagemodel;
      this.model.villageId = villagemodel.id;
      
    }
  });
    this.zpService.create(this.model).subscribe(() => {
      
          //      this.dropdownList=[];
                this.modelFormref.reset();
                alert('Record Added Successfully');
                this.router.navigate(['./zp-list',{ 'lastInsert' : this.model.id }]);
                console.log('form data to zp add in databse', this.model);
            },
            error=>{
                throw error;        
            });

            
          }else if(this.button=='Update'){
            
            this.zpService.update(this.model).subscribe(() => {

              alert('Record updated Successfully');
              this.button = 'जतन करा';
              this.router.navigate(['./zp-list',{ 'lastUpdate' : this.model.id }]);
              console.log('form data to update in database', this.model);
          },
          error=>{
              throw error;        
          });    
          }

  }
  Cancel(){

    if(this.button == 'दुरुस्ती करा'){
        this.router.navigate(['./zp-list']);
    }else{
        console.log("cancel click");
        
    }
}

  calYrlyInstallmentAmt(event: any) {
    //console.log(this.model.loanAmount);
    this.model.yearlyInstAmount = Math.round((this.model.loanAmount) / 10);
    
  }
}
