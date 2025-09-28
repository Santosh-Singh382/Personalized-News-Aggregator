import { Component } from '@angular/core';
import { AuthService } from '../auth';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {
  user = { email: '', password: '' };
  message = '';

  constructor(private authService: AuthService, private router: Router) {}

  login(form: any) {
    if (!form.valid) {
      this.message = 'Please enter email and password!';
      return;
    }

    this.authService.login(this.user).subscribe(
      res => {
        if (res.token) {
          localStorage.setItem('token', res.token);
          localStorage.setItem('role', res.role);
          localStorage.setItem('userId', res.userId);
          this.router.navigate(['/'])
        }
        this.message = res.message;
      },
      err => {
        this.message = err.error?.message || 'Login failed!';
      }
    );
  }
}
