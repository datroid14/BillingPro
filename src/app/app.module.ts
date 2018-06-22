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
import { AddProductComponent } from './add-product/add-product.component';
import { ViewInvoiceComponent } from './view-invoice/view-invoice.component';
import { CreateChallanComponent } from './create-challan/create-challan.component';
import { CreateQuatationComponent } from './create-quatation/create-quatation.component';
import { AddCustomerComponent } from './add-customer/add-customer.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddVendorComponent } from './add-vendor/add-vendor.component';
import { AddPurchaseComponent } from './add-purchase/add-purchase.component';
import { ViewCustomerComponent } from './view-customer/view-customer.component';
import { ViewVendorComponent } from './view-vendor/view-vendor.component';
import { ViewProductComponent } from './view-product/view-product.component';
import { ViewChallanComponent } from './view-challan/view-challan.component';
import { ViewPurchaseComponent } from './view-purchase/view-purchase.component';
import { ViewQuatationComponent } from './view-quatation/view-quatation.component';
import { AddVehicleComponent } from './add-vehicle/add-vehicle.component';
import { ViewInvoiceCopyComponent } from './view-invoice-copy/view-invoice-copy.component';
import { ViewVehicleComponent } from './view-vehicle/view-vehicle.component';
import { ViewGstComponent } from './view-gst/view-gst.component';
import { AddGstComponent } from './add-gst/add-gst.component';

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

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'table-view', component: TableViewComponent },
  { path: 'add-customer', component: AddCustomerComponent },
  { path: 'add-gst', component: AddGstComponent },
  { path: 'add-product', component: AddProductComponent },
  { path: 'add-purchase', component: AddPurchaseComponent },
  { path: 'add-vendor', component: AddVendorComponent },
  { path: 'add-vehicle', component: AddVehicleComponent },
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
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/view-customer', pathMatch: 'full' },
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
    AddGstComponent
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
  providers: [AppService, CustomerService, VendorService, ProductService, QuatationService, ChallanService, PurchaseService, VehicleService, InvoiceService, GSTService],
  bootstrap: [AppComponent]
})
export class AppModule { }
