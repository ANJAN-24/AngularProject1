import { NgModule } from '@angular/core';
import { AlertComponent } from './alert/alert.component';
import { loadingspinner } from './loading-spinner/loading-spinner.component';
import { PlaceholderDirective } from './placeholder/placeholder.directive';
import { DropdowndirectiveDirective } from './dropdowndirective.directive';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations:[
        AlertComponent,
        loadingspinner,
        PlaceholderDirective,
        DropdowndirectiveDirective],
imports:[
    CommonModule,FormsModule
],
exports:[
    AlertComponent,
    loadingspinner,
    PlaceholderDirective,
    DropdowndirectiveDirective,
    CommonModule
],
entryComponents:[AlertComponent]
})
export class SharedModule{}