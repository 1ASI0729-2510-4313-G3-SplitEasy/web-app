import { Component } from '@angular/core';
import {NavBarComponent} from './core/component/nav-bar/nav-bar.component';
import {TheFooterComponent} from './core/component/the-footer/the-footer.component';
import {ActivatedRoute, NavigationEnd, Router, RouterOutlet} from '@angular/router';
import {filter} from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'split-easy-app';

  constructor(private router: Router, private route: ActivatedRoute) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      const tree = this.router.parseUrl(this.router.url);
      if (!tree.fragment) {
        // Solo hace scroll al tope si no hay fragmento (#seccion)
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  }
}
