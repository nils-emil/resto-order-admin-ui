import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./pages/login/login.component";
import {AdminComponent} from "./pages/admin/admin.component";
import {MenuListComponent} from "./pages/menu-list/menu-list.component";
import {TableManagementComponent} from "./pages/table-management/table-management.component";
import {PasswordComponent} from "./pages/password/password.component";
import {AccessComponent} from "./pages/access/access.component";
import {MenuComponent} from "./components/menu/menu.component";
import {PasswordInitComponent} from "./pages/password-init/password-init.component";
import {AuthGuard} from "./guard/auth.guard";

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'init', component: PasswordInitComponent},
  {
    path: '',
    component: MenuComponent,
    canActivate: [AuthGuard],
    children: [
      {path: 'password', component: PasswordComponent},
      {path: 'access', component: AccessComponent},
      {path: 'menu', component: MenuListComponent},
      {path: 'tables', component: TableManagementComponent},
      {path: '', component: AdminComponent}
    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
