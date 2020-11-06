import { MatSnackBar } from '@angular/material';

export class Utility {
    static snackBar: MatSnackBar;

    static openSnackBar(message: string, action: string) {
        this.snackBar.open(message, action, {
          duration: 2000,
        });
      }
}
