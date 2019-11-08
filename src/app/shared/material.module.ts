import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';

// Material Module
import {
  MatMenuModule, MatButtonModule, MatIconModule, MatTooltipModule, MatSlideToggleModule, MatDialogModule, MatInputModule, MatTabsModule,
  MatSidenavModule, MatExpansionModule, MatSelectModule, MatButtonToggleModule, MatListModule, MatDividerModule, MatCheckboxModule,
  MatProgressSpinnerModule, MatSnackBarModule, MatDatepickerModule, MatNativeDateModule, MatTableModule, MatCardModule, MatChipsModule,
  MatAutocompleteModule, MatToolbarModule, MatStepperModule, MatRadioModule, MatFormFieldModule, MatProgressBarModule, MatPaginatorModule,
  MatTreeModule, MatBottomSheetModule, MatSortModule, DateAdapter, MAT_DATE_FORMATS, NativeDateModule, MAT_DATE_LOCALE
} from '@angular/material';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { MY_DATE_FORMATS } from '../class/my-date-adapter';
const MATERIAL_MODULE = [
  MatMenuModule, MatButtonModule, MatIconModule, MatTooltipModule, MatSlideToggleModule, MatDialogModule, MatInputModule, MatTabsModule,
  MatSidenavModule, MatExpansionModule, MatInputModule, MatSelectModule, MatButtonToggleModule, MatListModule, MatDividerModule,
  MatCheckboxModule, MatProgressSpinnerModule, MatSnackBarModule, MatDatepickerModule, NativeDateModule, MatNativeDateModule,
  MatTableModule, MatCardModule, MatChipsModule, MatAutocompleteModule, MatToolbarModule, MatStepperModule, MatRadioModule,
  MatFormFieldModule, MatProgressBarModule, MatPaginatorModule, MatTreeModule, MatBottomSheetModule, MatSortModule,
  MatStepperModule
];

@NgModule({
  imports: [
    CommonModule, MATERIAL_MODULE, NgxMaterialTimepickerModule
  ],
  exports: [MATERIAL_MODULE, NgxMaterialTimepickerModule],
  declarations: [],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
  ]
})
export class MaterialModule { }
