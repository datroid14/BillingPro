import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatTableModule } from '@angular/material/table';

import { MatPaginatorModule } from '@angular/material/paginator';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material';
import { NativeDateModule } from '@angular/material';
import { MatDividerModule } from '@angular/material/divider';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppComponent } from './app.component';
import { TableViewComponent } from './table-view/table-view.component';
import { CreateInvoiceComponent } from './create-invoice/create-invoice.component';
import { AddChequeDetailsComponent } from './add-cheque-detail/add-cheque-detail.component';
import { AddCustomerComponent } from './add-customer/add-customer.component';
import { AddDieselEntryComponent } from './add-diesel-entry/add-diesel-entry.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { AddGstComponent } from './add-gst/add-gst.component';
import { AddPaymentComponent } from './add-payment/add-payment.component';
import { AddProductComponent } from './add-product/add-product.component';
import { AddPurchaseComponent } from './add-purchase/add-purchase.component';
import { AddVehicleComponent } from './add-vehicle/add-vehicle.component';
import { AddVendorComponent } from './add-vendor/add-vendor.component';
import { AddEmiDetailComponent } from './add-emi-detail/add-emi-detail.component';
import { AddCardDetailComponent } from './add-card-detail/add-card-detail.component';
import { AddTripDetailComponent } from './add-trip-detail/add-trip-detail.component';
import { AddAccountComponent } from './add-account/add-account.component';

import { CreateChallanComponent } from './create-challan/create-challan.component';
import { CreateQuatationComponent } from './create-quatation/create-quatation.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ViewCustomerComponent } from './view-customer/view-customer.component';
import { ViewInvoiceComponent } from './view-invoice/view-invoice.component';
import { ViewVendorComponent } from './view-vendor/view-vendor.component';
import { ViewProductComponent } from './view-product/view-product.component';
import { ViewChallanComponent } from './view-challan/view-challan.component';
import { ViewPurchaseComponent } from './view-purchase/view-purchase.component';
import { ViewQuatationComponent } from './view-quatation/view-quatation.component';
import { ViewInvoiceCopyComponent } from './view-invoice-copy/view-invoice-copy.component';
import { ViewVehicleComponent } from './view-vehicle/view-vehicle.component';
import { ViewGstComponent } from './view-gst/view-gst.component';
import { ViewChequeDetailsComponent } from './view-cheque-details/view-cheque-details.component';
import { ViewQuatationCopyComponent } from './view-quatation-copy/view-quatation-copy.component';
import { ViewChallanCopyComponent } from './view-challan-copy/view-challan-copy.component';
import { ViewPurchaseCopyComponent } from './view-purchase-copy/view-purchase-copy.component';
import { ViewDieselEntryComponent } from './view-diesel-entry/view-diesel-entry.component';
import { ViewPaymentDetailComponent } from './view-payment-detail/view-payment-detail.component';
import { ViewEmployeeComponent } from './view-employee/view-employee.component';
import { ViewAccountComponent } from './view-account/view-account.component';
import { ViewTripDetailComponent } from './view-trip-detail/view-trip-detail.component';
import { ViewCardDetailComponent } from './view-card-detail/view-card-detail.component';
import { ViewEmiDetailComponent } from './view-emi-detail/view-emi-detail.component';

