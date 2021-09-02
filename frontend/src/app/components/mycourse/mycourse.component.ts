import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';

@Component({
  selector: 'app-mycourse',
    changeDetection: ChangeDetectionStrategy.OnPush,

  templateUrl: './mycourse.component.html',
  styleUrls: ['./mycourse.component.scss']
})
export class MycourseComponent implements OnInit {

  numbers : any[] = []

  constructor(private router: Router , private toastrService: NbToastrService) {       
    this.numbers = [0,1,2,3,4];
  }

  ngOnInit(): void {
  }

  sigleCourse(n: any){
    this.router.navigate(['/course/'+n]);
  }

  abmelden(e: any){
    e.stopPropagation();
    status = 'success';
    this.toastrService.show("Test 1", `Test 2 `, { status });

  }
}
