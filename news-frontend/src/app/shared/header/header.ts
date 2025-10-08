import { Component } from '@angular/core';
import { ThemeService } from '../../services/theme.service';
import { CommonModule, NgIf, NgFor } from '@angular/common';  // ✅ add NgIf, NgFor
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../auth/auth';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    NgIf,        // ✅ explicitly imported
    NgFor        // (optional, if you ever use *ngFor)
  ],
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})
export class Header {
  websiteName = 'Personalized News Aggregator';
  searchQuery: string = '';
  isMenuOpen = false;
  query: any;

  constructor(
    public auth: AuthService,
    public theme: ThemeService,
    private router: Router
  ) {}

  onSearch() {
    if (this.searchQuery.trim()) {
      this.router.navigate(['/search'], { queryParams: { q: this.searchQuery } });
      this.searchQuery = '';
      this.isMenuOpen = false;
    }
  }

  toggleTheme() {
    this.theme.toggleTheme();
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  logout() {
    this.auth.logout();
    this.isMenuOpen = false;
    this.router.navigate(['/login']);
  }

  closeMenu() {
    this.isMenuOpen = false;
  }
}