import { CustomerService } from './add-customer/customer.service';
import { VendorService } from './add-vendor/vendor.service';
import { ProductService } from './add-product/product.service';
import { PurchaseService } from './add-purchase/purchase.service';
import { QuatationService } from './create-quatation/quatation.service';
import { ChallanService } from './create-challan/challan.service';
import { AppService } from './app.service';
import { VehicleService } from './add-vehicle/vehicle.service';
import { InvoiceService } from './create-invoice/invoice.service';
import { GSTService } from './add-gst/gst.service';
import { ChequeEntryService } from './add-cheque-detail/cheque-entry.service';
import { EmployeeService } from './add-employee/employee.service';
import { DieselEntryService } from './add-diesel-entry/diesel-entry.service';
import { PaymentService } from './add-payment/payment.service';
import { AccountService } from './add-account/account.service';
import { EmiDetailService } from './add-emi-detail/emi-detail.service';
import { TripDetailService } from './add-trip-detail/trip-detail.service';
import { CardDetailService } from './add-card-detail/card-detail.service';
import { DashboardService } from './dashboard/dashboard.service';
import { InsuranceService } from './add-insurance-detail/insurance.service';
import { ExcelService } from './common/excel.service';
import { ViewInsuranceDetailComponent } from './view-insurance-detail/view-insurance-detail.component';
import { AddInsuranceDetailComponent } from './add-insurance-detail/add-insurance-detail.component';
import { ViewChallanStatementComponent } from './view-challan-statement/view-challan-statement.component';

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'table-view', component: TableViewComponent },
  { path: 'add-account', component: AddAccountComponent },
  { path: 'add-card-detail', component: AddCardDetailComponent },
  { path: 'add-emi-detail', component: AddEmiDetailComponent },
  { path: 'add-trip-detail', component: AddTripDetailComponent },
  { path: 'add-cheque-details', component: AddChequeDetailsComponent },
  { path: 'add-customer', component: AddCustomerComponent },
  { path: 'add-diesel-entry', component: AddDieselEntryComponent },
  { path: 'add-employee', component: AddEmployeeComponent },
  { path: 'add-gst', component: AddGstComponent },
  { path: 'add-insurance-detail', component: AddInsuranceDetailComponent },
  { path: 'add-product', component: AddProductComponent },
  { path: 'add-purchase', component: AddPurchaseComponent },
  { path: 'add-vehicle', component: AddVehicleComponent },
  { path: 'add-vendor', component: AddVendorComponent },
  { path: 'add-payment', component: AddPaymentComponent },
  { path: 'create-invoice', component: CreateInvoiceComponent },
  { path: 'create-challan', component: CreateChallanComponent },
  { path: 'create-quatation', component: CreateQuatationComponent },
  { path: 'view-challan', component: ViewChallanComponent },
  { path: 'view-customer', component: ViewCustomerComponent },
  { path: 'view-gst', component: ViewGstComponent },
  { path: 'view-invoice', component: ViewInvoiceComponent },
  { path: 'view-product', component: ViewProductComponent },
  { path: 'view-purchase', component: ViewPurchaseComponent },
  { path: 'view-quatation', component: ViewQuatationComponent },
  { path: 'view-vendor', component: ViewVendorComponent },
  { path: 'view-vehicle', component: ViewVehicleComponent },
  { path: 'view-invoice-copy', component: ViewInvoiceCopyComponent },
  { path: 'view-challan-copy', component: ViewChallanCopyComponent },
  { path: 'view-purchase-copy', component: ViewPurchaseCopyComponent },
  { path: 'view-quatation-copy', component: ViewQuatationCopyComponent },
  { path: 'view-cheque-details', component: ViewChequeDetailsComponent },
  { path: 'view-employee', component: ViewEmployeeComponent },
  { path: 'view-diesel-entry', component: ViewDieselEntryComponent },
  { path: 'view-payment-detail', component: ViewPaymentDetailComponent },
  { path: 'view-trip-detail', component: ViewTripDetailComponent },
  { path: 'view-account', component: ViewAccountComponent },
  { path: 'view-card-detail', component: ViewCardDetailComponent },
  { path: 'view-emi-detail', component: ViewEmiDetailComponent },
  { path: 'view-insurance-detail', component: ViewInsuranceDetailComponent },
  { path: 'view-challan-statement', component: ViewChallanStatementComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent,
    TableViewComponent,
    CreateInvoiceComponent,
    AddProductComponent,
    ViewInvoiceComponent,
    CreateChallanComponent,
    CreateQuatationComponent,
    AddCustomerComponent,
    LoginComponent,
    DashboardComponent,
    AddVendorComponent,
    AddPurchaseComponent,
    ViewCustomerComponent,
    ViewVendorComponent,
    ViewProductComponent,
    ViewChallanComponent,
    ViewPurchaseComponent,
    ViewQuatationComponent,
    AddVehicleComponent,
    ViewInvoiceCopyComponent,
    ViewVehicleComponent,
    ViewGstComponent,
    AddGstComponent,
    ViewChequeDetailsComponent,
    AddChequeDetailsComponent,
    ViewQuatationCopyComponent,
    ViewChallanCopyComponent,
    ViewPurchaseCopyComponent,
    AddDieselEntryComponent,
    AddEmployeeComponent,
    AddPaymentComponent,
    ViewDieselEntryComponent,
    ViewPaymentDetailComponent,
    ViewEmployeeComponent,
    AddAccountComponent,
    ViewAccountComponent,
    ViewTripDetailComponent,
    ViewCardDetailComponent,
    ViewEmiDetailComponent,
    AddEmiDetailComponent,
    AddCardDetailComponent,
    AddTripDetailComponent,
    ViewInsuranceDetailComponent,
    AddInsuranceDetailComponent,
    ViewChallanStatementComponent
  ],
  imports: [
    BrowserModule,
    MatTableModule,
    MatPaginatorModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    MatGridListModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NativeDateModule,
    MatDividerModule,
    RouterModule.forRoot(appRoutes),
    FlexLayoutModule,
    HttpModule,
    HttpClientModule
  ],
  providers: [AppService, CustomerService, VendorService, ProductService, QuatationService, ChallanService, 
    PurchaseService, VehicleService, InvoiceService, GSTService, ChequeEntryService, EmployeeService, 
    DieselEntryService, PaymentService, AccountService, CardDetailService, EmiDetailService, TripDetailService,
    DashboardService, ExcelService, InsuranceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
