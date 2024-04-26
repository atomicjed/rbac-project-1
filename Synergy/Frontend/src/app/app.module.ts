import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AngularFireModule} from "@angular/fire/compat";
import {environment} from "../environments/environment";
import {JwtInterceptorService} from "./services/interceptor/jwt-interceptor.service";
import {SharedComponentsModule} from "./shared-components/shared-components.module";
import {LayoutModule} from "./features/layout/layout.module";
import {AuthModule} from "./features/auth/auth.module";
import {ServicesModule} from "./services/services.module";
import {HomePageModule} from "./features/home-page/home-page.module";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    SharedComponentsModule,
    ServicesModule,
    AuthModule,
    LayoutModule,
    HomePageModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptorService,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
