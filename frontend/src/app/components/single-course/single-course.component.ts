import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NbDialogService } from '@nebular/theme';
import { MainComponent } from '../main/main.component';

@Component({
  selector: 'app-single-course',
  templateUrl: './single-course.component.html',
  styleUrls: ['./single-course.component.scss']
})
export class SingleCourseComponent implements OnInit {

  pathUrl: string = "http://www.archeonavale.org/pdf/cordeliere/test.pdf";
  materials

  constructor(private route: ActivatedRoute, private httpClient: HttpClient,
    private dialogService: NbDialogService) { }

  pdfSrc = "https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf";

  ngOnInit(): void {
    let token = localStorage.getItem('token');
    const requestOptions = {
      headers: new HttpHeaders({ 'Authorization': token ? JSON.parse(token) : "no token found" })
    };
    this.httpClient.get<any>(`http://localhost:3000/api/courses/${this.route.snapshot.params.id}`, requestOptions)
      .subscribe(
        response => {
          this.materials = response.materials;
        },
        error => {
        }
      )

  }
  getPDF(data) {
    return 'data:application/pdf;base64,' + data;
  }
  open(dialog: TemplateRef<any>, idMatriel) {
    let token = localStorage.getItem('token');
    const requestOptions = {
      headers: new HttpHeaders({
         'Authorization': token ? JSON.parse(token) : "no token found",
         'responseType'  : 'arraybuffer' as 'json'
        })
    };
    this.httpClient.get<any>(`http://localhost:3000/api/materialContents/${idMatriel}`, requestOptions)
      .subscribe(
        response => {
          let file = new Blob([response.data.content.data], { type: 'application/pdf' });
          this.pathUrl = window.URL.createObjectURL(file);
          // window.open(this.pathUrl);

          //this.pathUrl = response.data.content.data;
          //this.pathUrl = this.getPDF( response.data.content.data)

          //this.pdfSrc = response.data.content.data
        },
        error => {
        }
      )

    this.dialogService.open(dialog, { context: 'this is some additional data passed to dialog' });
    //this.pathUrl =  'https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf';
  }

  change(path) {
    var ifrm = document.createElement("iframe");
    ifrm.setAttribute("src", path);
    ifrm.style.width = "640px";
    ifrm.style.height = "480px";
    document.body.appendChild(ifrm);
  }

}
