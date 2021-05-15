import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Link } from '../classes/link';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private _snackBar: MatSnackBar, private router: Router) {}

  flowSaved(returning: any) {
    console.log(returning);

    this._snackBar
      .open(`${returning.numero} : ${returning.title} | enregistré`, 'Voir', {
        duration: 4000,
      })
      .onAction()
      .subscribe(() => {
        this.router.navigate([Link.FLOW_PAGE], {
          queryParams: { flow_id: returning.id },
        });
      });
  }

  notify(message: string, duration = 2000) {
    this._snackBar.open(message, '', {
      duration: duration,
    });
  }
}
