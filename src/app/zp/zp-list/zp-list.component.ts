import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ZpModel } from '../../_models/zp.model';
import { ZPService } from '../../_services/zp.service';
import { EditButtonComponent } from '../../edit-button/edit-button.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-zp-list',
  templateUrl: './zp-list.component.html',
  styleUrls: ['./zp-list.component.css']
})
export class ZpListComponent implements OnInit {
  public rowData: any[];
  private gridApi;
  private gridColumnApi;
  public context;
  public frameworkComponents;
  public rowSelection;
  public columnDefs;
  @Output() notify: EventEmitter<boolean> = new EventEmitter<boolean>();

  
  constructor(private router: Router, private route: ActivatedRoute, private zpService: ZPService) {
    this.columnDefs = [
      { headerName: " ",
      cellRenderer: "EditButton",
      width: 80 },
      {headerName: 'तालुका', field: 'taluka', filter:'agTextColumnFilter', },
      {headerName: 'गावाचे नाव', field: 'villageName', filter:'agTextColumnFilter', },
      {headerName: 'कामाचा तपशील', field: 'workParticulars', filter:'agTextColumnFilter', },
      {headerName: 'ठराव दिनांक', field: 'sanctionDate', filter:'agTextColumnFilter', },
      {headerName: 'आदेश क्रमांक', field: 'ledgerNo', filter:'agTextColumnFilter', },
      {headerName: 'कर्जाची मंजूर रक्कम', field: 'loanAmount', filter:'agTextColumnFilter', },
      {headerName: 'ठराव क्रमांक', field: 'orderNumber', filter:'agTextColumnFilter', },
      {headerName: 'प्रारंभिक शिल्लक', field: 'openingBalance', filter:'agTextColumnFilter', },
      {headerName: 'वर्षास द्यावयाची रक्कम ', field: 'yearlyInstAmount', filter:'agTextColumnFilter', },
      {headerName: 'एकूण मिळालेली रक्कम ', field: 'loanBalance', filter:'agTextColumnFilter', }
      
  ];
  this.context = { componentParent: this };

  this.frameworkComponents = {

      EditButton: EditButtonComponent,
  };

  this.rowSelection = "single";
  this.notify.emit(false); 
   }

  ngOnInit() {
    this.loadAllRecords();
    
  }

  public loadAllRecords() {
    this.zpService.getAll().subscribe((data: ZpModel[] = []) => {
      this.rowData = data;
      //console.log("All Records", this.rowData);
    },
    error=>{
        throw error;        
    })
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  
    this.loadAllRecords();
    params.api.sizeColumnsToFit();
  
  }
  
  
  editmethodFromParent(cell) {
  
    //console.log("DueListCompo ",this.gridApi.RowNode.data.address);
  
    const id = +cell;
    this.router.navigate(['/zp-add'], {
        queryParams: { 'updateId': id }
  
    });
  }
}
