import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import axios from 'axios';
import { CustomvalidationService } from '../services/customvalidation.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  email = '';
  password = '';

  // emailPattern = "^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$";

  form: FormGroup = new FormGroup({});

  constructor(
    private fb: FormBuilder,
    private customValidator: CustomvalidationService
  ) {}

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
      .post('http://localhost:3000/login', this.form.value)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
    // console.log(this.form.value);
  }
}
