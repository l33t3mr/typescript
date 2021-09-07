import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-mycourse',
  //changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './mycourse.component.html',
  styleUrls: ['./mycourse.component.scss']
})
export class MycourseComponent implements OnInit {

  numbers : any[] = []
  myCourses 

  user : any;
  constructor(
    private router: Router,
    private toastrService: NbToastrService,
    private httpClient: HttpClient
  ) {       
    
  }

  ngOnInit(): void {
    this.user = localStorage.getItem('user');
    this.user = JSON.parse(this.user);
    let token = localStorage.getItem('token')
    const requestOptions = {                                                                                                                                                                                 
      headers: new HttpHeaders({'Authorization': token ? JSON.parse(token) : "no token found"})
    };
    this.httpClient.get<any>(`http://localhost:3000/api/users/${this.user.id}`, requestOptions)
      .subscribe(
        response => {
          this.myCourses = response.user.courses;
          console.log(this.myCourses)
          
        },
        error => {
          status = 'danger';
          this.toastrService.show("Fehler", `Problem beim Laden der Daten`, { status });
        }
      )
  }

  sigleCourse(n: any){
    this.router.navigate(['/course/'+n]);
  }

  abmelden(e: any, courseId:any){
    e.stopPropagation();
    let token = localStorage.getItem('token');
    const requestOptions = {                                                                                                                                                                                 
      headers: new HttpHeaders({'Authorization': token ? JSON.parse(token) : "no token found"})
    };
    this.httpClient.delete<any>(`http://localhost:3000/api/courses/${courseId}/students/${this.user.id}`, requestOptions)
      .subscribe(
        response => {
                status = 'success';
                this.toastrService.show("Abmelden", `course wurde abgemeldet`, { status });
                this.ngOnInit();
        },
        error => {
          status = 'danger';
          this.toastrService.show("Fehler", `Problem beim Entfernen der course`, { status });
        }
      )
  }

  deleteCourse(e: any, courseId : any){

      e.stopPropagation();
      let token = localStorage.getItem('token');
      const requestOptions = {                                                                                                                                                                                 
        headers: new HttpHeaders({'Authorization': token ? JSON.parse(token) : "no token found"})
      };
      this.httpClient.delete<any>(`http://localhost:3000/api/courses/${courseId}`,requestOptions)
      .subscribe(
        response => {
                status = 'success';
                this.toastrService.show("Abmelden", `course wurde abgemeldet`, { status });
                this.ngOnInit();
        },
        error => {
          status = 'danger';
          this.toastrService.show("Fehler", `Problem beim Entfernen der course`, { status });
        }
      )
  
  }

  getStatus(datum: any){
    var d = new Date(datum);

    if( d.getFullYear() < 2021) return "danger";
    return "success"
  }

  getText(datum: any){
    var d = new Date(datum);
    if( d.getFullYear() < 2021) return "vorheriges Semester";
    return "aktuelles Semester"

  }
  
  formateDate(datum: any){
    var d = new Date(datum);
    return d.getFullYear() + "-" + d.getMonth();
  }
}
