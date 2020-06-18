import { Injectable } from '@angular/core';
import {Resolve, RouterStateSnapshot, ActivatedRouteSnapshot} from '@angular/router';
import {Recipe} from './recipe.model';
import { datastorageservice } from '../shared/data-storage.service';
import { RecipeService } from './recipe.service';


@Injectable({providedIn : 'root'})
export class reciperesolver implements Resolve<Recipe[]>{
constructor (private datastorage : datastorageservice,
  private  recipeservice : RecipeService){}

resolve(route :ActivatedRouteSnapshot,state:RouterStateSnapshot)
{   const recipes = this.recipeservice.getrecipes();
    if(recipes.length===0){
    return this.datastorage.fetchdata();
    }
    else return recipes;
}
}