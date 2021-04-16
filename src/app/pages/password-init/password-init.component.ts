import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../httpservice/user.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-password-init',
  templateUrl: './password-init.component.html',
  styleUrls: ['./password-init.component.css']
})
export class PasswordInitComponent implements OnInit {


  public passwordForm: FormGroup;
  public error = '';
  public success = false;

  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private userService: UserService) {
  }

  ngOnInit(): void {
    let keyParam = this.route.snapshot.queryParamMap.get('key');
    this.passwordForm = this.formBuilder.group({
      key: [keyParam, []],
      newPassword: ['', Validators.required],
      newPasswordConfirm: ['', Validators.required],
    });
  }

  submit() {
    this.error = null
    this.userService.initPassword(this.passwordForm.value).subscribe(e => {
        console.log("success")
      this.success = true;
      },
      error => {
        console.log(error)
        this.error = error.error.error;
      })

  }

}
