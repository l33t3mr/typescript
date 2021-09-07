import { Component, OnInit } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-prof',
  templateUrl: './prof.component.html',
  styleUrls: ['./prof.component.scss']
})
export class ProfComponent implements OnInit {

  constructor(    private router: Router,
    private toastrService: NbToastrService,
    private httpClient: HttpClient) { }

  materials:any[] = [];

  ngOnInit(): void {
    let token = localStorage.getItem('token');
    const requestOptions = {                                                                                                                                                                                 
      headers: new HttpHeaders({'Authorization': token ? JSON.parse(token) : "no token found"})
    };
    this.httpClient.get<any>(`http://localhost:3000/api/materialContents`, requestOptions).subscribe(
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

}
