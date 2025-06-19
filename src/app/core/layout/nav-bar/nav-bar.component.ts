import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LanguageSwitcherComponent } from "../../../public/home/language-switcher/language-switcher.component";
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterLink, LanguageSwitcherComponent, TranslateModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css',
})
export class NavBarComponent {}
