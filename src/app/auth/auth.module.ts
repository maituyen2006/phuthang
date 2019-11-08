import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService } from '../service/admin.service';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../shared/material.module';

@NgModule({
  declarations: [
    
  ],
  imports: [
    CommonModule, RouterModule, FormsModule,MaterialModule
  ],
  providers: [AdminService],
  exports: []
})
export class AuthModule { }
