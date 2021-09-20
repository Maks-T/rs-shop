import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { LocationService } from '../services/location.service';

@Component({
  selector: 'app-location-popup',
  templateUrl: './location-popup.component.html',
  styleUrls: ['./location-popup.component.scss'],
})
export class LocationPopupComponent implements OnInit {
  location = 'Минск';
  @Output() showLocationPopupFalse: EventEmitter<void> =
    new EventEmitter<void>();
  @Output() locationSendStr: EventEmitter<string> = new EventEmitter<string>();

  constructor(public locationService: LocationService) {}

  ngOnInit(): void {
    this.location = this.locationService.getStaticLocation();
  }

  clickBtnClose() {
    this.showLocationPopupFalse.emit();
  }

  sendLocation(location: string) {
    this.locationSendStr.emit(location);
    this.clickBtnClose();
  }
}
