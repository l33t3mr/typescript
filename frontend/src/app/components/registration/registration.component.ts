import { Component, OnInit } from '@angular/core';
//import {  NbDatepickerModule} from '@nebular/theme';
import { NbToastrService, NbDialogRef, NbIconConfig, NbDialogService } from '@nebular/theme';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  toggle_1: boolean = true;
  toggle_2: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

  ToggelChange(): void{
    this.toggle_2 = !this.toggle_1;
    this.toggle_1 = !this.toggle_2;
  }

}
