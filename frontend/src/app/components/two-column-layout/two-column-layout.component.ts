import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-two-column-layout',
  templateUrl: './two-column-layout.component.html',
  styleUrls: ['./two-column-layout.component.scss']
})
export class TwoColumnLayoutComponent implements OnInit {
  
  @Input()
  leftColumn: any;

  @Input()
  rightColumn: any;

  constructor() { 
  }

  ngOnInit(): void {
  }

}
