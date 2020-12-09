import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'item-restaurant',
  templateUrl: './item-restaurant.component.html',
  styleUrls: ['./item-restaurant.component.css']
})
export class ItemRestaurantComponent implements OnInit {
  @Input() name: String;
  @Input() rating: Number;
  constructor() { }

  ngOnInit(): void {
  }

}
