import { Component } from '@angular/core';
import { ThemeService } from '../../services/theme.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../auth/auth';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})
export class Header {
  websiteName = 'Personalized News Aggregator';
  searchQuery: string = '';
  isMenuOpen = false;   // ✅ responsive menu state
query: any;

  constructor(
    public auth: AuthService,
    public theme: ThemeService,
    private router: Router
  ) {}

  // 🔎 search handler
  onSearch() {
    if (this.searchQuery.trim()) {
      this.router.navigate(['/search'], { queryParams: { q: this.searchQuery } });
      this.searchQuery = '';
      this.isMenuOpen = false; // ✅ close mobile menu after search
    }
  }

  // 🌗 theme toggle
  toggleTheme() {
    this.theme.toggleTheme();
  }

  // 📱 mobile menu toggle
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  // 🚪 logout
  logout() {
    this.auth.logout();
    this.isMenuOpen = false; // ✅ close menu
    this.router.navigate(['/login']);
  }

  // 📌 navigation click → auto close on mobile
  closeMenu() {
    this.isMenuOpen = false;
  }
}
