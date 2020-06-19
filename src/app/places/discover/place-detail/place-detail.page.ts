import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NavController, ModalController, ActionSheetController, LoadingController } from '@ionic/angular';
import { PlacesService } from '../../places.service';
import { Place } from '../../places.model';
import { CreateBookingComponent } from '../../../bookings/create-booking/create-booking.component';
import { Subscription } from 'rxjs';
import { BookingsService } from '../../../bookings/bookings.service';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'app-place-detail',
  templateUrl: './place-detail.page.html',
  styleUrls: ['./place-detail.page.scss'],
})
export class PlaceDetailPage implements OnInit, OnDestroy {
  place: Place;
  isBookable = false;
  private placeSub: Subscription;
  constructor(
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private placesService: PlacesService,
    private modalCtrl: ModalController,
    private bookingService: BookingsService,
    private loadingCtrl: LoadingController,
    private authService: AuthService,
    private actionSheetCtrl: ActionSheetController) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      if (!paramMap.has('placeId')) {
        this.navCtrl.navigateBack('/places/tabs/discover');
        return;
      }
      this.placeSub = this.placesService.getPlace(paramMap.get('placeId')).subscribe(place => {
        this.place = place;
        this.isBookable = place.userId !== this.authService.userId;
      });
    });
  }

  onBookPlace() {
    // this.router.navigateByUrl('/places/tabs/discover');
    // this.navCtrl.navigateBack('/places/tabs/discover');
    this.actionSheetCtrl.create({
      header: 'Choose an Action',
      buttons: [
        {
          text: 'Select Date',
          handler: () => { this.openBookingModal('select'); }
        },
        {
          text: 'Random Date',
          handler: () => { this.openBookingModal('random'); }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    }).then(actinoSheetEl => {
      actinoSheetEl.present();
    });
  }

  openBookingModal(mode: 'select' | 'random') {
    console.log(mode);
    this.modalCtrl.create({
      component: CreateBookingComponent,
      componentProps: { selectedPlace: this.place, selectedMode: mode }
    }).then(modalEl => {
      modalEl.present();
      return modalEl.onDidDismiss();
    }).then(resultData => {
      this.loadingCtrl.create({
        message: 'Booking place...'
      }).then(el => {
        el.present();
        this.bookingService.addBooking(
          this.place.id,
          this.place.title,
          this.place.imageUrl,
          resultData.data.bookingData.firstName,
          resultData.data.bookingData.lastName,
          resultData.data.bookingData.guestNumber,
          resultData.data.bookingData.startDate,
          resultData.data.bookingData.endDate).subscribe(() => {
            el.dismiss();
          });
      });
    });
  }

  ngOnDestroy() {
    if (this.placeSub) {
      this.placeSub.unsubscribe();
    }
  }

}
