import { Component, OnInit, HostBinding, ViewChild, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { NbToastrService, NbDialogRef, NbIconConfig, NbDialogService } from '@nebular/theme';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {

  courses : any[] = []
  user: any;

  constructor(private router: Router, private toastrService: NbToastrService,
    private  dialogService: NbDialogService,
     private httpClient: HttpClient
) { 
  }

  ngOnInit(): void {
    this.user = localStorage.getItem('user');
    this.user = JSON.parse(this.user);
    this.httpClient.get<any>(`http://localhost:3000/api/courses`)
      .subscribe(
        response => {
            this.courses = Object.keys(response).map(function(index){
              let course = response[index];
              return course;
            });
        },
        error => {
          status = 'danger';
          this.toastrService.show("Fehler", `Problem beim Laden der Daten`, { status });
        }
    )
  }
  addCourse(courseId : any){

    this.httpClient.post<any>(`http://localhost:3000/api/courses/${courseId}/students/${this.user.id}`, {})
      .subscribe(
        response => {
                status = 'success';
                this.toastrService.show("Anmelden", `course wurde angemeldet`, { status });
                this.router.navigate(['/my-course']);
                
        },
        error => {
          status = 'danger';
          this.toastrService.show("Fehler", `Problem beim Entfernen der course`, { status });
        }
      )

  }



}
