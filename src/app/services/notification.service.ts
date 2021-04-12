import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private _snackBar: MatSnackBar, private router: Router) { }

  flowSaved(returning:any){
    this._snackBar.open(`${returning.numero} : ${returning.title} | enregistré`, "Voir", {
      duration: 4000,
    }).onAction().subscribe(() => {
      this.router.navigate([`/app/flow/project/${returning.flows[0].id}`])
    });
  }
}
