import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-flight-card",
  templateUrl: "./flight-card.component.html",
  styleUrls: ["./flight-card.component.scss"],
})
export class FlightCardComponent implements OnInit {
 
  // @Input() allFlightsCombinations;
  @Input() defaultFlightDetails;
  
  constructor() {}

  ngOnInit(): void {
    console.log(this.defaultFlightDetails);
  }

  isflightDetails: boolean = false;

  showFlightDetails() {
    this.isflightDetails = !this.isflightDetails;
    return;
  }

  // =====================================================================================

  // using flightRankInArray as to which element to show from flight Details array

  // 
  getAirlineName(flightRankInArray: number): string {
    // if direct flights
    if (
      this.defaultFlightDetails.length === 1
    ) {
      return this.defaultFlightDetails[0].Airline.AirlineName;
    } else {
      // if Indirect flights
      //  need to handle  if we got two different airlines
      return this.defaultFlightDetails[0].Airline.AirlineName;

    }

  }
  getAirlineCode(flightRankInArray: number): string {
    // if direct flights
    if (
      this.defaultFlightDetails.length === 1
    ) {
      return this.defaultFlightDetails[0].Airline.AirlineCode;
    } else {
      // if Indirect flights
      //  need to handle  if we got two different airlines
      return this.defaultFlightDetails[0].Airline.AirlineCode;
    }
  }
  getCabinClass(flightRankInArray: number): string | number {
    let cabinClass: number | string;

    // if direct flights
    if (
      this.defaultFlightDetails.length === 1
    ) {
      cabinClass =
        this.defaultFlightDetails[0].CabinClass;
    } else {
      // if Indirect flights
      //  need to handle  if we got two different airlines
      cabinClass =
        this.defaultFlightDetails[0].CabinClass;
    }

    switch (cabinClass) {
      case 2:
        cabinClass = "Economy";
        break;
      case 3:
        cabinClass = "Premium Economy";
        break;
      case 4:
        cabinClass = "Business";
        break;
      case 5:
        cabinClass = "Premium Business";
        break;
      case 6:
        cabinClass = "First";
    }

    return cabinClass;
  }
  getFlightNumber(flightRankInArray: number): string {
    // if direct flights
    if (
      this.defaultFlightDetails.length === 1
    ) {
      return this.defaultFlightDetails[0].Airline.FlightNumber;
    } else {
      // if Indirect flights
      //  need to handle  if we got two different airlines
      return this.defaultFlightDetails[0].Airline.FlightNumber;

    }
  }


  getFirstOriginCity(flightRankInArray: number): string {
   
    return this.defaultFlightDetails[0].Origin.Airport.CityName;

  }

  getDepartDate(flightRankInArray: number): string {
    const departFlightDateTime =
      this.defaultFlightDetails[0].Origin
        .DepTime;

    const newDate = new Date(departFlightDateTime);

    const departDay = newDate.getDate();
    const departMonth = newDate.getMonth();
    const departYear = newDate.getFullYear();

    return `${departDay}:${departMonth}:${departYear}`;
  }
  getDepartureTime(flightRankInArray: number): string {
    // here it wolud be same for direct and indirect flights

    const departFlightDateTime =
      this.defaultFlightDetails[0].Origin
        .DepTime;

    const newDate = new Date(departFlightDateTime);
    let hours = newDate.getHours();

    let minutes = newDate.getMinutes();

    // Format the time as a string
    // Format the time as a string
    let formattedTime: string;
    if (hours <= 9 && minutes <= 9) {
      formattedTime = `0${hours}:0${minutes}`;
    } else if (hours <= 9) {
      formattedTime = `0${hours}:${minutes}`;
    } else if (minutes <= 9) {
      formattedTime = `${hours}:0${minutes}`;
    } else {
      formattedTime = `${hours}:${minutes}`;
    }

    return formattedTime;
  }


