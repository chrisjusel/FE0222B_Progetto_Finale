import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { AuthGuard } from './guards/auth.guard';
import { UsersComponent } from './users/users.component';
import { ClientsComponent } from './components/clients/clients.component';
import { BillingsComponent } from './components/clients/billings/billings.component';
import { ModifyClientComponent } from './components/clients/modify-client/modify-client.component';
import { GlobalBillingsComponent } from './components/global-billings/global-billings.component';
import { ModifyBillingComponent } from './components/modify-billing/modify-billing.component';
import { NewBillingComponent } from './components/clients/billings/new-billing/new-billing.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'users',
    component: UsersComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'clients',
    component: ClientsComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: ':id',
        component: ModifyClientComponent
      },
    ]
  },
  {
    path: 'billings',
    component: GlobalBillingsComponent,
    children: [
      {
        path: ':id',
        component: ModifyBillingComponent
      },
      {
        path: 'client-billings/:id',
        component: BillingsComponent
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
