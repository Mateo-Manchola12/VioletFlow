import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-header',
  imports: [FormsModule, MatIconModule],
  templateUrl: './header.html',
})
export class Header implements OnInit {
  title!: string;
  search: string = '';
  preSearchRoute: string = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.updateTitle(this.getDeepestRoute(this.route));

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        const childRoute = this.getDeepestRoute(this.route);
        this.updateTitle(childRoute);
      });
  }

  private getDeepestRoute(route: ActivatedRoute): ActivatedRoute {
    while (route.firstChild) route = route.firstChild;
    return route;
  }

  private updateTitle(route: ActivatedRoute) {
    this.title = route.snapshot.data['title'] || 'Dashboard';
  }

  onSearch() {
    if (this.search.trim()) {
      if (!this.router.url.includes('search')) {
        this.preSearchRoute = this.router.url;
      }
      this.router.navigate(['search'], { queryParams: { q: this.search } });
    } else {
      this.router.navigate([this.preSearchRoute || 'home']);
    }
  }
}
