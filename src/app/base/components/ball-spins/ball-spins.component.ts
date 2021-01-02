import { Component, AfterViewInit, OnDestroy, Inject, NgZone, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import * as am4core from '@amcharts/amcharts4/core';
import * as am4maps from '@amcharts/amcharts4/maps';
import am4geodata_worldLow from '@amcharts/amcharts4-geodata/worldLow';
import am4themes_kelly from '@amcharts/amcharts4/themes/kelly';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';

@Component({
  selector: 'app-ball-spins',
  templateUrl: './ball-spins.component.html',
  styleUrls: ['./ball-spins.component.scss']
})
export class BallSpinsComponent implements AfterViewInit, OnDestroy {
  private chart!: am4maps.MapChart;

  constructor(@Inject(PLATFORM_ID) private platformId: any, private zone: NgZone) {}

  browserOnly(f: () => void): void {
    if (isPlatformBrowser(this.platformId)) {
      this.zone.runOutsideAngular(() => {
        f();
      });
    }
  }

  ngAfterViewInit(): void {
    this.browserOnly(() => {
      am4core.useTheme(am4themes_kelly);
      am4core.useTheme(am4themes_animated);

      am4core.disposeAllCharts();

      const chart = am4core.create('mapdiv', am4maps.MapChart);

      chart.geodata = am4geodata_worldLow;

      chart.projection = new am4maps.projections.Orthographic();
      chart.panBehavior = 'rotateLongLat';
      chart.deltaLatitude = -20;
      chart.margin(50, 20, 50, 20);

      chart.adapter.add('deltaLatitude', (delatLatitude: any): any => am4core.math.fitToRange(delatLatitude, -90, 90));

      const polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());

      // Make map load polygon (like country names) data from GeoJSON
      polygonSeries.useGeodata = true;

      const polygonTemplate = polygonSeries.mapPolygons.template;
      polygonTemplate.tooltipText = '{name}';
      polygonTemplate.fill = am4core.color('#182936');
      polygonTemplate.stroke = am4core.color('#454a58');
      polygonTemplate.strokeWidth = 0.5;

      const graticuleSeries = chart.series.push(new am4maps.GraticuleSeries());
      graticuleSeries.mapLines.template.line.stroke = am4core.color('#ffffff');
      graticuleSeries.mapLines.template.line.strokeOpacity = 0.3;
      graticuleSeries.fitExtent = false;

      chart.backgroundSeries.mapPolygons.template.polygon.fillOpacity = 0.1;
      chart.backgroundSeries.mapPolygons.template.polygon.fill = am4core.color('#ffffff');

      const hs = polygonTemplate.states.create('hover');
      hs.properties.fill = chart.colors.getIndex(3).brighten(-0.5);

      let animation: any;
      setTimeout(() => (animation = chart.animate({ property: 'deltaLongitude', to: 100000 }, 20000000)), 3000);

      chart.seriesContainer.events.on('down', (): void => {
        if (animation) {
          animation.stop();
        }
      });
    });
  }

  ngOnDestroy(): void {
    this.browserOnly(() => {
      if (this.chart) {
        this.chart.dispose();
      }
    });
  }
}
