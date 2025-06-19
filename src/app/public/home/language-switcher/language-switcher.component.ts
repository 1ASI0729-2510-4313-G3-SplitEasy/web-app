import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-language-switcher',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './language-switcher.component.html',
})
export class LanguageSwitcherComponent implements OnInit {
  selectedLang: string = 'en';

  constructor(private translate: TranslateService) {}

  ngOnInit(): void {
    this.selectedLang = this.translate.currentLang || this.translate.getDefaultLang() || 'en';
  }

  changeLanguage(lang: string) {
    this.selectedLang = lang;
    this.translate.use(lang);
  }
}