  getFlightDuration(flightRankInArray: number): string {
    let totalMinutes: number;

    // if direct flight
    if (
      this.defaultFlightDetails.length === 1
    ) {
      totalMinutes =
        this.defaultFlightDetails[0].AccumulatedDuration;
    } else {
      // if indirect flights
      totalMinutes =
        this.defaultFlightDetails[this.defaultFlightDetails.length - 1].AccumulatedDuration;
    }

    if (totalMinutes > 60) {
      const hours = Math.floor(totalMinutes / 60);
      const minutes = totalMinutes % 60;

      return `${hours}h ${minutes}m`;
    } else {
      return `${totalMinutes}m`;
    }
  }
  getFlightStops(flightRankInArray: number): string {
    let numberOfFlights: number =
      this.defaultFlightDetails.length;

    if (numberOfFlights === 1) return "Non Stop";
    else if (numberOfFlights === 2) {
      return `${numberOfFlights - 1} Stop`;
    } else {
      return `${numberOfFlights - 1} Stops`;
    }
  }
  getStopsImageUrl(flightRankInArray: number): string {
    let numberOfFlights: number =
      this.defaultFlightDetails.length;

    if (numberOfFlights === 1) {
      // journey is Non-Stop
      return"../../../assets/img/brand/nonStopFlight.png";
    } else if (numberOfFlights === 2) {
      // journey has 1 stop
      return "../../../assets/img/brand/flightStop1.png";
    } else if (numberOfFlights === 3) {
      // journey has 2 stops
     return "../../../assets/img/brand/flightStop2.png";
    } else if (numberOfFlights === 4) {
      // journey has 3 stops
      return "../../../assets/img/brand/flightStop3.png";
    } else {
      // journey has 3+ stops
      return"../../../assets/img/brand/flightStop4.png";
    }
  }


  getFinalDestinationCity(flightRankInArray: number): string {

    if(this.defaultFlightDetails.length === 1){
      return this.defaultFlightDetails[0].Destination.Airport.CityName;
    }
    else{
      return this.defaultFlightDetails[this.defaultFlightDetails.length - 1].Destination.Airport.CityName;
    }
   
  }
  getArrivalTime(flightRankInArray: number): string {
    let arrFlightDateTime: string;

    // if direct flight
    if (
      this.defaultFlightDetails.length === 1
    ) {
      arrFlightDateTime =
        this.defaultFlightDetails[0].Destination.ArrTime;
    } else {
      // if indirect flight
      arrFlightDateTime =
        this.defaultFlightDetails[
          this.defaultFlightDetails.length - 1
        ].Destination.ArrTime;
    }

    const newDate = new Date(arrFlightDateTime);
    let hours = newDate.getHours();

    let minutes = newDate.getMinutes();

    // Format the time as a string
    // Format the time as a string
    let formattedTime: string;
    if (hours <= 9 && minutes <= 9) {
      formattedTime = `0${hours}:0${minutes}`;
    } else if (hours <= 9) {
      formattedTime = `0${hours}:${minutes}`;
    } else if (minutes <= 9) {
      formattedTime = `${hours}:0${minutes}`;
    } else {
      formattedTime = `${hours}:${minutes}`;
    }

    return formattedTime;
  }
  getArrDate(flightRankInArray: number): string {
    let arrFlightDateTime: string;

    // if direct flight
    if (
      this.defaultFlightDetails.length === 1
    ) {
      arrFlightDateTime =
        this.defaultFlightDetails[0].Destination
          .ArrTime;
    } else {
      // if indirect flight
      arrFlightDateTime =
        this.defaultFlightDetails[
          this.defaultFlightDetails.length - 1
        ].Destination.ArrTime;
    }

    const newDate = new Date(arrFlightDateTime);

    const departDay = newDate.getDate();
    const departMonth = newDate.getMonth();
    const departYear = newDate.getFullYear();

    return`${departDay}:${departMonth}:${departYear}`;
  }



  // getFlightFare(flightRankInArray: number): string {
  //   // calculating per Adult fare

  //   let baseFare =
  //     this.flightDetails.flightData[flightRankInArray].fareBreakdown[0]
  //       .BaseFare;
  //   let tax =
  //     this.flightDetails.flightData[flightRankInArray].fareBreakdown[0].Tax;
  //   let passengerCount =
  //     this.flightDetails.flightData[flightRankInArray].fareBreakdown[0]
  //       .PassengerCount;

  //   let adultFare = String((baseFare + tax) / passengerCount);

  //   // adultFare.toString();
  //   // Add commas to the integer part
  //   adultFare = adultFare.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  //   return adultFare;
  // }
  // isRefundable(flightRankInArray: number): boolean {
  //   return this.flightDetails.flightData[flightRankInArray].refundable;
  // }
}
