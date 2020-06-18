import {Recipe} from './recipe.model';
import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppinglistService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';

@Injectable()
export class RecipeService{
    recipechanged = new Subject<Recipe[]>();
    
  //  private recipess:Recipe[]=[
    //    new Recipe('Chicken Fry','This is the description for the Chicken fry','https://www.cscassets.com/recipes/wide_cknew/wide_32.jpg',
     //   [new Ingredient('meat',1),new Ingredient('fries',1)]),
      //  new Recipe('Another Chicken Fry','This is the description for the Chicken fry','https://www.cscassets.com/recipes/wide_cknew/wide_32.jpg',
       // [new Ingredient('bun',2),new Ingredient('meat',2)]),
      //];
      private recipess:Recipe[]=[];

      constructor(private slservice : ShoppinglistService){}
      getrecipes(){
          return this.recipess.slice();
      }

      getrecipe(id:number){
        return this.recipess[id];
    }

      addingredienttoshoppinglist(ingredients:Ingredient[]){
          this.slservice.addingredients(ingredients);
      }

      addrecipe(recipe :Recipe){
          this.recipess.push(recipe);
          this.recipechanged.next(this.recipess.slice());
      }

      updaterecipe(index :number,newrecipe :Recipe){
          this.recipess[index]=newrecipe;
          this.recipechanged.next(this.recipess.slice());
      }

      recipesdeleted(id:number){
          this.recipess.splice(id,1);
          this.recipechanged.next(this.recipess.slice());
      }

      setrecipe(recipe:Recipe[]){
          this.recipess= recipe;
          this.recipechanged.next(this.recipess.slice());
      }
}