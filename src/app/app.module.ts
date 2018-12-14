import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { SelectModule } from 'ng2-select';
import { AppComponent } from './app.component';
import { FormGroup, FormControl, Validators, FormBuilder, FormsModule }  from '@angular/forms';
import { ReceiptEntryComponent } from './receipt-entry/receipt-entry.component';
import { LoanDetailsComponent } from './loan-details/loan-details.component';
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

@NgModule({
  declarations: [
    AppComponent,
    VillageAddComponent,
    VillageListComponent,
    ReceiptEntryComponent,
    LoanDetailsComponent,
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



    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpModule,
    FormsModule,
    SelectModule,
    TabsModule,
    routing ,
    NgxSelectModule,
    RouterModule,
    BsDatepickerModule.forRoot(),
    NgbModule.forRoot(),
    //ag-grid components
    AgGridModule.withComponents([
      VillageListComponent,
      ZpListComponent,
      LoanPaymentListComponent,
      EditButtonComponent,
      DeleteButtonComponent
    ])
  ],
  providers: [
    VillageService,
    ZPService,
    LoanPaymentService,
    ReceiptEntryService,
    AuthGuard,
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
