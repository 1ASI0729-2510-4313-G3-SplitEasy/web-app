import { Component } from '@angular/core';
import {RouterLink} from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-hero-section',
  imports: [
    RouterLink, TranslateModule
  ],
  templateUrl: './hero-section.component.html',
  styleUrl: './hero-section.component.css'
})
export class HeroSectionComponent {

}
