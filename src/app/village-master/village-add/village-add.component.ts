import { Component,ViewChild, OnInit } from '@angular/core';
import { VillageService } from '../../_services/village.service';
import { VillageModel } from '../../_models/village.model';
import { Router, ActivatedRoute } from "@angular/router";
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-village-add',
  templateUrl: './village-add.component.html',
  styleUrls: ['./village-add.component.css']
})
export class VillageAddComponent implements OnInit {
  model: VillageModel = {
    villageName : null,
    taluka : null,
    district : null
  };
  public talukaList : Array<string> = [];
  public villageList : Array<string> = [];
  datalist: VillageModel;
  dropdownList: VillageModel[] = [];
  button = "जतन करा";
  updateId : number ;

  @ViewChild('modelForm')
  public modelFormref: NgForm;
  
  constructor(private router: Router, private route: ActivatedRoute, private villageService: VillageService) { 
    
     villageService: VillageService;
     if(this.route.snapshot.queryParamMap.has('updateId'))
        {   
            this.updateId =+this.route.snapshot.queryParamMap.get('updateId');
            this.getRecordByID(this.updateId);
        }   
  }

  ngOnInit() {
    this.loadAllRecords();
    //this.loadTaluka();
    //this.loadVillages();
  };

  public loadAllRecords() {
    this.villageService.getAll().subscribe((data: VillageModel[] = []) => {
      this.dropdownList = data;
      console.log("All Records", this.dropdownList);
    },
    error=>{
        throw error;        
    })
  }

  public loadTaluka(event : any) {
    console.log("Taluka", this.dropdownList);
    this.model.villageName = '';
    this.dropdownList.forEach(datalist => {
        if(this.dropdownList && (!this.talukaList.includes(datalist.taluka))) {
           this.talukaList.push(datalist.taluka);
           this.talukaList.sort();
           //console.log("taluka",this.talukaList);
        }
    });
    
  }
  public loadVillages(event : any) {
    //console.log("Villages", this.dropdownList);
    this.villageList = [];
    this.dropdownList.forEach(datalist => {
        if(this.dropdownList && datalist.taluka === this.model.taluka && (!this.villageList.includes(datalist.villageName))){
          this.villageList.push(datalist.villageName);
          this.villageList.sort();
          //console.log("taluka",this.villageList);
        }
      },
        error=>{
           
            throw error;
          
      });
    
    
  }

  getRecordByID(id: number) {
    this.villageService.getRecoredById(id).subscribe((data: VillageModel) => {
        this.datalist = data;
        this.button = 'दुरुस्ती करा';
        this.model = this.datalist;
        console.log("getting data for editing village ", this.datalist);

    },
    error=>{
        throw error;
    });
}
  
  addUpdateVillage() {
    
    if(this.button == 'जतन करा'){
      
      this.villageService.create(this.model).subscribe(() => {

        //      this.dropdownList=[];
             this.modelFormref.reset();
             alert('Record Added Successfully');
             
             this.router.navigate(['./village-list',{ 'lastInsert' : this.model.id }]);
             
             this.loadAllRecords();
          },
          error=>{
            alert("village master Record not Added");
              throw error;        
          });

    }else if (this.button == 'दुरुस्ती करा') {

      this.villageService.update(this.model).subscribe(() => {

          alert('Record updated Successfully');
          this.button = 'जतन करा';
          this.router.navigate(['./village-list',{ 'lastUpdate' : this.model.id }]);
          console.log('form data to update in database', this.model);
      },
      error=>{
        alert("village master Record not Updated");
          throw error;        
      });    

     }        

  }
  Cancel(){

        if(this.button == 'दुरुस्ती करा'){
            this.router.navigate(['./village-list']);
        }else{
            console.log("cancel click");
            
        }
    }

}
