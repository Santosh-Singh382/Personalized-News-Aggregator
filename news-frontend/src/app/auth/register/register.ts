import { Component } from '@angular/core';
import { AuthService } from '../auth';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class Register {
  user = { username: '', email: '', password: '' };
  message = '';

  constructor(private authService: AuthService, private router: Router) {}

  register(form: any) {
    if (!form.valid) {
      this.message = 'Please fill all fields correctly!';
      return;
    }

    this.authService.register(this.user).subscribe(
      res => {
        this.message = res.message;  // ✅ read JSON message
        if (res.message.includes('successfully')) {
          this.router.navigate(['/login']);
        }
      },
      err => {
        this.message = err.error?.message || 'Registration failed!';
      }
    );
  }
}
