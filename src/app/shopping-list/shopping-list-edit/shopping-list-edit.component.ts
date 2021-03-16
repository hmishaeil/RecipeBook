import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/_models/ingredient.model';
import { ShoppingListService } from 'src/app/_services/shopping-list.service';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent implements OnInit, OnDestroy {

  @ViewChild('editForm') editForm: NgForm;

  sub
  ingName: string;
  ingAmount: number;
  id: number;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
    this.sub = this.shoppingListService.ingToBeEdited$.subscribe(x => {
      this.id = x.id;
      this.ingName = x.name
      this.ingAmount = x.amount
    })
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe()
  }

  onSubmit(){
    let ing = new Ingredient(
      this.id,
      this.ingName,
      this.ingAmount,
    );
    this.shoppingListService.updateIngredient(ing)
    this.editForm.reset();
  }

  onClear(){
    this.editForm.reset();
  }
}
