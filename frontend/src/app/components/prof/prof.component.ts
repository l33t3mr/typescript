import { Component, OnInit } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { HttpClient } from '@angular/common/http';
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
    this.httpClient.get<any>(`http://localhost:3000/api/materialContents`).subscribe(
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
this.httpClient.delete<any>(`http://localhost:3000/api/materials/${materialId}`)
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
