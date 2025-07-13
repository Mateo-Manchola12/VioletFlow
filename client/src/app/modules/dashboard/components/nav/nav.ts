import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { HSOverlay } from 'preline/dist';

@Component({
  selector: 'app-nav',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './nav.html',
})
export class Nav {
  routes: Map<string, string> = new Map([['Inicio', 'home']]);

  closeSidebar() {
    HSOverlay.close('#hs-sidebar-offcanvas');
  }
}
