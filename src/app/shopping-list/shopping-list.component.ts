import { Component, OnInit, OnDestroy } from '@angular/core';
import {Ingredient} from '../shared/ingredient.model';
import { ShoppinglistService } from './shopping-list.service';
import { Subscription, Subject } from 'rxjs';
@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit,OnDestroy {

  constructor(private shoppinglistservice:ShoppinglistService){}

  Ingredients:Ingredient[] ;
 
  private idchangedsub :Subscription;
  ngOnInit(): void {
    this.Ingredients=this.shoppinglistservice.getingredient();
    this.idchangedsub=this.shoppinglistservice.ingredientchanged.subscribe(
      (ingredient:Ingredient[])=>{
        this.Ingredients=ingredient;
      }
    )
  }

  onaedititem(index:number)
  {
this.shoppinglistservice.startedediting.next(index);
  }
  ngOnDestroy():void{
    this.idchangedsub.unsubscribe();
  }
  

}
