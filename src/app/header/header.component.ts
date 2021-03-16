import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DataStorageService } from '../_services/data-storage.service';
import { RecipeService } from '../_services/recipe.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output() menuSelected: EventEmitter<string> = new EventEmitter<string>();

  options = [
    {'value': 'fetchData', 'viewValue': 'Fetch Data'},
    {'value': 'saveData', 'viewValue': 'Save Data'},
  ]
  constructor(private recipeService: RecipeService) { }

  ngOnInit() {
  }

  onSelectMenu(menuType: string){
    this.menuSelected.emit(menuType);
  }

  fetch(){
    this.recipeService.downloadRecipes();
  }

  save(){
    this.recipeService.uploadRecipes()
  }
}
