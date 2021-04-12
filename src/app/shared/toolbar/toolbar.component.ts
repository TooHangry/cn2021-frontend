import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {
  constructor(private router: Router, private route: ActivatedRoute) {}
  currentRoute = '';

  ngOnInit(): void {
    this.currentRoute = this.router.url;
    this.router.events.subscribe((event: any) => {
      if (event.url) {
        this.currentRoute = event.url;
      }
    });
  }

  routeTo(route: string): void {
    this.router.navigate([route]);
  }

  isSelected(route: string): boolean {
    return route === this.currentRoute;
  }
}
