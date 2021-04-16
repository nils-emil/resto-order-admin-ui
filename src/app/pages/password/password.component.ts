import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../httpservice/user.service";

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent implements OnInit {


  public passwordForm: FormGroup;
  public error = '';
  constructor(private formBuilder: FormBuilder,
              private userService: UserService) {
  }

  ngOnInit(): void {
    this.passwordForm = this.formBuilder.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
      newPasswordConfirm: ['', Validators.required],
    });
  }

  submit() {
    this.error = null
    this.userService.updatePassword(this.passwordForm.value).subscribe(e => {
      console.log("success")
    },
      error => {
        console.log(error)
          this.error = error.error.error;
      })

  }
}
