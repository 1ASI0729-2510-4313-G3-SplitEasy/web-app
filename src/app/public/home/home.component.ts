import {Component, OnInit} from '@angular/core';
import {NavBarComponent} from '../../core/component/nav-bar/nav-bar.component';
import {HeroSectionComponent} from './hero-section/hero-section.component';
import {AboutSectionComponent} from './about-section/about-section.component';
import {ServiceSectionComponent} from './service-section/service-section.component';
import {HowdoesitworkSectionComponent} from './howdoesitwork-section/howdoesitwork-section.component';
import {PriceSectionComponent} from './price-section/price-section.component';
import {ReviewSectionComponent} from './review-section/review-section.component';
import {ContactusSectionComponent} from './contactus-section/contactus-section.component';
import {TheFooterComponent} from '../../core/component/the-footer/the-footer.component';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [
    HeroSectionComponent,
    AboutSectionComponent,
    ServiceSectionComponent,
    HowdoesitworkSectionComponent,
    PriceSectionComponent,
    ReviewSectionComponent,
    ContactusSectionComponent,
    NavBarComponent,
    TheFooterComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.fragment.subscribe(fragment => {
      if (fragment) {
        const element = document.getElementById(fragment);
        if (element) {
          // Puedes usar scrollIntoView o un scroll suave
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  }
}
