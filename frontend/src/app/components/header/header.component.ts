import { ChangeDetectionStrategy, Component, OnInit, Inject, Input } from '@angular/core';
import { NbMenuItem, NbTrigger } from '@nebular/theme';
import { NbMenuService } from '@nebular/theme';
import { filter, map } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';


import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input()
  guests: string = "";

  user: any;

  notificationTrigger : NbTrigger = NbTrigger.HOVER

  constructor( @Inject(AuthService)  private authService: AuthService, private router: Router , private nbMenuService: NbMenuService) {}

 ngOnInit() {

    this.user = localStorage.getItem("user")
    this.user = JSON.parse(this.user);
   console.log(this.guests);
   this.nbMenuService.onItemClick()
      .pipe(filter(({ tag }) => tag === 'userProfile'),
        map(({ item: { title } }) => title),
      )
      .subscribe(title => {
          if(title == "Logout") {
            this.authService.setIsAuth(false);
            this.router.navigate(['/login']);
          }
          if(title == "Profile") this.router.navigate(['/profile']);
      });
  }

  Menu: NbMenuItem[] = [
    { title: 'Profile' },
    { title: 'Logout' }
  ];

  notification: NbMenuItem[] = [
    { title: 'benachrichtigung 1' },
    { title: 'benachrichtigung 2' },
    { title: 'benachrichtigung 3' },
    { title: 'benachrichtigung 4' },
  ];

  goToProfile(){
    this.router.navigate(['/courses']);
  }
  goToLogin(){
    this.router.navigate(['/login']);
  }

}
