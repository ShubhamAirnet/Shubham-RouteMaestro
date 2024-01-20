import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-flight-set-card",
  templateUrl: "./flight-set-card.component.html",
  styleUrls: ["./flight-set-card.component.scss"],
})
export class FlightSetCardComponent implements OnInit {
  @Input() flightSet;
  flightSetSegmentsArray = [];

  constructor() {}

  ngOnInit(): void {
    console.log(this.flightSet);
    this.flightSetSegmentsArray = this.flightSet.segments;
    console.log(this.flightSetSegmentsArray);
    console.log("=========================================");
  }

  // ORIGIN BLOCK
  getOriginAirportCode(oneCompleteFlight) {
    if (oneCompleteFlight.length === 1) {
      return oneCompleteFlight[0].Origin.Airport.AirportCode;
    } else {
      return oneCompleteFlight[0].Origin.Airport.AirportCode;
    }
  }
  getDepartureTime(oneCompleteFlight){

    const dateString = oneCompleteFlight[0].Origin.DepTime;
    const dateObject = new Date(dateString);
    
    // Get the time components
    const hours = dateObject.getHours().toString().padStart(2, '0');
    const minutes = dateObject.getMinutes().toString().padStart(2, '0');
    
    // Combine hours and minutes
    const formattedTime = `${hours}:${minutes}`;
    
    
    return formattedTime ;

  }
  getOriginFlightDate(oneCompleteFlight) {

    if (oneCompleteFlight.length === 1) {

      const dateString = oneCompleteFlight[0].Origin.DepTime;
      const dateObject = new Date(dateString);

      // Formatting options for the date
      const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short' };

      // Format the date using the options
      const formattedDate = dateObject.toLocaleDateString("en-US", options);

      return formattedDate ;
    } else {
      const dateString = oneCompleteFlight[0].Origin.DepTime;
      const dateObject = new Date(dateString);

      // Formatting options for the date
      const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short' };

      // Format the date using the options
      const formattedDate = dateObject.toLocaleDateString("en-US", options);

      return formattedDate ;
    }
  }

  
  getOriginAirportTerminal(oneCompleteFlight){

    return oneCompleteFlight[0].Origin.Airport.Terminal;

  }
  getOriginAirportName(oneCompleteFlight){

    return oneCompleteFlight[0].Origin.Airport.AirportName;

  }
  
  getOriginAirportCityName(oneCompleteFlight){

    return oneCompleteFlight[0].Origin.Airport.CityName;

  }
  
  


  getFlightDuration(oneCompleteFlight){
    let totalMinutes: number;

    // if direct flight
    if (
      oneCompleteFlight.length === 1
    ) {
      totalMinutes =oneCompleteFlight[0].AccumulatedDuration;
    } else {
      // if indirect flights
      totalMinutes =oneCompleteFlight[oneCompleteFlight.length - 1].AccumulatedDuration;
    }

    if (totalMinutes > 60) {
      const hours = Math.floor(totalMinutes / 60);
      const minutes = totalMinutes % 60;

      return `${hours}h ${minutes}m`;
    } else {
      return `${totalMinutes}m`;
    }
  }


  getFirstLayoverCity(oneCompleteFlight){

  }
  isTerminalExist(oneCompleteFlight){

    const terminalValue =   oneCompleteFlight[0].Origin.Airport.Terminal;
    if(terminalValue===null || terminalValue==="" ){
      return false;
    }
    else{
      return true;
    }
  }

// DESTINATION BLOCK
getArrivalTime(oneCompleteFlight){

  let dateString;

  if(oneCompleteFlight.length===1){
    dateString = oneCompleteFlight[0].Destination.ArrTime;
  }else{
    dateString = oneCompleteFlight[oneCompleteFlight.length-1].Destination.ArrTime;
  }

  const dateObject = new Date(dateString);
    
    // Get the time components
    const hours = dateObject.getHours().toString().padStart(2, '0');
    const minutes = dateObject.getMinutes().toString().padStart(2, '0');
    
    // Combine hours and minutes
    const formattedTime = `${hours}:${minutes}`;
    
    
    return formattedTime ;

}

getDestinationCityAirportCode(oneCompleteFlight){

  if(oneCompleteFlight.length===1){

    return oneCompleteFlight[0].Destination.Airport.AirportCode;
  }
  else{
    return oneCompleteFlight[oneCompleteFlight.length-1].Destination.Airport.AirportCode;
  }

}

getDestinationFlightDate(oneCompleteFlight){

  let dateString;

  if (oneCompleteFlight.length === 1) {
     dateString = oneCompleteFlight[0].Destination.ArrTime;
  } 
  else {
     dateString = oneCompleteFlight[oneCompleteFlight.length-1].Destination.ArrTime;
  }
  const dateObject = new Date(dateString);

    // Formatting options for the date
    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short' };

    // Format the date using the options
    const formattedDate = dateObject.toLocaleDateString("en-US", options);

    return formattedDate ;
}


getDestinationAirportTerminal(oneCompleteFlight){
if(oneCompleteFlight.length===1){
  return oneCompleteFlight[0].Destination.Airport.Terminal;
}
else{
  return oneCompleteFlight[oneCompleteFlight.length-1].Destination.Airport.Terminal;

}


}
getDestinationAirportName(oneCompleteFlight){

  if(oneCompleteFlight.length===1){
    return oneCompleteFlight[0].Destination.Airport.AirportName;
  }
  else{
    return oneCompleteFlight[oneCompleteFlight.length-1].Destination.Airport.AirportName;
  
  }

}

getDestinationAirportCityName(oneCompleteFlight){

  if(oneCompleteFlight.length===1){
    return oneCompleteFlight[0].Destination.Airport.CityName;
  }
  else{
    return oneCompleteFlight[oneCompleteFlight.length-1].Destination.Airport.CityName;
  
  }

}


// FARE SECTION

getPublishedFareDifference(){

  return this.flightSet.fare.PublishedFare
}

getIncentiveEarned(){

  const totalIncentive=(this.flightSet.fare.PublishedFare)-(this.flightSet.fare.OfferedFare)

  return totalIncentive;

}



}
