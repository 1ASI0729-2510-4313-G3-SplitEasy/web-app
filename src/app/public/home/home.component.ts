import { Component } from '@angular/core';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { HeroSectionComponent } from './hero-section/hero-section.component';
import { AboutSectionComponent } from './about-section/about-section.component';
import { ServiceSectionComponent } from './service-section/service-section.component';
import { HowdoesitworkSectionComponent } from './howdoesitwork-section/howdoesitwork-section.component';
import { PriceSectionComponent } from './price-section/price-section.component';
import { ReviewSectionComponent } from './review-section/review-section.component';
import { ContactusSectionComponent } from './contactus-section/contactus-section.component';
import { TheFooterComponent } from './the-footer/the-footer.component';

@Component({
  selector: 'app-home',
  imports: [
    NavBarComponent,
    HeroSectionComponent,
    AboutSectionComponent,
    ServiceSectionComponent,
    HowdoesitworkSectionComponent,
    PriceSectionComponent,
    ReviewSectionComponent,
    ContactusSectionComponent,
    TheFooterComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
