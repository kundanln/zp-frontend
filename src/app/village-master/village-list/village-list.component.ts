import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { VillageService } from '../../_services/village.service';
import { VillageModel } from '../../_models/village.model';
import { Router, ActivatedRoute } from '@angular/router';
import { EditButtonComponent } from '../../edit-button/edit-button.component';
import { DeleteButtonComponent } from 'src/app/delete-button/delete-button.component';

@Component({
  selector: 'app-village-list',
  templateUrl: './village-list.component.html',
  styleUrls: ['./village-list.component.css']
})
export class VillageListComponent implements OnInit {
  public rowData: any[];
  private gridApi;
  public gridColumnApi;
  public context;
  public frameworkComponents;
  public rowSelection;
  public columnDefs;
  @Output() notify: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor( private router: Router, private route: ActivatedRoute,private villageService: VillageService) {
    this.columnDefs = [{ headerName: " ", cellRenderer: "EditButton",width: 80 },
     { headerName: " ", cellRenderer: "DeleteButton",width: 80 },
    {headerName: 'District', field: 'district', width: 327, filter:'agTextColumnFilter',},
    {headerName: 'Taluka', field: 'taluka', width: 327, filter:'agTextColumnFilter', },
    {headerName: 'Village Name', field: 'villageName', width: 327, filter:'agTextColumnFilter', }
  ];
  this.context = { componentParent: this,componentParent1: this };

  this.frameworkComponents = {

      EditButton: EditButtonComponent,
      DeleteButton: DeleteButtonComponent
  };

  this.rowSelection = "single";
  this.notify.emit(false); 
   }

  ngOnInit() {
    
    this.loadAllVillages();
  };
  


private loadAllVillages() {
  this.villageService.getAll().subscribe((data: VillageModel[]) => {

      this.rowData = data;
      console.log("dropdown list data", this.rowData);
     
  },
  error=>{
      throw error;        
  })
}



   
onGridReady(params) {
  this.gridApi = params.api;
  this.gridColumnApi = params.columnApi;

  this.loadAllVillages();
  params.api.sizeColumnsToFit();

}

deleteMethodFromParent(cell) {

  const id = +cell;
  alert("Enter delete methods");
  console.log("Delete methid id",id);
  this.villageService.delete(id).subscribe(result => {
    console.log(result);
    alert("Sucessful reocoed deleted");
    this.loadAllVillages();
    // this.retrieveData = this.retrieveData.filter((elem) => {
    //     return elem.id !== id;
    // });
  }, error => console.log('There was an error: ', error));
  
 }

editmethodFromParent(cell) {

 const id = +cell;
 //alert("Enter edit methods");
  this.router.navigate(['/village-add'], {
      queryParams: { 'updateId': id }

  });
}

}
