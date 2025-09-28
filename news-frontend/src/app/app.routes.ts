import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// News


// Auth
import { Login } from './auth/login/login';
import { Register } from './auth/register/register';
import { Profile } from './auth/profile/profile';

//import { AdminDashboard } from './auth/admin/admin-dashboard';

// Guard
import { AdminGuard } from './auth/auth.guard';
import { AdminDashbosrd } from './auth/admin/admin-dashbosrd/admin-dashbosrd';
import { FactcheckSidebar } from './news/factcheck-sidebar/factcheck-sidebar';
import { PerspectiveSwitcher } from './news/perspective-switcher/perspective-switcher';
import { NewsList } from './news/news-list/news-list';
import { About } from './about/about';
import { World } from './world/world';
import { Entertainment } from './entertainment/entertainment';
import { Technology } from './technology/technology';
import { Poltics } from './poltics/poltics';
import { Sports } from './sports/sports';
import { Livenews } from './livenews/livenews';

export const routes: Routes = [
  { path: '', component: NewsList, pathMatch: 'full' },
  { path: 'category/:category', component: NewsList },
  { path: 'factcheck/:id', component: FactcheckSidebar },
  { path: 'perspective', component: PerspectiveSwitcher },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'profile', component: Profile },
  { path: 'admin', component: AdminDashbosrd, canActivate: [AdminGuard] },
  { path: 'livenews', component: Livenews },
  { path: 'world', component: World },
  { path: 'entertainment', component: Entertainment },
  { path: 'technology', component: Technology },
  { path: 'politics', component: Poltics },
  { path: 'sports', component: Sports},
  { path: 'about', component: About },

  // Wildcard fallback
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
