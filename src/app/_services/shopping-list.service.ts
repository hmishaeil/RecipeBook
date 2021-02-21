import { EventEmitter, Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Ingredient } from '../_models/ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService implements OnInit {

  private ingredients: Ingredient[] = [
  ]
  
  ingredients$
  ingredient$
  ingToBeEdited$

  constructor() { 
    // this.ingredients$ = new EventEmitter<any>();
    this.ingredients$ = new Subject<Ingredient[]>();
    this.ingredient$ = new Subject<Ingredient>();
    this.ingToBeEdited$ = new BehaviorSubject<Ingredient>(null);
  }
  ngOnInit(): void {
  }
  
  addIngredient(name, amount){
    let id = this.ingredients.length;
    const ingObj = new Ingredient(++id, name, amount)
    this.ingredients.push(ingObj)
    this.ingredients$.next(this.ingredients)

    console.log(this.ingredients)
  }

  updateIngredient(ingredient: Ingredient){

    let index = this.ingredients.findIndex(item => item.id === ingredient.id);

    if(index !== -1){
      this.ingredients[index] = ingredient;
      this.ingredients$.next(this.ingredients)
    }
  }

  findIngredient(id: number){
    return this.ingredients.find(x => x.id === id)
  }

  removeIngredient(id: number){
    this.ingredients = this.ingredients.filter(x => x.id !== id);
    this.ingredients$.next(this.ingredients)

  }
}
