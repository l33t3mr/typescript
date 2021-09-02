import { Component, OnInit, HostBinding, ViewChild, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { NbToastrService, NbDialogRef, NbIconConfig, NbDialogService } from '@nebular/theme';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {

  numbers : any[] = []

  constructor(private router: Router, private toastrService: NbToastrService,
    private readonly dialogService: NbDialogService
) { 
      this.numbers = [0,1,2,3,4];
  }

  ngOnInit(): void {
  }

  addCourse(){
  
    const iconConfig: NbIconConfig = { icon: "headphones-outline", pack: 'eva' };
    status = 'success';
    this.toastrService.show("Test 1", `Test 2 `, { status });

    this.router.navigate(['/my-course']);
  }



}
