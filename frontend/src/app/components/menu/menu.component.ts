import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  constructor( private router: Router) { }

  ngOnInit(): void {
  }


  onTabChange(e: any) {

    if(e.tabTitle == "Meine Kurse"){
      this.router.navigate(['/my-course']);
    }
    if(e.tabTitle == "Home"){
      this.router.navigate(['/']);
    }
    if(e.tabTitle == "Alle Kurse"){
      this.router.navigate(['/courses']);
    }
  }
}
