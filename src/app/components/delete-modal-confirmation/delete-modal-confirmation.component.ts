import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-delete-modal-confirmation',
  templateUrl: './delete-modal-confirmation.component.html',
  styleUrls: ['./delete-modal-confirmation.component.css']
})
export class DeleteModalConfirmationComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DeleteModalConfirmationComponent>) {
  }

  confirm(confirmation: boolean): void {
    this.dialogRef.close(confirmation);
  }

  ngOnInit(): void {
  }

}
