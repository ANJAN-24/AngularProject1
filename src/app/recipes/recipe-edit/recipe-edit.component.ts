import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, FormArrayName, Validators } from '@angular/forms';
import { RecipeService } from '../recipe.service';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { Recipe } from '../recipe.model';


@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
id:number;
ing : any;
editmodde=false;
recipeform :FormGroup;


  constructor(private route:ActivatedRoute ,
    private recipeservice : RecipeService,
    private router :Router) { }

    onsubmit(){
      if(this.editmodde){
      this.recipeservice.updaterecipe(this.id,this.recipeform.value);
    }
    else{
      this.recipeservice.addrecipe(this.recipeform.value);
    }
    this.oncancel();
    }
  ngOnInit(): void {
    this.route.params.subscribe(
      (params:Params)=>{
this.id=+params['id'];
this.editmodde=params['id']!=null;
console.log(this.editmodde);
this.initform();
      }
    );
  }

  ondeleteingredient(index:number){
(<FormArray>this.recipeform.get('ingredients')).removeAt(index);
  }
  private initform(){
    let recipeimgpath = '';
    let recipedescription ='';
    let recipename ='';
    let recipeIngredients = new FormArray([]);
    if(this.editmodde){
      const recipe = this.recipeservice.getrecipe(this.id);
      recipename=recipe.name;
      recipeimgpath = recipe.imagepath;
      recipedescription = recipe.description;
      if(recipe['ingredients'])
      {
        for(let ingredient of recipe.ingredient){
          recipeIngredients.push(
            new FormGroup({
            'name':new FormControl (ingredient.name,Validators.required),
            'amount': new FormControl (ingredient.amount,[Validators.required,Validators.pattern(/^[1-9]+[0-9]*$/)])
            })
          );
        }
      }
    }
    this.recipeform = new FormGroup({
      'name': new FormControl(recipename,Validators.required),
      'imagepath':new FormControl(recipeimgpath,Validators.required),
      'description': new  FormControl(recipedescription,Validators.required),
      'ingredients': recipeIngredients
    });
    
  }

  oncancel(){
    this.router.navigate(['../'],{relativeTo:this.route});
  }

  onaddingredient(){
    (<FormArray>this.recipeform.get('ingredients')).push(
      new FormGroup({
        'name':new FormControl(null,Validators.required),
        'amount' : new FormControl(null,[Validators.required,Validators.pattern(/^[1-9]+[0-9]*$/)])
      })
    )
  }

}
