import { Action } from '@ngrx/store';
import * as ShoppingEditActions from './shopping-edit.actions'

import { Ingredient } from '../../shared/ingredient.model';

export interface State {
    ingredients: Ingredient[];
    editedIngredient: Ingredient;
    editedIngredientIndex: number;
}

const initialState: State = {
    ingredients: [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 10), 
      ],
      editedIngredient: null,
      editedIngredientIndex: -1
};

export function shoppingListReducer(
    state: State = initialState, 
    action: ShoppingEditActions.ShoppingListActions){
    switch(action.type) {
        case ShoppingEditActions.ADD_INGREDIENT:
        return {
            ...state,
            ingredients: [...state.ingredients, action.payload]
        };
        case ShoppingEditActions.ADD_INGREDIENTS: 
        return {
            ...state,
            ingredients: [...state.ingredients, ...action.payload]
        };
        case ShoppingEditActions.UPDATE_INGREDIENT: 
        const ingredient = state.ingredients[state.editedIngredientIndex];
        const updatedIngredient = {
            ...ingredient,
            ...action.payload
        };
        const updatedIngredients = [...state.ingredients];
        updatedIngredients[state.editedIngredientIndex] = updatedIngredient;
        
        return {
            ...state,
            ingredients: updatedIngredients,
            editedIngredientIndex: -1,
            editedIngredient: null 
        };
        case ShoppingEditActions.DELETE_INGREDIENT:
        return {
            ...state,
            ingredients: state.ingredients.filter((ig, igIndex) => {
                return igIndex != state.editedIngredientIndex;
            }),
            editedIngredientIndex: -1,
            editedIngredient: null 
        };
        case ShoppingEditActions.START_EDIT:
        return {
            ...state,
            editedIngredientIndex: action.payload,
            editedIngredient: { ...state.ingredients[action.payload] }
        };
        case ShoppingEditActions.STOP_EDIT:
        return{
            ...state,
            editedIngredient: null,
            editedIngredientIndex: -1
        };
        default: 
        return state
    }

}
