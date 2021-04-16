import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {MatButtonModule} from '@angular/material/button';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http'
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LoginComponent} from './pages/login/login.component';
import {MatInputModule} from "@angular/material/input";
import {AdminComponent} from './pages/admin/admin.component';
import {MenuListComponent} from './pages/menu-list/menu-list.component';
import {SocketIoConfig, SocketIoModule} from 'ngx-socket-io';
import {CommonModule} from '@angular/common';
import {MatSortModule} from "@angular/material/sort";
import {MatTableModule} from "@angular/material/table";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatMenuModule} from "@angular/material/menu";
import {TableManagementComponent} from './pages/table-management/table-management.component';
import {AccessComponent} from './pages/access/access.component';
import {PasswordComponent} from './pages/password/password.component';
import {MatDividerModule} from "@angular/material/divider";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatDialogModule} from "@angular/material/dialog";
import {EditPersonComponent} from './pages/access/edit-person/edit-person.component';
import {AddTableComponent} from './pages/table-management/add-table/add-table.component';
import {DeleteModalConfirmationComponent} from './components/delete-modal-confirmation/delete-modal-confirmation.component';
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatSelectModule} from "@angular/material/select";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatCardModule} from "@angular/material/card";
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {AuthTokenInterceptor} from "./interceptor/auth-token.interceptor";
import {EditMenuItemComponent} from './components/edit-menu-item/edit-menu-item.component';
import {ImageCropperModule} from 'ngx-image-cropper';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {AddNewCategoryModalComponent} from './components/add-new-category-modal/add-new-category-modal.component';
import {ViewOrderDetailsComponent} from './components/view-order-details/view-order-details.component';
import {AccessEditModalComponent} from './components/access-edit-modal/access-edit-modal.component';
import {ScrollingModule} from "@angular/cdk/scrolling";
import {environment} from "../environments/environment";
import {MenuComponent} from './components/menu/menu.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { LoadingScreenComponent } from './components/loading-screen/loading-screen.component';
import { PasswordChangeComponent } from './pages/password-change/password-change.component';
import { PasswordInitComponent } from './pages/password-init/password-init.component';

const config: SocketIoConfig = {url: environment.socket_url, options: {}};


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminComponent,
    MenuListComponent,
    TableManagementComponent,
    AccessComponent,
    PasswordComponent,
    EditPersonComponent,
    AddTableComponent,
    DeleteModalConfirmationComponent,
    EditMenuItemComponent,
    AddNewCategoryModalComponent,
    ViewOrderDetailsComponent,
    AccessEditModalComponent,
    MenuComponent,
    LoadingScreenComponent,
    PasswordChangeComponent,
    PasswordInitComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    MatToolbarModule,
    MatCardModule,
    MatGridListModule,
    MatIconModule,
    MatMenuModule,
    MatProgressBarModule,
    MatSidenavModule,
    MatDialogModule,
    MatDividerModule,
    ImageCropperModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatSlideToggleModule,
    MatButtonModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    MatSortModule,
    MatTableModule,
    SocketIoModule.forRoot(config),
    FormsModule,
    MatSelectModule,
    ScrollingModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthTokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
