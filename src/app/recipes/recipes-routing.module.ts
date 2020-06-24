import { NgModule } from '@angular/core';
import {Routes, RouterModule} from '@angular/router'
import { RecipesComponent } from './recipes.component';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { reciperesolver } from './recipe-resolver.service';
import { AuthGuard } from '../auth/auth.guard';

const routes : Routes =[
    { path:'' , component:RecipesComponent,canActivate:[AuthGuard] ,children:[
        {path:'' , component:RecipeStartComponent},
        { path :'new' , component:RecipeEditComponent},
        {path:':id' , component:RecipeDetailComponent,resolve:[reciperesolver]},
        { path :':id/edit' , component:RecipeEditComponent,resolve:[reciperesolver]}
      ]}
]
@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports :[RouterModule]
})
export class RecipesRoutingModule{}