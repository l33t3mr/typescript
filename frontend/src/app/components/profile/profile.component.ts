import { NgForm, FormControl, FormGroup } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../module';

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

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.user = localStorage.getItem('user');
    this.user = JSON.parse(this.user);
  }


  onSubmit(form: NgForm) {
    this.updateUser(this.user);
  }

  updateUser(user: User) {
      this.httpClient.patch<any>(`http://localhost:2000/api/users/${user.id}`, user).subscribe(null, (err) => {
        this.patchError = true;
        this.error = err;
        console.log(err)
      });

  }
}
