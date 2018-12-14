import { Routes, RouterModule } from '@angular/router';
import { VillageAddComponent } from './village-master/village-add/village-add.component';
import { ZpAddComponent } from './zp/zp-add/zp-add.component';
import { LoanPaymentAddComponent } from './loan-payment/loan-payment-add/loan-payment-add.component';
import { VillageListComponent } from './village-master/village-list/village-list.component';
import { ZpListComponent } from './zp/zp-list/zp-list.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './_guards';
import { MainAppComponent } from './main-app/main-app.component';
import { RegistrationComponent } from './registration/registration.component';
import { ReceiptEntryAddComponent } from './receipt-entry/receipt-entry-add/receipt-entry-add.component';
import { LoanPaymentListComponent } from './loan-payment/loan-payment-list/loan-payment-list.component';
import { LoanDetailsComponent } from './loan-details/loan-details.component';

const appRoutes : Routes = [
    {
        path: '',
        canActivate:[AuthGuard],
        component: MainAppComponent,
        children:[

            {
                path: 'village-add',
                canActivate:[AuthGuard],
                component: VillageAddComponent
                
            },
            {
                path: 'village-list',
                component: VillageListComponent
                },
            {
                path: 'zp-add',
                canActivate:[AuthGuard],
                component: ZpAddComponent
            },
	       {
        	path: 'zp-list',
        	component: ZpListComponent
    	    },
            {
                path: 'loan-payment-add',
                canActivate:[AuthGuard],
                component: LoanPaymentAddComponent
            },
            {
                path: 'loan-payment-list',
                canActivate:[AuthGuard],
                component: LoanPaymentListComponent
            },
            {
                path: 'receipt-entry-add',
                canActivate:[AuthGuard],
                component: ReceiptEntryAddComponent
            },
            // {
            //     path: 'app-loan-details',
            //     canActivate:[AuthGuard],
            //     component: LoanDetailsComponent
            // },
        ]
        
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'registration',
        component: RegistrationComponent
    },
    {
         path: '**', redirectTo: ''
    }
]

export const routing = RouterModule.forRoot(appRoutes, { useHash: true });