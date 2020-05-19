import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import { MapService } from './map.service';
import { VehiculeServeur } from '../vehicules/vehiculeServeur.domains';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements AfterViewInit {
  map;
  listVehicule: VehiculeServeur [];

  smallIcon = new L.Icon({
    iconUrl: 'https://publicdomainvectors.org/photos/simple-travel-car-top_view.png',
    iconRetinaUrl: 'https://publicdomainvectors.org/photos/simple-travel-car-top_view.png',
    iconSize:    [35, 51],
    iconAnchor:  [22, 51],
    popupAnchor: [1, -34],
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    shadowSize:  [41, 41]
  });

  constructor(private mapService: MapService) { }

  ngAfterViewInit(): void {
    this.createMap();

      this.simulationVoiture();


  }

  simulationVoiture(){
    this.mapService.simulation().subscribe(res => {this.listVehicule = res , console.log(res)});
  }

  createMap() {
    const initCoord = {
      lat: 43.296153,
      lng: 5.372716,
    };

    const zoomLevel = 8;

    this.map = L.map('map', {
      center: [initCoord.lat, initCoord.lng],
      zoom: zoomLevel
    });

    const mainLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      minZoom: 7,
      maxZoom: 17,
    });

    mainLayer.addTo(this.map);
    const monText = `Transport GDT EXPRESS`;
    const popupOptions = {
      coords: initCoord,
      text: monText,
      open: true
    };
    this.addMarker(popupOptions);
  }

  addMarker({coords, text, open}) {
    const marker = L.marker([coords.lat, coords.lng], { icon: this.smallIcon });
    if (open) {
      marker.addTo(this.map).bindPopup(text).openPopup();
    } else {
      marker.addTo(this.map).bindPopup(text);
    }
  }

}
