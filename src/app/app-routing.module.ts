import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadingStrategy, PreloadAllModules } from '@angular/router';

const routes: Routes = [
  { path:'' , redirectTo :'/recipes' ,pathMatch:'full'},
  {path:'recipes',loadChildren:() => import('./recipes/recipes.module').then(m => m.RecipesModule)},
  {path:'shopping-list',loadChildren:() => import('./shopping-list/shopping-list.module').then(s => s.ShoppingListModule)},
  {path:'auth',loadChildren:() => import('./auth/auth.module').then(a => a.AuthModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy:PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { 

}
