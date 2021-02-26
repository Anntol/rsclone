/* eslint-disable max-len */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as L from 'leaflet';

@Injectable({
  providedIn: 'root'
})
export class MarkerService {
  // capitals: string = '../../assets/test/us_capitals.geojson';
  projectsLink =
    'https://api.globalgiving.org/api/public/projectservice/all/projects/active?api_key=9f4d5d1b-2ecc-4d62-972b-d5bc07df5d92';

  static ScaledRadius(val: number, maxVal: number): number {
    return 20 * (val / maxVal);
  }

  constructor(private http: HttpClient) {}

  makeProjectsMarkers(map: L.Map): void {
    this.http.get(this.projectsLink).subscribe((res: any) => {
      res.projects.project.forEach((c: any) => {
        const lat = c.latitude;
        const lon = c.longitude;
        const popupInfo = `${c.title} (${c.contactCity}, ${c.contactCountry})`;
        console.log('country, latitude, longitude: ', c.country, c.latitude, c.longitude);
        if (lon !== undefined && lat !== undefined) {
          const marker = L.marker([lat, lon]).addTo(map);
          marker.bindPopup(popupInfo).openPopup();
        }
      });
    });
  }

  // test geo-markers
  // makeCapitalMarkers(map: L.Map): void {
  //   this.http.get(this.capitals).subscribe((res: any) => {
  //     for (const c of res.features) {
  //       const lat = c.geometry.coordinates[0];
  //       const lon = c.geometry.coordinates[1];
  //       const marker = L.marker([lon, lat]).addTo(map);
  //     }
  //   });
  // }

  // test circle markers resized by population
  // makeCapitalCircleMarkers(map: L.Map): void {
  //   this.http.get(this.capitals).subscribe((res: any) => {
  //     // Find the maximum population to scale the radii by.
  //     const maxVal = Math.max(...res.features.map((x: any) => x.properties.population), 0);

  //     for (const c of res.features) {
  //       const lat = c.geometry.coordinates[0];
  //       const lon = c.geometry.coordinates[1];
  //       const circle = L.circleMarker([lon, lat], {
  //         radius: MarkerService.ScaledRadius(c.properties.population, maxVal)
  //       }).addTo(map);
  //     }
  //   });
  // }
}
