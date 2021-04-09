import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidatorService {
  static password_min_length = 4
  static username_min_length = 4
  constructor() { }
}
