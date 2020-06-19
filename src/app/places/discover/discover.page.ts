import { Component, OnInit, OnDestroy } from '@angular/core';
import { PlacesService } from '../places.service';
import { Place } from '../places.model';
import { MenuController } from '@ionic/angular';
import { SegmentChangeEventDetail } from '@ionic/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss'],
})
export class DiscoverPage implements OnInit, OnDestroy {
  loadedPlaces: Place[];
  relevantPlaces: Place[];
  private filter = 'all';
  private placesSub: Subscription;
  constructor(
    private placesService: PlacesService,
    private authService: AuthService,
    private menuCtrl: MenuController) { }

  ngOnInit() {
    this.placesSub = this.placesService.places.subscribe(places => {
      this.loadedPlaces = places;
      // this.relevantPlaces = this.loadedPlaces;
      this.onFilterUpdate(this.filter);
    });
  }

  onOpenMenu() {
    this.menuCtrl.toggle();
  }

  onFilterUpdate(filter: string) {
    const isShown = place => filter === 'all' || place.userId !== this.authService.userId;
    this.relevantPlaces = this.loadedPlaces.filter(isShown);
    this.filter = filter;
  }

  ngOnDestroy() {
    if (this.placesSub) {
      this.placesSub.unsubscribe();
    }
  }

}
