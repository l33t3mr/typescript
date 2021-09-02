import { Component, OnInit, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss']
})
export class AuthenticationComponent implements OnInit {

  constructor(@Inject(AuthService)  private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    console.log(form.value);
    const email = form.value['email'];
    const password = form.value['password'];
    this.authService.setIsAuth(true);
    localStorage.setItem('email' , email);
    this.router.navigate(['/']);
  }

  goToRegistration(){
    this.router.navigate(['/registration']);
  }
  
}
