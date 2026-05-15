import { Component, Input, OnChanges, SimpleChanges, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { City } from '../../models/city.model';
import { WeatherRecord } from '../../models/weather-record.model';
import { WeatherRecordService } from '../../services/weather-record.service';
import { WeatherService } from '../../services/weather.service';
import { WeatherDetail } from '../../models/weather.model';
/*
 * Implementar:
 * HU-03 — Detalle de Ciudad con Clima (Ver TALLER.md Parte B)
 * HU-04 — Historial de Registros de Clima (Ver TALLER.md Parte D)
 */

@Component({
  selector: 'app-city-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './city-detail.component.html'
})
export class CityDetailComponent implements OnChanges {
  private weatherRecordService = inject(WeatherRecordService);
  private weatherService = inject(WeatherService);
  weatherDetail: WeatherDetail | null = null;
  loading: boolean = false;
  @Input() city!: City;

  weatherRecords: WeatherRecord[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['city'] && this.city) {
      this.weatherRecordService.getRecords(this.city.id)
        .subscribe(records => this.weatherRecords = records);

      this.loading = true;
      
      this.weatherService.getWeather(this.city.name)
        .subscribe(weather => {
          this.weatherDetail = weather;
          this.loading = false;
        });
          // TODO HU-03: Procesar y mostrar el clima de la ciudad
    }
  }

  saveWeather(): void {
    // TODO HU-04: Agregar aquí el código para guardar un nuevo registro de clima
    //             Al completar, recarga la lista con weatherRecordService.getRecords(this.city.id).
  }
}
