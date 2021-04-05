import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatButtonModule} from '@angular/material/button'
import {MatInputModule} from '@angular/material/input'
import {MatPaginatorModule} from '@angular/material/paginator'
import {MatIconModule} from '@angular/material/icon'
import {MatDialogModule} from '@angular/material/dialog'
import {MatSelectModule} from '@angular/material/select'
import {MatSidenavModule} from '@angular/material/sidenav'
import {MatDatepickerModule} from '@angular/material/datepicker'
import {MatSnackBarModule} from '@angular/material/snack-bar'
import {MatAutocompleteModule} from '@angular/material/autocomplete'
import {MatMenuModule} from '@angular/material/menu'
import { MatTooltipModule } from '@angular/material/tooltip';
import {MatTabsModule} from '@angular/material/tabs';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatButtonModule,
    MatSnackBarModule,
    MatIconModule,
    MatDatepickerModule,
    MatAutocompleteModule,
    MatDialogModule,
    MatSelectModule,
    MatSidenavModule,
    MatPaginatorModule,
    MatMenuModule,
    MatInputModule,
    MatTooltipModule,
    MatTabsModule
    
  ],
  exports:[
    MatIconModule,
    MatButtonModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatAutocompleteModule,
    MatDialogModule,
    MatIconModule,
    MatSelectModule,
    MatSidenavModule,
    MatPaginatorModule,
    MatMenuModule,
    MatInputModule,
    MatTooltipModule
    ,
    MatTabsModule
  ]
})
export class MaterialModule { }
