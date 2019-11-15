import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuardService } from './shared/guard/auth-guard.service';
import { LoginPageComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';


const routes: Routes = [
  { path: "login", component: LoginPageComponent },
  { path: "", pathMatch: "full", redirectTo: "/dashboard" , canActivate: [AuthGuardService]},
  { path: "dashboard",  component: DashboardComponent, canActivate: [AuthGuardService] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
