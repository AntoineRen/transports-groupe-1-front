import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements AfterViewInit {
  map;

  smallIcon = new L.Icon({
    iconUrl: 'https://cdn.icon-icons.com/icons2/235/PNG/256/Car_Top_Red_26349.png',
    iconRetinaUrl: 'https://cdn.icon-icons.com/icons2/235/PNG/256/Car_Top_Red_26349.png',
    iconSize:    [35, 51],
    iconAnchor:  [22, 51],
    popupAnchor: [1, -34],
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    shadowSize:  [41, 41]
  });

  constructor() { }

  ngAfterViewInit(): void {
    this.createMap();
  }

  createMap() {
    const initCoord = {
      lat: 43.296153,
      lng: 5.372716,
    };

    const zoomLevel = 12;

    this.map = L.map('map', {
      center: [initCoord.lat, initCoord.lng],
      zoom: zoomLevel
    });

    const mainLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      minZoom: 12,
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
