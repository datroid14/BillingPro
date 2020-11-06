import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { InvoiceService } from '../create-invoice/invoice.service';

@Component({
  selector: 'app-common-dialog',
  templateUrl: './common-dialog.component.html',
  styleUrls: ['./common-dialog.component.css']
})
export class CommonDialogComponent {

  constructor(private invoiceService: InvoiceService, public dialogRef: MatDialogRef<CommonDialogComponent>) { }

  cancelInvoice() {
    this.dialogRef.close();
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
