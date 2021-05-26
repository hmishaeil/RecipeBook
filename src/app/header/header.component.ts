import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { User } from '../_models/user';
import { AuthService } from '../_services/auth.service';
import { DataStorageService } from '../_services/data-storage.service';
import { RecipeService } from '../_services/recipe.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  private sub: Subject<User>;
  authenticated: boolean = false;

  @Output() menuSelected: EventEmitter<string> = new EventEmitter<string>();

  options = [
    { 'value': 'fetchData', 'viewValue': 'Fetch Data' },
    { 'value': 'saveData', 'viewValue': 'Save Data' },
  ]
  constructor(private recipeService: RecipeService, private authService: AuthService) { }

  ngOnInit() {
    this.authService.user$.subscribe(user => {
      this.authenticated = !!user; // Temporary solution
    })
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  onSelectMenu(menuType: string) {
    this.menuSelected.emit(menuType);
  }

  fetch() {
    this.recipeService.downloadRecipes();
  }

  save() {
    this.recipeService.uploadRecipes()
  }

  logout() {
    this.authService.logout();

  }
}
