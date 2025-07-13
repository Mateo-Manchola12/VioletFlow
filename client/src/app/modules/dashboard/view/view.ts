import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { Header } from '../components/header/header';
import { Nav } from '../components/nav/nav';
import { Footer } from '../components/footer/footer';

declare global {
  interface Window {
    HSOverlay: any;
  }
}

@Component({
  selector: 'app-main-view',
  imports: [RouterOutlet, RouterLink, Header, Nav, Footer],
  templateUrl: './view.html',
})
export class View implements OnInit, OnDestroy, AfterViewInit {
  ngOnInit() {
    // Inicializar los overlays de Preline cuando el componente se carga
    this.initializeOverlays();
  }

  ngAfterViewInit() {
    // Asegurar que los overlays se inicialicen después de que la vista esté completamente cargada
    setTimeout(() => {
      this.initializeOverlays();
    }, 100);
  }

  ngOnDestroy() {
    // Limpiar los overlays cuando el componente se destruye
    if (typeof window !== 'undefined' && window.HSOverlay) {
      const overlay = window.HSOverlay.getInstance('#hs-sidebar-offcanvas');
      if (overlay) {
        overlay.destroy();
      }
    }
  }

  private initializeOverlays() {
    if (typeof window !== 'undefined' && window.HSOverlay) {
      window.HSOverlay.autoInit();
    }
  }
}
