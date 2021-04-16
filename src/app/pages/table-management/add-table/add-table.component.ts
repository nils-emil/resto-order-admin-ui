import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {TableService} from "../../../httpservice/table.service";

@Component({
  selector: 'app-add-table',
  templateUrl: './add-table.component.html',
  styleUrls: ['./add-table.component.css']
})
export class AddTableComponent implements OnInit {

  public tableForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private tableService: TableService,
    public dialogRef: MatDialogRef<AddTableComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    console.log(this.data)
    this.tableForm = this.formBuilder.group({
      _id: [this.data._id],
      code: [this.data.code, [Validators.required, Validators.maxLength(6), Validators.minLength(6)]],
      description: [this.data.description],
      notifications: [this.data.notifications],
    });
  }

  submitTable() {
    this.tableService.updateTable(this.tableForm.value).subscribe(e => {
      console.log("new table created")
      this.dialogRef.close();
    })
  }
}
