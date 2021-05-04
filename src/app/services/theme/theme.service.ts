import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  isLightTheme: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  constructor() { }

  toggleTheme(): void {
    const theme = localStorage.getItem('isLight');
    if(theme) {
      localStorage.removeItem('isLight');
      this.isLightTheme.next(true);
    } else {
      this.isLightTheme.next(false);
      localStorage.setItem('isLight', 'true');
    }
  }

  getTheme(): boolean {
    const theme = localStorage.getItem('isLight');
    if(theme) {
      this.isLightTheme.next(false);
    } else {
      this.isLightTheme.next(true);
    }

    return theme ? true : false;
  }
}
