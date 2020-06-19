import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Place } from '../../places.model';
import { ActivatedRoute } from '@angular/router';
import { PlacesService } from '../../places.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-offer-booking',
  templateUrl: './offer-booking.page.html',
  styleUrls: ['./offer-booking.page.scss'],
})
export class OfferBookingPage implements OnInit, OnDestroy {
  place: Place;
  private placesSub: Subscription;
  constructor(private route: ActivatedRoute, private navCtrl: NavController, private placesService: PlacesService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      if (!paramMap.has('placeId')) {
        this.navCtrl.navigateBack('/places/tabs/offers');
        return;
      }
      this.placesSub = this.placesService.getPlace(paramMap.get('placeId')).subscribe(places => {
        this.place = places;
      });
    });
  }

  ngOnDestroy() {
    if (this.placesSub) {
      this.placesSub.unsubscribe();
    }
  }

}
