import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  toggleNgModel = false;

  constructor() { }

  ngOnInit(): void {
  }


  onSubmit(form: NgForm) {
    console.log(form.value["input1"]);


  }


}
