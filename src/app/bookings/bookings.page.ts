import { Component, OnInit, OnDestroy } from '@angular/core';
import { BookingsService } from './bookings.service';
import { Booking } from './booking.model';
import { IonItemSliding, LoadingController } from '@ionic/angular';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.page.html',
  styleUrls: ['./bookings.page.scss'],
})
export class BookingsPage implements OnInit, OnDestroy {
  loadedBookings: Booking[];
  bookingsSub: Subscription;

  constructor(private bookingsService: BookingsService, private loadingCtrl: LoadingController) { }

  ngOnInit() {
    this.bookingsSub = this.bookingsService.bookings.subscribe(bookings => {
      this.loadedBookings = bookings;
    });
  }

  onCancelBooking(bookingId: string, slidingEl: IonItemSliding) {
    this.loadingCtrl.create({
      message: 'Cancelling booking...'
    }).then(el => {
      el.present();
      slidingEl.close();
      this.bookingsService.cancelBooking(bookingId).subscribe(() => {
        el.dismiss();
      });
    });
  }

  ngOnDestroy() {
    this.bookingsSub.unsubscribe();
  }

}
