import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  user : any ;

  Tabstatus = {
    //"Home"  : false,
    "Meine" : false,
    "Alle"  : false,
    "Material"  : false
  }
  constructor( private router: Router) {


  }

  ngOnInit(): void {
    this.user = localStorage.getItem("user")
    this.user = JSON.parse(this.user);
    this.router.events.subscribe((val) => {
      if(val instanceof NavigationStart) {
        //this.Tabstatus["Home"] = false;
        this.Tabstatus["Meine"] = false;
        this.Tabstatus["Alle"] = false;
        this.Tabstatus["Material"] = false;
        if(val.url == "/"){
          this.Tabstatus["Meine"] = true;
        }
        if(val.url == "/my-course"){
          this.Tabstatus["Meine"] = true;
        }
        if(val.url == "/courses"){
          this.Tabstatus["Alle"] = true;
        }
        if(val.url == "/prof"){
          this.Tabstatus["Material"] = true;
        }
      }
    });
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

    if(e.tabTitle == "Material"){
      this.router.navigate(['/prof']);
    }

  }

  checkRole(TabName: string): any{

    switch(TabName) {
      case "Meine Kurse": {
        return true;
      }

      case "Alle Kurse": {
        return this.user.role == "student" ? true: false ;
      }

      case "Material": {
        return this.user.role == "student" ? false: true ;
      }

    }
    return true;
  }
}
