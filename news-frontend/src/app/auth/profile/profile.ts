import { Component, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../auth';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.html',
  styleUrls: ['./profile.css']
})
export class Profile implements OnInit {
  user: any = null;
  message = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    const userId = localStorage.getItem('userId');

    if (userId) {
      this.authService.getProfile(userId).subscribe({
        next: (data) => {
          this.user = data;
        },
        error: () => {
          this.message = '⚠️ Failed to load profile!';
        }
      });
    } else {
      this.message = '⚠️ You are not logged in!';
    }
  }

  logout(): void {
    // ✅ Clear local storage/session
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('userId');

    // ✅ Redirect to login page
    this.router.navigate(['/login']);
  }
}
