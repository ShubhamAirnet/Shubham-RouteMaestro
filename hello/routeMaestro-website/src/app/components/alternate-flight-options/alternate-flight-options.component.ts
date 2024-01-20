import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-alternate-flight-options',
  templateUrl: './alternate-flight-options.component.html',
  styleUrls: ['./alternate-flight-options.component.scss']
})
export class AlternateFlightOptionsComponent implements OnInit {
 
  @Input() alternateFlightSets;

  constructor() { }

  ngOnInit(): void {
    console.log(this.alternateFlightSets)
  }
  isOpen = true;

  openModal() {
    this.isOpen = true;
  }

  closeModal() {
    this.isOpen = false;
  }
}
