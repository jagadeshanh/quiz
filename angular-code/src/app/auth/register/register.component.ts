import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import axios from 'axios';
import { CustomvalidationService } from '../services/customvalidation.service';
// Import service from the library
import { ToastEvokeService } from '@costlydeveloper/ngx-awesome-popup';
import { AuthService } from 'src/app/helpers/auth.service';
import { Router, CanActivate } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  name = '';
  email = '';
  phone = '';
  password = '';
  confirmPassword = '';

  users = [];
  errors = [];

  // phonePattern = "^((\\+91-?)|0)?[0-9]{10}$";
  // emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";

  // phonePattern = "/^(?:(?:\\+|0{0,2})91(\\s*[\\-]\\s*)?|[0]?)?[789]\\d{9}$/gm";
  // emailPattern = "^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$";

  form: FormGroup = new FormGroup({});

  constructor(
    private fb: FormBuilder,
    private customValidator: CustomvalidationService,
    private toastEvokeService: ToastEvokeService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.form = this.fb.group(
      {
        name: ['', Validators.required],
        phone: [
          '',
          Validators.compose([
            Validators.required,
            this.customValidator.phoneValidator(),
          ]),
        ],
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
        confirmPassword: ['', [Validators.required]],
      },
      {
        validator: this.customValidator.MatchPassword(
          'password',
          'confirmPassword'
        ),
      }
    );
    this.submit();
  }

  get formControl() {
    return this.form.controls;
  }

  submit() {
    axios
      .post('http://localhost:3000/api/register', this.form.value)
      .then((response) => {
        this.users = response.data;
        this.reset();
        this.toastEvokeService
          .info('Registeration 🦾', 'User Registered Successfully!')
          .subscribe((res) => {
            this.authService.login();
            this.router.navigate(['/login']);
          });
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  reset() {
    this.form.reset({
      name: this.name,
      email: this.email,
      phone: this.phone,
    });
  }
}
