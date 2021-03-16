import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recipe } from '../_models/recipe.model';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private http: HttpClient) {}

  fetch(){
    return this.http.get<Recipe[]>('https://recipe-book-49a69-default-rtdb.firebaseio.com/recipes.json');
  }

  save(recipes: Recipe[]){
    console.dir(recipes)
    return this.http.put('https://recipe-book-49a69-default-rtdb.firebaseio.com/recipes.json', recipes);
  }
}
