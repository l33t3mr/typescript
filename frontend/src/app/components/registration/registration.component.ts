import { Component, OnInit } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {NgForm} from "@angular/forms";


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  toggle_4: boolean = false;
  toggle_5: boolean = false;
  toggle_6: boolean = false;
  user: any;
  patchError = false;
  error: any;

  constructor(private httpClient: HttpClient, private toastrService: NbToastrService,
              private router: Router) { }

  ngOnInit(): void {
  }

  showPassword = true;

  getInputType() {
    if (this.showPassword) {
      return 'text';
    }
    return 'password';
  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }

  ToggelChange_2(checked: boolean) {
    this.toggle_4 = checked;
    this.toggle_5 = ! checked;
    this.toggle_6 = ! checked;
  }
  ToggelChange_3(checked: boolean) {
    this.toggle_5 = checked;
    this.toggle_4 = ! checked;
  }
  ToggelChange_4(checked: boolean) {
    this.toggle_6 = checked;
    this.toggle_5 = checked;
    this.toggle_4 = ! checked;
  }
  onSubmit(form: NgForm) {
    this.createUser(form.value);
  }

  createUser(user: any) {
    if (  this.toggle_4 ){
      user.role =  'prof';
    }
    if (  this.toggle_5 ){
      user.role =  'student';
    }
    if (  this.toggle_6 ){
      user.role =  'tutor';
    }

    this.httpClient.post<any>(`http://localhost:3000/api/users/`, user).subscribe(

      (resp) => {
        status = 'success';
        this.toastrService.show("update ", `message hier `, { status });
        this.router.navigate(['/login']);
      },
      (err) => {
        status = 'danger';
        this.toastrService.show("Fehler", err , { status });
      });

  }


}
