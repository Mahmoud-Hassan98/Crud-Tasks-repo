import { ScrollNavbarDirective } from './scroll-navbar.directive';
import { ElementRef } from '@angular/core';

describe('ScrollNavbarDirective', () => {
  it('should create an instance', () => {
    const mockElementRef = new ElementRef(document.createElement('div'));
    const directive = new ScrollNavbarDirective(mockElementRef);
    expect(directive).toBeTruthy();
  });
});
