import { NgClass } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import {
  NavigationEnd,
  Router,
  RouterLink,
  RouterLinkActive,
} from '@angular/router';
import { filter, Subject, takeUntil } from 'rxjs';
import {
  CdkDragDrop,
  DragDropModule,
  moveItemInArray,
} from '@angular/cdk/drag-drop';

type PinnedRecord = {
  id: string;
  title: string;
  module: {
    label: string;
    route: string;
    icon: { name: string; package: string };
  };
};

@Component({
  selector: 'app-footer',
  imports: [RouterLink, RouterLinkActive, NgClass, DragDropModule],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer implements OnDestroy {
  private static readonly SCROLL_AMOUNT_MULTIPLIER = 144 * 3; // tab width * number of tabs to scroll
  private static readonly ANIMATION_DELAY = 200;
  private static readonly SCROLL_TOLERANCE = 1;

  currentUrl: string = '';
  pinnedRecords: PinnedRecord[] = [];

  private destroy$ = new Subject<void>();

  @ViewChild('scrollContainer', { static: true }) scrollContainer!: ElementRef;

  constructor(
    private router: Router,
    private cd: ChangeDetectorRef,
  ) {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        takeUntil(this.destroy$),
      )
      .subscribe((event: NavigationEnd) => {
        this.currentUrl = event.urlAfterRedirects;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  get isRightButtonVisible(): boolean {
    const container = this.getScrollContainer();
    if (!container) return false;

    return (
      container.scrollLeft + container.clientWidth <
      container.scrollWidth - Footer.SCROLL_TOLERANCE
    );
  }

  get isLeftButtonVisible(): boolean {
    const container = this.getScrollContainer();
    if (!container) return false;

    return container.scrollLeft > 0;
  }

  // Métodos públicos
  isAnyTabActive(): boolean {
    return this.pinnedRecords.some((tab) =>
      this.currentUrl.startsWith(this.buildTabRoute(tab)),
    );
  }

  isTabActive(tab: PinnedRecord): boolean {
    return this.router.url === this.buildTabRoute(tab);
  }

  deletePinnedRecord(id: string, module: string): void {
    this.pinnedRecords = this.pinnedRecords.filter(
      (tab) => tab.id !== id || tab.module.route !== module,
    );
  }

  onCloseTab(event: Event, id: string, module: string): void {
    event.preventDefault();
    event.stopPropagation();
    this.deletePinnedRecord(id, module);
  }

  scrollTabs(direction: 'left' | 'right'): void {
    const container = this.scrollContainer.nativeElement;
    const scrollAmount =
      direction === 'left'
        ? -Footer.SCROLL_AMOUNT_MULTIPLIER
        : Footer.SCROLL_AMOUNT_MULTIPLIER;

    container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  }

  navigateOnMouseDown(tab: PinnedRecord): void {
    this.router.navigate([this.buildTabRoute(tab)]);
  }

  drop(event: CdkDragDrop<PinnedRecord[]>): void {
    moveItemInArray(
      this.pinnedRecords,
      event.previousIndex,
      event.currentIndex,
    );

    this.handleDropAnimation();
  }

  // Métodos privados
  private getScrollContainer(): HTMLElement | null {
    const container = this.scrollContainer?.nativeElement;
    return container && this.pinnedRecords.length > 0 ? container : null;
  }

  private buildTabRoute(tab: PinnedRecord): string {
    return `/${tab.module.route}/record/${tab.id}`;
  }

  private handleDropAnimation(): void {
    const el = this.scrollContainer.nativeElement;

    el.classList.remove('cdk-drop-list-dragging');
    el.classList.add('unspacing');

    setTimeout(() => {
      el.classList.remove('unspacing');
    }, Footer.ANIMATION_DELAY);
  }

  // Event handlers
  @HostListener('window:resize')
  onResize(): void {
    this.cd.detectChanges();
  }

  onScroll(): void {
    this.cd.detectChanges();
  }
}
