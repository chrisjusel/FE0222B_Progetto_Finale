import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule} from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SignupComponent } from './components/signup/signup.component';
import {MatSelectModule} from '@angular/material/select';
import { HomeComponent } from './components/home/home.component';
import { UsersComponent } from './users/users.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import { ClientsComponent } from './components/clients/clients.component';
import {MatGridListModule} from '@angular/material/grid-list';
import { BillingsComponent } from './components/clients/billings/billings.component';
import { ModifyClientComponent } from './components/clients/modify-client/modify-client.component';
import { GlobalBillingsComponent } from './components/global-billings/global-billings.component';
import { ModifyBillingComponent } from './components/modify-billing/modify-billing.component';
import { NewBillingComponent } from './components/clients/billings/new-billing/new-billing.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { PreviousRouteService } from './services/previous-route.service';
import { ChartLineComponent } from './components/chart-line/chart-line.component';
import { NgChartsModule } from 'ng2-charts';
import { ChartPieComponent } from './components/chart-pie/chart-pie.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    DashboardComponent,
    SignupComponent,
    HomeComponent,
    UsersComponent,
    ClientsComponent,
    DashboardComponent,
    BillingsComponent,
    ModifyClientComponent,
    GlobalBillingsComponent,
    ModifyBillingComponent,
    NewBillingComponent,
    ChartLineComponent,
    ChartPieComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    HttpClientModule,
    MatSelectModule,
    MatPaginatorModule,
    MatTableModule,
    MatGridListModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgChartsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    {
      provide : APP_INITIALIZER, useFactory : initFunction, deps: [PreviousRouteService] , multi : true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function initFunction(config : PreviousRouteService)
{
  return ()=> config.previousRoute();
}
