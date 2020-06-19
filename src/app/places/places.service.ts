import { Injectable } from '@angular/core';
import { Place } from './places.model';
import { AuthService } from '../auth/auth.service';
import { BehaviorSubject } from 'rxjs';
import { take, map, tap, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {
  private _places = new BehaviorSubject<Place[]>([
    new Place(
      'p1',
      'Manhattan Mansion',
      'In the heart of NYC',
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80',
      149.99,
      new Date('2020-01-01'),
      new Date('2020-12-31'),
      'abc'
    ),
    new Place(
      'p2',
      'LAmour Toujour',
      'Romantic place in paris',
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80',
      189.99,
      new Date('2020-01-01'),
      new Date('2020-12-31'),
      'abc'
    ),
    new Place(
      'p3',
      'The Foggy Palace',
      'Not you average city trip',
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80',
      99.99,
      new Date('2020-01-01'),
      new Date('2020-12-31'),
      'abc'
    ),
    new Place(
      'p4',
      'Oca Citty',
      'Not you average city trip',
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80',
      99.99,
      new Date('2020-01-01'),
      new Date('2020-12-31'),
      'zxc'
    ),
    new Place(
      'p5',
      'Mango Jungle',
      'Not you average city trip',
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80',
      99.99,
      new Date('2020-01-01'),
      new Date('2020-12-31'),
      'dfg'
    ),
    new Place(
      'p6',
      'Boogie Uggie',
      'Not you average city trip',
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80',
      99.99,
      new Date('2020-01-01'),
      new Date('2020-12-31'),
      'dfg'
    )
  ]);

  constructor(private authService: AuthService) { }

  get places() {
    return this._places.asObservable();
  }

  getPlace(placeId: string) {
    return this.places.pipe(take(1), map(places => {
      return { ...places.find(p => p.id === placeId) };
    }));
  }

  addPlace(title: string, description: string, price: number, dateFrom: Date, dateTo: Date) {
    const newPlace = new Place(
      Math.random().toString(),
      title,
      description,
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80',
      price,
      dateFrom,
      dateTo,
      this.authService.userId);
    return this.places
      .pipe(take(1), delay(1000), tap((places) => { this._places.next(places.concat(newPlace)); }));
  }

  updateOffer(placeid: string, title: string, description: string) {
    return this.places.pipe(take(1),
      delay(1000),
      tap(places => {
        const updatedPlaceIndex = places.findIndex(pl => pl.id === placeid);
        const updatedPlaces = [...places];
        const old = updatedPlaces[updatedPlaceIndex];
        updatedPlaces[updatedPlaceIndex] = new Place(
          old.id,
          title,
          description,
          old.imageUrl,
          old.price,
          old.availableFrom,
          old.availableTo,
          old.userId);
        this._places.next(updatedPlaces);
      }));

  }
}
