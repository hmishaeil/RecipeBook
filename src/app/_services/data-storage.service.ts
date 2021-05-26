import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { exhaustMap, take } from 'rxjs/operators';
import { Recipe } from '../_models/recipe.model';
import { User } from '../_models/user';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  fetch() {
    // let user: User = null;
    // this.authService.user$.pipe(take(1)).subscribe(data => user = data); // No need to un-subscribe as we are taking one.  

    // return this.authService.user$.pipe(
    //   take(1), 
    //   exhaustMap(
    //   (user) => {
    //     const params = new HttpParams().set('auth', user.token);
    //     return this.http.get<Recipe[]>('https://recipe-book-49a69-default-rtdb.firebaseio.com/recipes.json', { params });
    //   }
    // ));

    return this.http.get<Recipe[]>('https://recipe-book-49a69-default-rtdb.firebaseio.com/recipes.json');

  }

  save(recipes: Recipe[]) {
    console.dir(recipes)
    return this.http.put('https://recipe-book-49a69-default-rtdb.firebaseio.com/recipes.json', recipes);
  }
}
