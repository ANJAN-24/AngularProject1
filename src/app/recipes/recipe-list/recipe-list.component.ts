import { Component, OnInit,OnDestroy} from '@angular/core';
import {Recipe} from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
  
})
export class RecipeListComponent implements OnInit ,OnDestroy{
  
  recipess:Recipe[];
   suscription :Subscription;
  
  constructor(private recipeservice:RecipeService,
   private router :Router,
   private route :ActivatedRoute ) { 
     
  }

  ngOnDestroy(){
    this.suscription.unsubscribe();
  }

  ngOnInit(){
this.recipess=this.recipeservice.getrecipes();
this.suscription= this.recipeservice.recipechanged.subscribe((recipes:Recipe[])=>{
  this.recipess = recipes;
});
  }

  onnewrecipe(){
this.router.navigate(['new'],{relativeTo:this.route});
  }
  
}
