import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CountryService } from '../../services/country.service';
import { CityService } from '../../services/city.service';
import { Country } from '../../models/country.model';
import { City } from '../../models/city.model';
import { CityListComponent } from '../city-list/city-list.component';

/*
 * Implementar: HU-02 — Crear Ciudad
 */

@Component({
  selector: 'app-city-create',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './city-create.component.html'
})
export class CityCreateComponent implements OnInit{
  @Output() cityCreated = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  cityName: string = '';
  selectedCountryId: number | null = null;
  countries: Country[] = [];
  countryService: CountryService;
  cityService: CityService;

  constructor(countryService: CountryService, cityService: CityService) {
    this.countryService = countryService;
    this.cityService = cityService;
  }

  ngOnInit(): void {
      this.getCountries();
  }

  getCountries(): void {
    this.countryService.getCountries().subscribe(countries => {
      this.countries = countries;
    });
  }

  OnSave(): void {
    this.cityService.createCity(this.selectedCountryId!, { name: this.cityName }).subscribe(() => {
      this.cityCreated.emit();
    });
  }

  OnCancel(): void {
    this.cancel.emit();
  }
}
