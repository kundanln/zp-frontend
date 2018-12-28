import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ZpModel } from '../../_models/zp.model';
import { ActivatedRoute, Router } from '@angular/router';
import { EditButtonComponent } from 'src/app/edit-button/edit-button.component';
import { LoanPaymentService } from 'src/app/_services/loan-payment.service';
import { LoanPaymentModel } from 'src/app/_models/loan-payment.model';
import { ZPService } from 'src/app/_services/zp.service';

@Component({
  selector: 'app-loan-payment-list',
  templateUrl: './loan-payment-list.component.html',
  styleUrls: ['./loan-payment-list.component.css']
})
export class LoanPaymentListComponent implements OnInit {
  public rowData: any[];
  private gridApi;
  public gridColumnApi;
  public context;
  public frameworkComponents;
  public rowSelection;
  public columnDefs;
  zpDataList: ZpModel[];
  zpModel: ZpModel;
  @Output() notify: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private router: Router, private route: ActivatedRoute,private zpSevice: ZPService, private loanPaymentService : LoanPaymentService ) { 
    this.columnDefs=[{headerName: " ", cellRenderer: "EditButton",width: 80},
    
    {headerName:"तालुका",field:'1',filter:'agTextColumnFilter', width: 270},
    {headerName:"गावाचे नाव",field:'2',filter:'agTextColumnFilter', width: 270},
    {headerName:"कामाचा तपशील",field:'3',filter:'agTextColumnFilter', width: 270},
    //{headerName:"ठराव दिनांक",field:'grantDate',filter:'agTextColumnFilter'},
    // {headerName:"ठराव क्रमांक",field:'orderNumber',filter:'agTextColumnFilter'},
    // {headerName:"आदेश क्रमांक",field:'ledgerNo',filter:'agTextColumnFilter'},
    {headerName:"कर्जाची शिल्लक रक्कम",field:'4',filter:'agNumberColumnFilter', width: 270}
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
    this.loanPaymentService.getLoanDetailsRecordsByZpId().subscribe((data: any[] = []) => {
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
  
    //this.loadAllRecords();
    params.api.sizeColumnsToFit();
  
  }
  editmethodFromParent(cell) {
  
    //console.log("DueListCompo ",this.gridApi.RowNode.data.address);
  
    const id = +cell;
    this.router.navigate(['/loan-payment-add'], {
        queryParams: { 'updateId': id }
  
    });
  }
  
}
