import { Component, OnInit, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { User } from '../module';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss']
})
export class AuthenticationComponent implements OnInit {

  user: User = {
    id: -1,
    firstName: "",
    lastName: "",
    address: "",
    dob: "",
    dep: "",
    email: "",
    role: "",
    materials: {},
    courses: {}
  };



  constructor(@Inject(AuthService) private authService: AuthService, private router: Router, private httpClient: HttpClient) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    console.log(form.value);
    const email = form.value['email'];
    const password = form.value['password'];
    this.authService.setIsAuth(true);
    this.getUser(email)
    localStorage.setItem('email', email);
    this.router.navigate(['/']);
  }

  goToRegistration() {
    this.router.navigate(['/registration']);
  }

  getUser(email: string) {
    this.httpClient.get<any>(`http://localhost:2000/api/users/${email}`)
      .subscribe(
        response => {
          this.user = response;
          localStorage.setItem('user', JSON.stringify(this.user));
        }
      )
  }

}
