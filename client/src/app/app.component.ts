//app.component.ts

import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { MapsAPILoader, MouseEvent } from '@agm/core';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title: string = 'AGM project';
  private geoCoder;
  geoObj : any;
  dataNotFound : boolean = false;

  @ViewChild('search')
  public searchElementRef: ElementRef;


  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone, private _dataService : DataService
  ) { }


  ngOnInit() {
    this.mapsAPILoader.load().then(() => {
      // this.setCurrentLocation();
      this.geoCoder = new google.maps.Geocoder;
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement);
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
          //set latitude, longitude and zoom
          let latitude = place.geometry.location.lat();
          let longitude = place.geometry.location.lng();
          this.getData(latitude, longitude);
        });
      });
    });
  }

  getData(lat, long){
    this.dataNotFound = false;
    this.geoObj = {};
    let url = `/coordinates?lat=${lat}&long=${long}`
    this._dataService.get(url).subscribe(res=>{
      if(res['data']) this.geoObj = res['data'];
      else if(res['message']){
        this.dataNotFound = true;
      }
    }, err=>{
      this.dataNotFound = true;
    })
  }

}
