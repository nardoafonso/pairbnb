import { Injectable } from '@angular/core';
import { Place } from './places.model';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {
  private _places: Place[] = [
    new Place(
      'p1',
      'Manhattan Mansion',
      'In the heart of NYC',
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80',
      149.99
    ),
    new Place(
      'p2',
      'LAmour Toujour',
      'Romantic place in paris',
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80',
      189.99
    ),
    new Place(
      'p3',
      'The Foggy Palace',
      'Not you average city trip',
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80',
      99.99
    )
  ];

  constructor() { }

  getPlaces() {
    return [...this._places];
  }

  getPlace(placeId: string) {
    return { ...this._places.find(p => p.id === placeId) };
  }
}
