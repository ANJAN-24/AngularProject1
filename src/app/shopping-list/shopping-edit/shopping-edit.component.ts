import { Component, OnInit, OnDestroy, ViewChild} from '@angular/core';

import {Ingredient} from '../../shared/ingredient.model';
import { ShoppinglistService } from '../shopping-list.service';
import {  NgForm, FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit,OnDestroy {
  @ViewChild('f') slform:NgForm;
subscription: Subscription
editmode = false;
editeditemindex:number;
editeditem:Ingredient;

  constructor(private slservice :ShoppinglistService) { }

  ngOnInit(): void {
   this.subscription= this.slservice.startedediting.subscribe(
     (index:number)=>{
       this.editeditemindex=index;
this.editmode=true;
this.editeditem = this.slservice.getingredients(index);
this.slform.setValue({
  name:this.editeditem.name,
  amount :this.editeditem.amount}
)
     }
   );
  }

  ngOnDestroy(){
  this.subscription.unsubscribe();  
  }
  onitemadded(f:NgForm){
    const value = f.value;
    const newingredient = new Ingredient(value.name,value.amount);
    if(this.editmode){
      this.slservice.updateingredient(this.editeditemindex,newingredient);
    }else
    this.slservice.addingredient(newingredient);
    this.editmode=false;
    f.reset();
  }

  clearall(){
    this.slform.reset();
    this.editmode=false;
  }

  delete()
  { this.slservice.ondelete(this.editeditemindex);
    this.clearall();

  }
  
}
