import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthenticationComponent } from './components/authentication/authentication.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { SingleCourseComponent } from './components/single-course/single-course.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { CoursesComponent } from './components/courses/courses.component';
import { ProfileComponent } from './components/profile/profile.component';
import { MainComponent } from './components/main/main.component';
import { MycourseComponent } from './components/mycourse/mycourse.component';


const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: '', component: MainComponent},
      { path: 'courses', component: CoursesComponent},
      { path: 'my-course', component: MycourseComponent},
      { path: 'profile', component: ProfileComponent},
      { path: 'course/:id', component: SingleCourseComponent},
    ]
  },
  {
    path: 'login',
    component: AuthenticationComponent,
  },
  {
    path: 'registration',
    component: RegistrationComponent,
  },
  {
    path: "**",
    component: PageNotFoundComponent
  }

  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
