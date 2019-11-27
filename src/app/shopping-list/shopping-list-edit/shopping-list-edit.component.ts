import { Component, OnInit, OnDestroy, ViewChild} from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms'
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent implements OnInit, OnDestroy {
  @ViewChild('f', {static: false} as any) slForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editedNumberIndex: number;
  editedItem: Ingredient;



  constructor(private ShoppingListService: ShoppingListService) { }

  ngOnInit() {
    this.subscription = this.ShoppingListService.startedEditing
    .subscribe(
      (index: number) => {
        this.editedNumberIndex = index;
        this.editMode = true;
        this.editedItem = this.ShoppingListService.getIngredient(index);
        this.slForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        })
      }
    );
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
   
    if (this.editMode) {
      this.ShoppingListService.updateIngredient(this.editedNumberIndex, newIngredient)
    } else {
      this.ShoppingListService.addIngredient(newIngredient);
    }
    this.editMode= false;
    form.reset(); 
  
  }

  onClear() {
    this.slForm.reset(); 
    this.editMode = false;
  }

  onDelete() {
    this.ShoppingListService.deleteIngredient(this.editedNumberIndex);
    this.onClear();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
