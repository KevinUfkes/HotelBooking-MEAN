import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { HotelsComponent } from './hotels/hotels.component';
import { SignupComponent } from './signup/signup.component';
import { CreatebookingComponent } from './createbooking/createbooking.component';
import { BookingsComponent } from './bookings/bookings.component';

import { AuthorizationGuard } from './authorization.guard';
import { LogoutComponent } from './logout/logout.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'hotels', component: HotelsComponent, canActivate:[AuthorizationGuard] } ,
  { path: 'logout', component: LogoutComponent },
  { path: 'bookings', component: BookingsComponent },
  { path: 'createbooking/:hotelId', component: CreatebookingComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
