import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout',
  standalone: false,
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent implements OnInit {
  isSidebarOpen = true;
  isSidebarOpenMobile = false;
  isMobile = false;

  ngOnInit(): void {
    this.initializeSidebarState();
  }
  private initializeSidebarState(): void {
    const windowWidth = window.innerWidth;

    if (windowWidth < 1024) {
      this.isSidebarOpen = false;
      this.isSidebarOpenMobile = false;
      this.isMobile = true;
    } else {
      const savedState = localStorage.getItem('sidebarState');
      this.isSidebarOpen = savedState !== null ? JSON.parse(savedState) : true;
      this.isSidebarOpenMobile = false;
      this.isMobile = false;
    }
  }
  toggleSidebar(): void {
    if (this.isMobile) {
      this.isSidebarOpenMobile = !this.isSidebarOpenMobile;
    } else {
      this.isSidebarOpen = !this.isSidebarOpen;
      localStorage.setItem('sidebarState', JSON.stringify(this.isSidebarOpen));
    }
  }
  toggleMobileSidebar(): void {
    this.isSidebarOpenMobile = !this.isSidebarOpenMobile;
  }
  closeMobileSidebar(): void {
    this.isSidebarOpenMobile = false;
  }
  onOverlayClick(event: Event): void {
    event.preventDefault();
    this.closeMobileSidebar();
  }

  @HostListener('document:keydown.escape', ['$event'])
  onEscapeKey(event: KeyboardEvent): void {
    if (this.isSidebarOpenMobile) {
      this.closeMobileSidebar();
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    const windowWidth = event.target.innerWidth;

    if (windowWidth >= 1024) {
      this.isMobile = false;
      this.isSidebarOpenMobile = false;
      const savedState = localStorage.getItem('sidebarState');
      this.isSidebarOpen = savedState !== null ? JSON.parse(savedState) : true;
    } else {
      this.isMobile = true;
      this.isSidebarOpen = false;
      if (this.isSidebarOpenMobile) {
        this.isSidebarOpenMobile = false;
      }
    }
  }
  onSidebarNavigate(): void {
    if (this.isMobile) {
      this.closeMobileSidebar();
    }
  }
}
