import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ShoppingListEditComponent } from './shopping-list/shopping-list-edit/shopping-list-edit.component';
import { RecipeListComponent } from './recipe/recipe-list/recipe-list.component';
import { RecipeItemComponent } from './recipe/recipe-list/recipe-item/recipe-item.component';
import { RecipeDetailComponent } from './recipe/recipe-detail/recipe-detail.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RecipeComponent } from './recipe/recipe.component';
import { FormsModule } from '@angular/forms';
import { DropdownDirective } from './_directive/dropdown.directive';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatListModule, MatSelectModule } from '@angular/material';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RouterModule } from '@angular/router';
import { ResolveService } from './_services/resolve.service';
import { RecipeStartComponent } from './recipe/recipe-start/recipe-start.component';
import { RecipeEditComponent } from './recipe/recipe-edit/recipe-edit.component';
import { ShoppingListAddComponent } from './shopping-list/shopping-list-add/shopping-list-add.component';

const appRoute = [
  {path: '', redirectTo: '/recipes', pathMatch: 'full'},
  {path: 'recipes', component: RecipeComponent, children: [
    {path: '',  component: RecipeStartComponent},
    {path: 'new',  component: RecipeEditComponent, pathMatch: 'full'},
    {path: ':id', component: RecipeDetailComponent, resolve: {
      data: ResolveService
    }},
    {path: ':id/edit',  component: RecipeEditComponent, pathMatch: 'full' },
  ]},
  {path: 'recipes-list', component: RecipeListComponent},
  {path: 'recipes/recipe-detail', component: RecipeDetailComponent},
  {path: 'shopping-list', component: ShoppingListComponent},
  {path: 'shopping-list/edit', component: ShoppingListEditComponent},
]
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ShoppingListComponent,
    ShoppingListEditComponent,
    RecipeListComponent,
    RecipeItemComponent,
    RecipeDetailComponent,
    RecipeComponent,
    RecipeStartComponent,
    DropdownDirective,
    RecipeEditComponent,
    ShoppingListAddComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    MatSelectModule,
    MatFormFieldModule,
    MatListModule,
    RouterModule.forRoot(appRoute)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
