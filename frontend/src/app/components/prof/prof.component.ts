import { Component, OnInit, TemplateRef , AfterViewInit} from '@angular/core';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import {NgForm} from "@angular/forms";


@Component({
  selector: 'app-prof',
  templateUrl: './prof.component.html',
  styleUrls: ['./prof.component.scss']
})
export class ProfComponent implements OnInit, AfterViewInit {
  //@ViewChild('closeIcon') closeIcon: ElementRef ;

  constructor(    private router: Router,
    private toastrService: NbToastrService,
    private httpClient: HttpClient,
    private dialogService: NbDialogService) { }

  ngAfterViewInit(): void {
    //console.log(this.closeIcon.nativeElement.value);

  }

  materials:any[] = [];
  user: any;
  myCourses:any
  ngOnInit(): void {
    this.user = localStorage.getItem('user');
    this.user = JSON.parse(this.user);
    let token = localStorage.getItem('token');
    const requestOptions = {
      headers: new HttpHeaders({'Authorization': token ? JSON.parse(token) : "no token found"})
    };
    this.httpClient.get<any>(`http://localhost:3000/api/materials`, requestOptions).subscribe(
        response => {
            this.materials = response.data
          },
        error => {
          status = 'danger';
          this.toastrService.show("Fehler", `Problem`, { status });
        }
      )
  }

  deleteMaterial(materialId: any){
    let token = localStorage.getItem('token');
    const requestOptions = {
      headers: new HttpHeaders({'Authorization': token ? JSON.parse(token) : "no token found"})
    };
    this.httpClient.delete<any>(`http://localhost:3000/api/materials/${materialId}`, requestOptions)
      .subscribe(
        response => {
                status = 'success';
                this.toastrService.show("Löschen", `material wurde gelöscht`, { status });
                this.ngOnInit();
        },
        error => {
          status = 'danger';
          this.toastrService.show("Fehler", `Problem`, { status });
        }
      )
  }

  open(dialog: TemplateRef<any>, materialId: any) {
    this.user = localStorage.getItem('user');
    this.user = JSON.parse(this.user);
    let token = localStorage.getItem('token');
    const requestOptions = {
      headers: new HttpHeaders({'Authorization': token ? JSON.parse(token) : "no token found"})
    };
    this.httpClient.get<any>(`http://localhost:3000/api/users/${this.user.id}`, requestOptions)
      .subscribe(
        response => {
          this.myCourses = response.user.courses;
          this.dialogService.open(dialog, { context: {mycourses: this.myCourses , materialId : materialId}  });

        },
        error => {
          status = 'danger';
          this.toastrService.show( `Problem beim Laden der Daten`,"Fehler", { status });
        }
      )
  }
  onSubmit(form: NgForm, materialId: any){
    let token = localStorage.getItem('token');
    const requestOptions = {
      headers: new HttpHeaders({'Authorization': token ? JSON.parse(token) : "no token found"})
    };
    for (const [key, value] of Object.entries(form.value )) {
      if(value){
        this.httpClient.post<any>(`http://localhost:3000/api/courses/${key}/materials/${materialId}`, null, requestOptions)
          .subscribe(
            response => {
            },
            error => {
              status = 'danger';
              this.toastrService.show("Fehler", `Problem beim Hinzufügen der Material`, { status });
            }
          )
      }
    }
  }


  add(dialog: TemplateRef<any>) {
    this.user = localStorage.getItem('user');
    this.user = JSON.parse(this.user);
    let token = localStorage.getItem('token');
    const requestOptions = {
      headers: new HttpHeaders({'Authorization': token ? JSON.parse(token) : "no token found"})
    };
    this.dialogService.open(dialog, { context: {mycourses: this.myCourses , materialId : "555"}  });

    /*this.httpClient.get<any>(`http://localhost:3000/api/users/${this.user.id}`, requestOptions)
      .subscribe(
        response => {
          this.myCourses = response.user.courses;
          this.dialogService.open(dialog, { context: {mycourses: this.myCourses , materialId : materialId}  });

        },
        error => {
          status = 'danger';
          this.toastrService.show( `Problem beim Laden der Daten`,"Fehler", { status });
        }
      )*/
  }

  fileChange(event) {
    let fileList: FileList = event.target.files;
    if(fileList.length > 0) {
      let file: File = fileList[0];
        let formData:FormData = new FormData();
       formData.append('file', file, file.name);
      let token = localStorage.getItem('token');
      const requestOptions = {
        headers: new HttpHeaders({'Authorization': token ? JSON.parse(token) : "no token found"})
      };

      this.httpClient.post(`http://localhost:3000/api/materials/${this.user.id}`, formData, requestOptions)
        .subscribe(
          data => {
            status = 'success';
            this.toastrService.show( `Material wurde Hinzufügen`,"create Material", { status });
            this.ngOnInit();
            //this.closeIcon.nativeElement.click();

          },
          error => console.log(error)
        )
    }
  }


}
