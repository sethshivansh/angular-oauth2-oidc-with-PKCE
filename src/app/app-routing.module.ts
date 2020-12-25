import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './public/home/home.component';
// import {AuthenticationService} from './core/auth/authentication.service';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    pathMatch:'full',
  },
  {
    path: 'home',
    component: HomeComponent
  },
  { path: 'extras', loadChildren: () => import('./dashboard-forced/dashboard-forced.module').then(m => m.DashboardForcedModule) },
  { path: '**', redirectTo:'login' },
//   {
//    path: 'my-profile',
//    loadChildren: () =>
//   import('./profile/profile.module').then((m) => m.ProfileModule),
//   // canActivate: [AuthenticationService]
//  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}