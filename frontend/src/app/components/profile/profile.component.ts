import { NgForm, FormControl, FormGroup } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../module';
import { NbToastrService } from '@nebular/theme';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  toggleNgModel = false;
  user: any;
  patchError = false;
  error: any;

  constructor(private httpClient: HttpClient, private toastrService: NbToastrService,
    private router: Router) { }

  ngOnInit(): void {
    this.user = localStorage.getItem('user');
    this.user = JSON.parse(this.user);
  }


  onSubmit(form: NgForm) {
    this.updateUser(this.user);
  }

  updateUser(user: User) {
    let token = localStorage.getItem('token');
    const requestOptions = {
      headers: new HttpHeaders({ 'Authorization': token ? JSON.parse(token) : "no token found" })
    };
    this.httpClient.patch<any>(`http://localhost:3000/api/users/${user.id}`, user, requestOptions).subscribe(

      (resp) => {
        status = 'success';
        this.toastrService.show("update ", `message hier `, { status });
        this.router.navigate(['/']);
      },
      (err) => {
        this.patchError = true;
        this.error = err;
        status = 'danger';
        this.toastrService.show("Fehler", err, { status });
      });

  }
}
