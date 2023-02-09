import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import axios from 'axios';
import { CustomvalidationService } from '../services/customvalidation.service';
// Import service from the library
import { ToastEvokeService } from '@costlydeveloper/ngx-awesome-popup';
import { AuthService } from 'src/app/helpers/auth.service';
import { Router, CanActivate } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  email = '';
  password = '';
  users = [];

  // emailPattern = "^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$";

  form: FormGroup = new FormGroup({});

  constructor(
    private fb: FormBuilder,
    private customValidator: CustomvalidationService,
    private toastEvokeService: ToastEvokeService,
    private authService: AuthService,
    private router: Router
  ) {
    if (this.authService.loggedIn) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.form = this.fb.group(
      {
        email: [
          '',
          Validators.compose([
            Validators.required,
            this.customValidator.emailValidator(),
          ]),
        ],
        password: [
          '',
          Validators.compose([
            Validators.required,
            this.customValidator.patternValidator(),
          ]),
        ],
      },
      {
        validator: this.customValidator.MatchPassword(
          'password',
          'confirmPassword'
        ),
      }
    );
  }

  get formControl() {
    return this.form.controls;
  }

  submit() {
    axios
      .post('http://localhost:3000/api/login', this.form.value)
      .then((response) => {
        this.users = response.data;
        this.toastEvokeService
          .success('Login 🦾', 'User Login Successfully!')
          .subscribe((res) => {
            this.authService.login();
            this.router.navigate(['/home']);
            console.log('Hello Home', res);
          });
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    // console.log(this.form.value);
  }
}
