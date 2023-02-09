import { Component } from '@angular/core';
import axios from 'axios';
import { ToastEvokeService } from '@costlydeveloper/ngx-awesome-popup';
import { AuthService } from 'src/app/helpers/auth.service';
import { Router, CanActivate } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  userName = 'Anu';

  constructor(
    private toastEvokeService: ToastEvokeService,
    private authService: AuthService,
    private router: Router
  ) {}

  logout() {
    axios.post('/api/logout').then((res) => {
      // Remove the user data from local storage
      console.log(res);
      this.authService.logout();
      this.toastEvokeService
        .success('LogOut 🦾', 'User Logout Successfully!')
        .subscribe((res) => {
          this.authService.logout();
          this.router.navigate(['/register']);
          console.log('Hello Logout', res);
        });

      // Redirect the user to the login page
      this.router.navigate(['/login']);
    });
  }
}
