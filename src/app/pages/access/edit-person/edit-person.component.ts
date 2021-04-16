import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../../httpservice/user.service";
import {LoginService} from "../../../httpservice/login.service";

@Component({
  selector: 'app-edit-person',
  templateUrl: './edit-person.component.html',
  styleUrls: ['./edit-person.component.css']
})
export class EditPersonComponent implements OnInit {

  public personForm: FormGroup;
  public user: any = {};
  constructor(
    private loginService: LoginService,
    private formBuilder: FormBuilder,
    private userService: UserService,
    public dialogRef: MatDialogRef<EditPersonComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  onNoClick(): void {
    this.userService.createOrUpdateUser(this.personForm.value)
      .subscribe(result => {
        this.dialogRef.close();
      })
  }

  ngOnInit(): void {
    this.user = this.loginService.getCurrentInitUser();
    this.personForm = this.formBuilder.group({
      _id: [this.data._id],
      username: [this.data.username, Validators.required],
      email: [this.data.email, Validators.required],
      isAdmin: [this.data.isAdmin, Validators.required],
    });
  }

  currentUserIsAdmin() {



  }
}
