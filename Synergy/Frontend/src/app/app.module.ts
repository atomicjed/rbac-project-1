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
import {RegisterTeamModule} from "./features/register-team/register-team.module";
import {NgxsModule} from "@ngxs/store";
import {NgxsReduxDevtoolsPluginModule} from "@ngxs/devtools-plugin";
import {UserState} from "./store/states/user.state";
import { TeamHomePageComponent } from './features/team-pages/team-home-page/components/team-home-page/team-home-page.component';
import {TeamPagesModule} from "./features/team-pages/team-pages.module";
import {TeamsState} from "./store/states/teams.state";
import { provideFirestore, getFirestore} from "@angular/fire/firestore";
import {AngularFirestoreModule} from "@angular/fire/compat/firestore";

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
    TeamPagesModule,
    RegisterTeamModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    provideFirestore(() => getFirestore()),
    NgxsModule.forRoot([UserState, TeamsState]),
    NgxsReduxDevtoolsPluginModule.forRoot(),
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
