import { Directive, HostListener, HostBinding } from '@angular/core';

@Directive({
  selector: '[appDropdowndirective]'
})
export class DropdowndirectiveDirective{ 
  @HostBinding('class.open') isOpen=false;
  @HostListener('click') toggleOpen(){
this.isOpen=!this.isOpen;
  }
  constructor() { }

}
