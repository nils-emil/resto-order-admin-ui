import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-access-edit-modal',
  templateUrl: './access-edit-modal.component.html',
  styleUrls: ['./access-edit-modal.component.css']
})
export class AccessEditModalComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AccessEditModalComponent>) {
  }

  confirm(confirmation: boolean): void {
    this.dialogRef.close(confirmation);
  }

  ngOnInit(): void {
  }
}
