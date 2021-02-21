import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output() menuSelected: EventEmitter<string> = new EventEmitter<string>();

  options = [
    {'value': 'Action_1', 'viewValue': 'Action 1'},
    {'value': 'Action_2', 'viewValue': 'Action 2'},
    {'value': 'Action_3', 'viewValue': 'Action 3'},
  ]
  constructor() { }

  ngOnInit() {
  }

  onSelectMenu(menuType: string){
    this.menuSelected.emit(menuType);
  }
}
