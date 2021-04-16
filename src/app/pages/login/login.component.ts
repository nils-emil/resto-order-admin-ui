import { Component, OnInit } from '@angular/core';
import {LoginService} from "../../httpservice/login.service";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../httpservice/user.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public passwordForm: FormGroup;
  public error = '';

  constructor(private loginservice: LoginService,
              private router: Router,
              private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.passwordForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login(): void {
    this.loginservice.postLogin(this.passwordForm.value)
      .subscribe(result =>  {
        localStorage.setItem('token', result.token)
        this.router.navigate(['menu']);
      })
  }

}
