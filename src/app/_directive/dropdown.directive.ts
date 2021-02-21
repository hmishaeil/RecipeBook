import { Directive, ElementRef, HostBinding, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {

  @Input() mouseOverColor: string = 'transparent';
  @HostBinding('style.backgroundColor') styleBackgroundColor: string = 'transparent';

  // no need to inject the ref, as it is not a good practice to modify the web element outside the scope
  constructor() { }

  @HostListener('mouseover') mouseover(){
    this.styleBackgroundColor = this.mouseOverColor;
  }

  @HostListener('mouseout') mouseout(){
    this.styleBackgroundColor = 'transparent';
  }

}
