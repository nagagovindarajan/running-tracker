import {Component, OnInit} from '@angular/core';
import {MapsAPILoader} from '@agm/core';

@Component({
  selector: 'app-plot',
  templateUrl: './route-plot.component.html',
  styleUrls: ['./route-plot.component.scss']
})
export class RoutePlotComponent implements OnInit {
  title = 'Running Tracker';
  latitude: number;
  longitude: number;
  zoom: number;
  address: string;
  private geoCoder;
  center: any = null;

  selectedLatLngs: Array<any> = [];
  distanceTraveled = 0;

  constructor(
    private mapsAPILoader: MapsAPILoader,
  ) {
  }


  ngOnInit() {
    this.mapsAPILoader.load().then(() => {
      this.setCurrentLocation();
      this.geoCoder = new google.maps.Geocoder();
    });
  }

  // Get Current Location Coordinates
  setCurrentLocation() {
    const root = this;
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 8;
        root.center = {                     // current location
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        this.getAddress(this.latitude, this.longitude);
      });
    }
  }


  markerDragEnd($event: any) {
    const latLangObj: any = JSON.parse(JSON.stringify($event));
    this.latitude = latLangObj.latLng.lat;
    this.longitude = latLangObj.latLng.lng;
    console.log('Lat lng ', this.latitude + ' ' + this.longitude);
    if (this.selectedLatLngs.length > 0){
      const curDistance: number = google.maps.geometry.spherical.computeDistanceBetween(
        this.selectedLatLngs[this.selectedLatLngs.length - 1], latLangObj.latLng);
      this.distanceTraveled = this.distanceTraveled + curDistance;
    }
    this.getAddress(this.latitude, this.longitude);
  }

  getAddress(latitude, longitude) {
    this.selectedLatLngs.push({lat: this.latitude, lng: this.longitude});
    this.geoCoder.geocode({location: {lat: latitude, lng: longitude}}, (results, status) => {
      console.log(results);
      console.log(status);
      if (status === 'OK') {
        if (results[0]) {
          this.zoom = 20;
          this.address = results[0].formatted_address;
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }
    });
  }
}
