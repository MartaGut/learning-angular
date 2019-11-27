import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];
  private igChangeSubs: Subscription;

  constructor(private ShoppingListService: ShoppingListService ) { }

  ngOnInit() {
    this.ingredients = this.ShoppingListService.getIngredients();
    this.igChangeSubs = this.ShoppingListService.ingredientsChanged
    .subscribe(
      (ingredients: Ingredient[]) => {
        this.ingredients = ingredients;
      }
    )
  }

  onEditItem(index: number) {
    this.ShoppingListService.startedEditing.next(index)
  }

  

  ngOnDestroy(){
    this.igChangeSubs.unsubscribe();
  }

  

}
