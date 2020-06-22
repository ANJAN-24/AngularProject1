import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecipesComponent } from './recipes/recipes.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { reciperesolver } from './recipes/recipe-resolver.service';
import { auth } from './auth/auth.component';
import { AuthGuard } from './auth/auth.guard';


const routes: Routes = [
  { path:'' , redirectTo :'/recipes' ,pathMatch:'full'},
  { path:'recipes' , component:RecipesComponent,canActivate:[AuthGuard] ,children:[
    {path:'' , component:RecipeStartComponent},
    { path :'new' , component:RecipeEditComponent},
    {path:':id' , component:RecipeDetailComponent,resolve:[reciperesolver]},
    { path :':id/edit' , component:RecipeEditComponent,resolve:[reciperesolver]}
  ]},
  { path:'shopping-list' , component:ShoppingListComponent },
  {path :'auth',component:auth}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 

}
