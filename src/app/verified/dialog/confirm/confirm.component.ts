import { Component, OnInit, Inject } from '@angular/core';
import { MatSnackBar, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent implements OnInit {

  question = 'Bạn chắc chắn muốn thực hiện hành động này?';
  isConfirmed = false;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<ConfirmComponent>) {
    this.question = data;
  }

  ngOnInit() {
  }
  onConfirmClick(isConfirmed): void {
    this.isConfirmed = isConfirmed;
    this.dialogRef.close(this.isConfirmed);
  }
}
