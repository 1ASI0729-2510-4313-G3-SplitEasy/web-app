import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CurrencyPipe, NgForOf } from '@angular/common';
import { Home } from '../../model/home.entity';
import { HomeService } from '../../service/home.service'; // Asegúrate que el path sea correcto

@Component({
  selector: 'app-home-representative',
  templateUrl: './home-representative.component.html',
  imports: [FormsModule, CurrencyPipe, NgForOf],
  styleUrls: ['./home-representative.component.css'],
})
export class HomeRepresentativeComponent implements OnInit {
  households: Home[] = [];
  selectedHouseholdId: string = '';
  representativeName: string = 'Representative';

  totalContributed: number = 0;
  totalMembers: number = 0;
  lastBill = { description: '', amount: 0 };
  creationDate: string = '';

  constructor(private homeService: HomeService) {}

  ngOnInit(): void {
    this.getAllHomes();
  }

  private getAllHomes(): void {
    this.homeService.getAll().subscribe((homes: Home[]) => {
      this.households = homes;

      if (homes.length > 0) {
        this.selectedHouseholdId =
          localStorage.getItem('selectedHouseholdId') || homes[0].id.toString();
        this.updateHouseholdData();
      }
    });
  }

  changeHousehold() {
    localStorage.setItem('selectedHouseholdId', this.selectedHouseholdId);
    this.updateHouseholdData();
  }

  updateHouseholdData() {
    const selectedHousehold = this.households.find(
      (h) => h.id.toString() === this.selectedHouseholdId
    );
    if (selectedHousehold) {
      this.totalContributed = (selectedHousehold as any).totalContributed ?? 0;
      this.totalMembers = selectedHousehold.membersCount;
      this.lastBill = (selectedHousehold as any).lastBill || {
        description: '',
        amount: 0,
      };
      this.creationDate = selectedHousehold.creationDateFormatted;
    }
  }

  onHomesChanged() {
    this.getAllHomes(); // Esto recarga todo y actualiza 'households' y el dropdown
  }

  goToMembers() {
    console.log('Go to members');
  }

  goToBills() {
    console.log('Go to bills');
  }

  goToContributions() {
    console.log('Go to contributions');
  }
}
