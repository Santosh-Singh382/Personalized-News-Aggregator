import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private darkMode = signal(false);
  isDarkMode = this.darkMode.asReadonly();

  toggleTheme() {
    this.darkMode.update(v => !v);

    if (this.darkMode()) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  }
}
