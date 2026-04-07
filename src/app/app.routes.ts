import { Routes } from '@angular/router';
import { VoterLogin } from './components/voter-login/voter-login';
import { VoterDashboard } from './components/voter-dashboard/voter-dashboard';

export const routes: Routes = [
  { 
    path: 'login', 
    component: VoterLogin 
  },
  { 
    path: 'dashboard', 
    component: VoterDashboard 
  },
  { 
    path: '', 
    redirectTo: '/login', 
    pathMatch: 'full' 
  },
  { 
    path: '**', 
    redirectTo: '/login' 
  }
];