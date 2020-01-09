import { Component, OnInit, OnDestroy, ViewChild} from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { NgForm } from '@angular/forms'
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as ShoppingEditActions from '../store/shopping-edit.actions';
import * as fromApp from '../../store/app.reducer'


@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent implements OnInit, OnDestroy {
  @ViewChild('f', {static: false} as any) slForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editedItem: Ingredient;



  constructor(
    private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.subscription = this.store.select('shoppingList').subscribe(stateData => {
      if (stateData.editedIngredientIndex > -1) {
        this.editMode = true;
        this.editedItem = stateData.editedIngredient;
        this.slForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        })
      } else {
        this.editMode = false;
      }
    });
    // this.subscription = this.ShoppingListService.startedEditing
    // .subscribe(
    //   (index: number) => {
    //     this.editedNumberIndex = index;
    //     this.editMode = true;
    //     this.editedItem = this.ShoppingListService.getIngredient(index);
    //     this.slForm.setValue({
    //       name: this.editedItem.name,
    //       amount: this.editedItem.amount
    //     })
    //   }
    // );
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
   
    if (this.editMode) {
      this.store.dispatch(new ShoppingEditActions.UpdateIngredient( newIngredient))
      // this.ShoppingListService.updateIngredient(this.editedNumberIndex, newIngredient)
    } else {
      // this.ShoppingListService.addIngredient(newIngredient);
      this.store.dispatch(new ShoppingEditActions.AddIngredient(newIngredient))
    }
    this.editMode= false;
    form.reset(); 
  
  }

  onClear() {
    this.slForm.reset(); 
    this.editMode = false;
    this.store.dispatch(new ShoppingEditActions.StopEdit());
  }

  onDelete() {
    // this.ShoppingListService.deleteIngredient(this.editedNumberIndex);
    this.store.dispatch(new ShoppingEditActions.DeleteIngredient())
    this.onClear();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.store.dispatch(new ShoppingEditActions.StopEdit());
  }

}
