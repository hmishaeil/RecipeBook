import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ShoppingListService } from 'src/app/_services/shopping-list.service';

@Component({
  selector: 'app-shopping-list-add',
  templateUrl: './shopping-list-add.component.html',
  styleUrls: ['./shopping-list-add.component.css']
})
export class ShoppingListAddComponent implements OnInit {

  constructor(private shoppingListService: ShoppingListService) { }

  @ViewChild('addForm') addForm: NgForm;

  ingName: string;
  ingAmount: number;

  ngOnInit(): void {}

  ngOnDestroy(): void {
  }

  onSubmit(){
    this.shoppingListService.addIngredient(this.ingName, this.ingAmount);
    this.addForm.reset();
  }

  onClear(){
    this.addForm.reset()
  }
}
