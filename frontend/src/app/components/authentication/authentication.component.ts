import { Component, OnInit, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { User } from '../module';
import { HttpClient } from '@angular/common/http';
import { NbToastrService } from '@nebular/theme';

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



  constructor(@Inject(AuthService) private authService: AuthService,
    private router: Router,
    private httpClient: HttpClient,
    private toastrService: NbToastrService
    ) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    const email = form.value['email'];
    const password = form.value['password'];
    this.getUser(email, password)
    
  }

  goToRegistration() {
    this.router.navigate(['/registration']);
  }

  getUser(email: string, password:string) {
    this.httpClient.post<any>(`http://localhost:3000/api/token`, {email: email, password: password})
      .subscribe(
        response => {
            this.user = response.user;
            localStorage.setItem('user', JSON.stringify(response.user));
            localStorage.setItem('token', JSON.stringify(response.token));
            console.log(response.user)
            this.authService.setIsAuth(true);
            status = 'success';
            this.toastrService.show("Welcome ", `Hallo ${this.user.firstName}`, { status });
            this.router.navigate(['/']);

        },
        error => {
          status = 'danger';
          this.toastrService.show("Fehler", "Unauthorized", { status });
        }
      )
  }

}
