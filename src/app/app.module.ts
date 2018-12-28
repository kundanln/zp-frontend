import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { SelectModule } from 'ng2-select';
import { AppComponent } from './app.component';
import { FormGroup, FormControl, Validators, FormBuilder, FormsModule, ReactiveFormsModule }  from '@angular/forms';
import { ReceiptEntryComponent } from './receipt-entry/receipt-entry.component';
//  import { LoanDetailsComponent } from './loan-details/loan-details.component';
import { VillageAddComponent } from './village-master/village-add/village-add.component';
import { VillageListComponent } from './village-master/village-list/village-list.component';
import { routing } from './app.routing';
import { RouterModule, Routes } from '@angular/router';
import { MainAppComponent } from './main-app/main-app.component';
import { NgxSelectModule } from 'ngx-select-ex';
import { ZpAddComponent } from './zp/zp-add/zp-add.component';
import { ZpListComponent } from './zp/zp-list/zp-list.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { LoanPaymentListComponent } from './loan-payment/loan-payment-list/loan-payment-list.component';
import { LoanPaymentAddComponent } from './loan-payment/loan-payment-add/loan-payment-add.component';
import { TabsModule } from "ngx-tabs";
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { AgGridModule } from 'ag-grid-angular';
import { VillageService } from './_services/village.service';
import { ZPService } from './_services/zp.service';
import { AuthGuard } from './_guards/auth.guard';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { ReceiptEntryAddComponent } from './receipt-entry/receipt-entry-add/receipt-entry-add.component';
import { ReceiptEntryListComponent } from './receipt-entry/receipt-entry-list/receipt-entry-list.component';
import { EditButtonComponent } from './edit-button/edit-button.component';
import { LoanPaymentService } from './_services/loan-payment.service';
import { ReceiptEntryService } from './_services/receipt-entry.service';
import { DeleteButtonComponent } from './delete-button/delete-button.component';
import { DatePipe } from '@angular/common';
import { DateTimeFormatPipe } from './pipe/datePipe';
import { LoginService } from './_services/login.service';
import { LoanIssueDetailComponent } from './report/loan-issue-detail/loan-issue-detail.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter'; 
import { Ng2OrderModule } from 'ng2-order-pipe';
import {NgxPaginationModule} from 'ngx-pagination';
import { MonthRecoveryComponent } from './report/month-recovery/month-recovery.component';
import { YearRecoveryComponent } from './report/year-recovery/year-recovery.component';
import { LoanBalanceOndateComponent } from './report/loan-balance-ondate/loan-balance-ondate.component';
import { LoanBalanceComponent } from './report/loan-balance/loan-balance.component';
import { VillageWiseLoanBalanceComponent } from './report/village-wise-loan-balance/village-wise-loan-balance.component';
import { ReportsComponent } from './report/reports/reports.component'; 
import {MatCardModule} from '@angular/material/card';

@NgModule({
  declarations: [
    AppComponent,
    VillageAddComponent,
    VillageListComponent,
    ReceiptEntryComponent,
   // LoanDetailsComponent,
    VillageAddComponent,
    VillageListComponent,
    MainAppComponent,
    ZpAddComponent,
    ZpListComponent,
    LoanPaymentAddComponent,
    LoanPaymentListComponent,
    LoginComponent,
    RegistrationComponent,
    ReceiptEntryAddComponent,
    ReceiptEntryListComponent,
    EditButtonComponent,
    DeleteButtonComponent,
    DateTimeFormatPipe,
    LoanIssueDetailComponent,
    MonthRecoveryComponent,
    YearRecoveryComponent,
    LoanBalanceOndateComponent,
    LoanBalanceComponent,
    VillageWiseLoanBalanceComponent,
    ReportsComponent,
    



    ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpModule,
    FormsModule,
    SelectModule,
    ReactiveFormsModule,
    TabsModule,
    routing ,
    NgxSelectModule,
    RouterModule,
    BsDatepickerModule.forRoot(),
    NgbModule.forRoot(),
    Ng2SearchPipeModule, 
    Ng2OrderModule,
    NgxPaginationModule,
    MatCardModule,
    
    //ag-grid components
    AgGridModule.withComponents([
      VillageListComponent,
      ZpListComponent,
      LoanPaymentListComponent,
      EditButtonComponent,
      DeleteButtonComponent,
      
    ])
  ],
  providers: [
    VillageService,
    ZPService,
    LoanPaymentService,
    ReceiptEntryService,
    AuthGuard,
    DatePipe,
    LoginService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
