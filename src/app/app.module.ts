import { TokenInterceptorService } from './shared/services/token-interceptor.service';
import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginComponent } from './auth/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from '../app/shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ResetPasswordComponent } from './auth/reset-password/reset-password/reset-password.component';
import { SendRequestComponent } from './auth/reset-password/send-request/send-request.component';
import { RegisterComponent } from './auth/register/register.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatOptionModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { AgmCoreModule } from '@agm/core';
import { AgmDirectionModule } from 'agm-direction';
import { CoreComponent } from './core/core.component';
import { NavComponent } from './core/nav/nav.component';
import { FooterComponent } from './core/footer/footer.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DatePipe } from '@angular/common';
import { ProfileMenuComponent } from './core/menus/profile-menu/profile-menu.component';
import { MyProfileMenuComponent } from './core/menus/my-profile-menu/my-profile-menu.component';
import { MeComponent } from './me/me/me.component';
import { MyProfileHomeComponent } from './core/my-profile-home/my-profile-home.component';
import { ConfirmationComponent } from './shared/dialogs/confirmation/confirmation.component';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { RightMenuComponent } from './core/menus/right-menu/right-menu.component';
import { JobNavComponent } from './core/nav/job-nav/job-nav.component';
import { QuillModule } from 'ngx-quill';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { ChartsModule } from 'ng2-charts';
import { CouponCodeComponent } from './shared/dialogs/coupon-code/coupon-code.component';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { NotConnectedNavComponent } from './core/nav/not-connected-nav/not-connected-nav.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { TestComponent } from './test/test.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ResetPasswordComponent,
    SendRequestComponent,
    RegisterComponent,
    CoreComponent,
    NavComponent,
    FooterComponent,
    ProfileMenuComponent,
    MyProfileMenuComponent,
    MeComponent,
    MyProfileHomeComponent,
    ConfirmationComponent,
    RightMenuComponent,
    JobNavComponent,
    CouponCodeComponent,
    NotConnectedNavComponent,
    TestComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    SharedModule,
    NgbModule,
    MatToolbarModule,
    ReactiveFormsModule, 
    FormsModule,
    MatOptionModule,
    MatInputModule,
    MatSelectModule,
    AgmCoreModule.forRoot({ // @agm/core
      apiKey: 'AIzaSyDcFRKP7AWpsC5saNKrqsYsOLmWx_b_Vrw',
      libraries: ['places']
    }),
    AgmDirectionModule,
    FlexLayoutModule,
    QuillModule.forRoot(),
    InfiniteScrollModule,
    ChartsModule,
    NgxMatSelectSearchModule,
    MatSnackBarModule
  ],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'fr-FR'},
    {provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } },
    DatePipe,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
