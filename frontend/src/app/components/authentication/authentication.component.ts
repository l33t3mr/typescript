import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss']
})
export class AuthenticationComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    console.log(form.value);
    const email = form.value['email'];
    const password = form.value['password'];
      console.log(email)
    localStorage.setItem('email' , email);
    this.router.navigate(['/']);
  }

  goToRegistration(){
    this.router.navigate(['/registration']);
  }
  
}
