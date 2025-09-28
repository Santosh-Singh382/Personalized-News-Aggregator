import { Component, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Footer } from "./shared/footer/footer";
import { Header } from "./shared/header/header";
//import { FactcheckSidebar } from "./news/factcheck-sidebar/factcheck-sidebar";
//import { RouterOutlet_1 as RouterOutlet } from "../../node_modules/@angular/router/router_module.d";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Footer, Header],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('news-frontend');

  constructor(private router: Router) {}

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  isAdmin(): boolean {
    return localStorage.getItem('role') === 'ADMIN';
  }

  getUserId(): string | null {
    return localStorage.getItem('userId');
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}

