import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import { MapService } from './map.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements AfterViewInit {

  map;

  markerLayer = L.layerGroup();

  voitureIcon = L.icon({
    iconUrl: 'https://i.dlpng.com/static/png/6566580_preview.png',
    iconRetinaUrl: 'https://i.dlpng.com/static/png/6566580_preview.png',
    iconSize:    [70, 45],
    iconAnchor:  [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    shadowSize:  [41, 41]
  });

  constructor(private mapService: MapService) { }

  ngAfterViewInit(): void {
    this.createMap();

    this.simulationVoiture();
  }

  simulator(i) {
    setTimeout(() => {

      this.simulationVoiture();

      if (--i) {
        this.simulator(i);
      }
    }, 1000);
  }

  public simulationVoiture() {
    this.mapService.simulation().subscribe(
      vehicules => {

        this.markerLayer.clearLayers();

        for (const vehicule of vehicules) {
          const coord = {
            lat: vehicule.latitude,
            lng: vehicule.longitude,
          };

          const popup = {
            coords: coord,
            text: vehicule.immatriculation,
            open: false
          };

          this.addMarker(popup);
        }

      });
  }

  createMap() {
    const initCoord = {
      lat: 47.094553,
      lng: 2.451135,
    };

    const zoomLevel = 6;

    this.map = L.map('map', {
      center: [initCoord.lat, initCoord.lng],
      zoom: zoomLevel
    });

    const mainLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      minZoom: 2,
      maxZoom: 17,
    });

    mainLayer.addTo(this.map);
    this.markerLayer.addTo(this.map);
  }

  addMarker({ coords, text, open }) {
    const marker = L.marker([coords.lat, coords.lng], { icon: this.voitureIcon });
    if (open) {
      marker.addTo(this.markerLayer).bindPopup(text).openPopup();
    } else {
      marker.addTo(this.markerLayer).bindPopup(text);
    }
  }

}
