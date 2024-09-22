// import { Routes } from '@angular/router';
// //components
// import { LoginComponent } from './components/login/login.component';
// import { DashboardComponent } from './components/dashboard/dashboard.component';
// import { RegisterComponent } from './components/register/register.component';
// import { authGuard } from './interceptors/auth.guard';


// export const routes: Routes = [
//     { path: '', redirectTo:'login', pathMatch: 'full' },
//     { path: 'login', component: LoginComponent},
//     { path: 'register', component: RegisterComponent },
//     { path: 'dashboard', component: DashboardComponent },
//     { path: '**', redirectTo:'login', pathMatch: 'full' }
// ];

import { Routes } from '@angular/router';
// Components
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './layout/dashboard/dashboard.component';
import { RegisterComponent } from './components/register/register.component';
import { authGuard } from './interceptors/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent, canActivate: [authGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] }, // Protección con el guard
  { path: '**', redirectTo: 'login', pathMatch: 'full' }
];