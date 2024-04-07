import { AfterViewInit, Component } from '@angular/core';
import { Map, Marker } from 'mapbox-gl';
import { MapService } from '../../service/map.service';
import { MapInterface } from '../../interfaces/mapInterface';
import { RouterOutlet } from '@angular/router';
import { environment } from '../../../environments/environments.prod';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit {
  locations: MapInterface[] = [];

  constructor(private mapService: MapService) { }

  ngAfterViewInit(): void {
    this.mapService.getLocations().subscribe(
      (locations) => {
        this.locations = locations;
        console.log('Locations', this.locations);


        const map = new Map({
          accessToken: environment.mapboxKey,
          container: 'map',
          style: 'mapbox://styles/mapbox/streets-v12',
          center: [2.15899, 41.38879],
          zoom: 9,
        });

        map.on('load', () => {
          this.locations.forEach(location => {
            new Marker()
              .setLngLat([location.longitude, location.latitude])
              .addTo(map);
          });
        });
      },
      (error) => {
        console.error('Error fetching locations', error);
      }
    );
  }
}
