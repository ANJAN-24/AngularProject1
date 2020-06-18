import {Injectable} from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import {map, tap, take, exhaustMap} from 'rxjs/operators';
import { authservice } from '../auth/auth.service';


@Injectable({providedIn:'root'})
export class datastorageservice {

    constructor(private http:HttpClient,
        private recipeservice:RecipeService,
        private auth:authservice){

    }

    savedata(){
        const recipe = this.recipeservice.getrecipes();
        this.http.put('https://angular-project-backend.firebaseio.com/recipe.json',recipe).subscribe(response =>{
        console.log(response);
});
    }

    fetchdata(){
       return this.auth.user.pipe(take(1),exhaustMap(user =>{
            return  this.http.get<Recipe[]>('https://angular-project-backend.firebaseio.com/recipe.json',
            {
                params : new HttpParams().set('auth',user.id)
            }
        )}),map(recipes =>{
            return recipes.map(recipe=>
                {
                    return {...recipe,ingredients:recipe.ingredient?recipe.ingredient:[] };
                });
        }),tap(recipe =>
            {
                this.recipeservice.setrecipe(recipe);
            }));
      
       
    }
}