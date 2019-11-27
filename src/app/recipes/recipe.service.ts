import { Recipe } from './recipe.model'
import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';

@Injectable()

export class RecipeService {
    recipeChanged = new Subject<Recipe[]>();

//  private recipes: Recipe[] = [
//         new Recipe('A test recipe', 'Test', 
//         'https://media.self.com/photos/57dff8aa7160f6ee33314fdf/8:3/w_1280,c_limit/sub-channel-food_recipes.jpg',
//         [
//             new Ingredient('Tofu', 1),
//             new Ingredient('Iceberg', 3)
//         ]),
//         new Recipe('A test recipe', 'Test',
//          'https://media.self.com/photos/57dff8aa7160f6ee33314fdf/8:3/w_1280,c_limit/sub-channel-food_recipes.jpg',
//         [
//             new Ingredient('Tofu', 1),
//             new Ingredient('Iceberg', 3)
//         ])
//       ];

private recipes: Recipe[] = [];

constructor(private ShoppingListService: ShoppingListService){}

getRecipes(){
    return this.recipes.slice();
      }

getRecipe(index: number){
    return this.recipes[index]; 
}

setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipeChanged.next(this.recipes.slice());
}

addIngredientsToShoppingList(ingredients: Ingredient[]){
    this.ShoppingListService.addIngredients(ingredients);

}

addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipeChanged.next(this.recipes.slice());
}

updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipeChanged.next(this.recipes.slice());
}

deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipeChanged.next(this.recipes.slice())
}

}