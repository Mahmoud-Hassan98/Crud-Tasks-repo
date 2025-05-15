import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appScrollNavbar]',
  standalone: true,
})
export class ScrollNavbarDirective {
  constructor(private el: ElementRef) {}

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrolled = window.scrollY > 50;
    if (scrolled) {
      this.el.nativeElement.classList.add('navbar-scrolled');
    } else {
      this.el.nativeElement.classList.remove('navbar-scrolled');
    }
  }
}
