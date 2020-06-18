import {Ingredient} from '../shared/ingredient.model';
import { Subject } from 'rxjs';

export class ShoppinglistService{
    ingredientchanged = new Subject<Ingredient[]>();
    startedediting = new Subject<number>();
  private  Ingredients:Ingredient[] =[
        new Ingredient('Apple',10),
        new Ingredient('Tomato',10),
      ];

      getingredient(){
          return this.Ingredients.slice();
      }

      addingredient(ingredient :Ingredient){
          this.Ingredients.push(ingredient);
          this.ingredientchanged.next(this.Ingredients.slice());
      }
      addingredients(ingredients:Ingredient[]){
        this.Ingredients = ingredients;
        this.ingredientchanged.next(this.Ingredients.slice());
       }

      getingredients(index:number){
        return this.Ingredients[index];
      }

      updateingredient(index : number,newingredient:Ingredient)
      {
        this.Ingredients[index]=newingredient;
        this.ingredientchanged.next(this.Ingredients.slice());
      }

      ondelete(index:number){
        this.Ingredients.splice(index,1);
        this.ingredientchanged.next(this.Ingredients.slice());
      }
}