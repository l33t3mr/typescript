import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthenticationComponent } from './components/authentication/authentication.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { CoursesComponent } from './components/courses/courses.component';
import { SingleCourseComponent } from './components/single-course/single-course.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NbEvaIconsModule } from '@nebular/eva-icons';
import { HeaderComponent } from './components/header/header.component';

import { HttpClientModule } from '@angular/common/http';

import { 
  NbThemeModule,
  NbLayoutModule, 
  NbCardModule, 
  NbRouteTabsetModule,
  NbTabsetModule,
  NbMenuModule,
  NbActionsModule,
  NbContextMenuModule,
  NbUserModule,
  NbAccordionModule,
  NbButtonModule,
  NbIconModule,
  NbToastrModule,
  NbGlobalPhysicalPosition,
  NbTooltipModule,
  NbBadgeModule,
  NbInputModule,
  NbToggleModule,
  NbDialogModule,
  NbDatepickerModule,
  NbAlertModule
} from '@nebular/theme';

import { FormsModule }   from '@angular/forms';
import { ProfileComponent } from './components/profile/profile.component';
import { MainComponent } from './components/main/main.component';
import { MenuComponent } from './components/menu/menu.component';
import { MycourseComponent } from './components/mycourse/mycourse.component';
import { TwoColumnLayoutComponent } from './components/two-column-layout/two-column-layout.component';
import { AuthGuard } from './services/auth-guard.service';
import { AuthService } from './services/auth.service';
import { ProfComponent } from './components/prof/prof.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    AuthenticationComponent,
    RegistrationComponent,
    CoursesComponent,
    SingleCourseComponent,
    PageNotFoundComponent,
    HeaderComponent,
    ProfileComponent,
    MainComponent,
    MenuComponent,
    MycourseComponent,
    TwoColumnLayoutComponent,
    ProfComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
     NbMenuModule.forRoot(),
    NbThemeModule.forRoot({ name: 'default' }),
    NbLayoutModule,
    NbEvaIconsModule,
    NbRouteTabsetModule,
    NbCardModule, 
    NbTabsetModule,
    NbActionsModule,
    NbIconModule,
    FormsModule,
    NbContextMenuModule,
    NbUserModule,
    NbAccordionModule,
    NbButtonModule,
    NbTooltipModule,
    NbBadgeModule,
    NbInputModule,
    NbToggleModule,
    PdfViewerModule,
    NbDialogModule.forRoot(),
    NbDatepickerModule.forRoot(),
    NbToastrModule.forRoot({
      position: NbGlobalPhysicalPosition.TOP_RIGHT,
      destroyByClick: true
    }),
    NbAlertModule,
    HttpClientModule,
  ],
  providers: [AuthGuard, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
