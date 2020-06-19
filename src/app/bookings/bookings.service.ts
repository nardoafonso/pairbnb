import { Injectable } from '@angular/core';
import { Booking } from './booking.model';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { take, tap, delay } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class BookingsService {
    private _booking = new BehaviorSubject<Booking[]>([]);

    constructor(private authService: AuthService) { }

    get bookings() {
        return this._booking.asObservable();
    }

    addBooking(
        placedId: string,
        placeTitle: string,
        placedImage: string,
        firstName: string,
        lastName: string,
        guestNumber: number,
        dateFrom: Date,
        dateTo: Date,
    ) {
        const newBooking = new Booking(
            Math.random().toString(),
            placedId,
            this.authService.userId,
            placeTitle,
            placedImage,
            firstName,
            lastName,
            guestNumber,
            dateFrom,
            dateTo);

        return this.bookings.pipe(take(1), delay(1000), tap(bookings => {
            this._booking.next(bookings.concat(newBooking));
        }));
    }

    cancelBooking(bookingId: string) {
        return this.bookings.pipe(take(1), delay(1000), tap(bookings => {
            this._booking.next(bookings.filter(b => b.id !== bookingId));
        }));
    }
}
