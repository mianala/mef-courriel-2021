import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTabsModule } from '@angular/material/tabs';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatChipsModule } from '@angular/material/chips';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatBadgeModule } from '@angular/material/badge';
import { MatTreeModule } from '@angular/material/tree';
import { MatProgressBarModule } from '@angular/material/progress-bar';

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
    MatPaginatorModule,
    MatMenuModule,
    MatInputModule,
    MatTooltipModule,
    MatTabsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule,
    MatAutocompleteModule,
    MatExpansionModule,
    MatChipsModule,
    MatTableModule,
    MatCheckboxModule,
    MatBadgeModule,
    MatProgressBarModule,
    MatSidenavModule,
    MatTreeModule,
  ],
  exports: [
    MatIconModule,
    MatButtonModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatAutocompleteModule,
    MatDialogModule,
    MatIconModule,
    MatSelectModule,
    MatPaginatorModule,
    MatMenuModule,
    MatInputModule,
    MatTooltipModule,
    MatTabsModule,
    MatDatepickerModule,
    MatCardModule,
    MatAutocompleteModule,
    MatNativeDateModule,
    MatExpansionModule,
    MatChipsModule,
    MatTableModule,
    MatCheckboxModule,
    MatBadgeModule,
    MatProgressBarModule,
    MatSidenavModule,
    MatTreeModule,
  ],
  providers: [MatDatepickerModule],
})
export class MaterialModule {}
