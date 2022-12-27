import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShopingListService } from '../shopping-list/shoping-list.service';

@Injectable()
export class RecipeService {
  recipeChanged = new Subject<Recipe[]>();

  // private recipes: Recipe[] = [
  //   new Recipe(
  //     'Test Name',
  //     'Test Description',
  //     'https://cdn.pixabay.com/photo/2014/12/21/23/28/recipe-575434_640.png',
  //     [
  //       new Ingredient('Meat', '1'),
  //       new Ingredient('French frise', '20')
  //     ]
  //   ),
  //   new Recipe(
  //     'Second Name',
  //     'Second Description',
  //     'https://images.immediate.co.uk/production/volatile/sites/30/2013/05/Sweet-potato-spinach-curry-c49b156.jpg?quality=90&resize=556,505',
  //     [
  //       new Ingredient('Buns', '2'),
  //       new Ingredient('Meat', '1')
  //     ]
  //   ),
  // ];
  private recipes: Recipe[] = [];

  constructor(private slService: ShopingListService) {}

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipeChanged.next(this.recipes.slice());
  }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipeChanged.next(this.recipes.slice());
  }

  updeteRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipeChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipeChanged.next(this.recipes.slice());
  }
}
