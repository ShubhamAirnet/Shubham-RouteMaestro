import { Component, OnInit, TemplateRef, inject } from "@angular/core";
import { FlightsService } from "src/app/Services/flights_api/flights.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-itinerary",
  templateUrl: "./itinerary.component.html",
  styleUrls: ["./itinerary.component.scss"],
})
export class ItineraryComponent implements OnInit {
  airlineName: string;
  departureTime: string;
  originCity: string;
  duration: string;
  arrivalTime: string;
  destinationCity: string;
  fare: string;

  allFlights = {};

  // powerSet which contains all the similar kinda flightSets
  currentFlightPowerSetArray = [];
  currentFlightPowerSetKey: string;

  // global variable which will remain constant for the current flight powerSet
  publishedFare: string;
  offeredFare: string;

  // object containing all the details about the whole current flight set
  currentFlightSet;

  // this contains all the multiStop arrays ( [length=total cities to travel+origin] excluding the layovers/Indirect stops)
  currentFlightSetSegmentsArray = [];

  // array containing all the sets from the currentFlightPowerSet.
  // (this contains all the options one can choose to cutomize the curernt flight combination set)
  alternateflightSets = {};

  alternateFlightsPowerSet = {};


  // currentFlightSetKey;

  // currentFlightCombinationObject;

  // currentFlightCombinationArray = [];

  // currentFlightSetIndex: number;

  isFlightOptionsAvailable: boolean = false;

  showFlightOptions() {
    this.isFlightOptionsAvailable = !this.isFlightOptionsAvailable;
    // this.settingAlternateFlightOptions();
    return;
  }

  isFareSummaryAvailable = false;

  constructor(private flightApiService: FlightsService) {}

  ngOnInit(): void {}

  authenticateFlightApi() {
    this.flightApiService.authenticate().subscribe(
      (data: { token: string }) => {
        console.log(data.token);
        localStorage.setItem("authenticateToken", data.token);
      },
      (err) => {
        console.log(err, "error aa gya");
      }
    );
  }

  async multiStopSearchFlights() {
    try {
      const data: any = await this.flightApiService.multiStopSearchFlights();

      if (data) {
        this.allFlights = data.flightsData;

        console.log(this.allFlights);

        //  keys of the AllFlights (AllFlights is an object containing Key-Value pairs)
        const keys = Object.keys(this.allFlights);
        console.log(keys);

        this.currentFlightPowerSetKey = keys[0];

        // this.settingCurrentFlightPowerSet(this.currentFlightPowerSetKey);
        this.settingCurrentFlightPowerSet("32");

        // assigning group for the rest of the key-value pairs
        // this.alternateFlightsGroup = {};
        // for (let i = 1; i < keys.length; i++) {
        //   this.alternateFlightsGroup[keys[i]] = this.allFlights[keys[i]];
        // }
      }
    } catch (err) {
      console.log(err);
    }
  }

  settingCurrentFlightPowerSet(key: string) {
    this.currentFlightPowerSetArray = this.allFlights[key];

    // changing the global variables used in Fare Summary
    this.publishedFare = this.currentFlightPowerSetArray[0].fare.PublishedFare;
    this.offeredFare = this.currentFlightPowerSetArray[0].fare.OfferedFare;

    // calling the function for setting the current (individual) flight set 
    this.settingCurrentFlightSet(
      this.currentFlightPowerSetArray[0].resultIndex
    );
    console.log(this.currentFlightPowerSetArray);
    console.log(this.publishedFare);
    console.log(this.offeredFare);
  }

  // need to  initialize currentFlightIdx variable
  settingCurrentFlightSet(currentFlightResultIdx: string) {
    this.currentFlightSet = this.currentFlightPowerSetArray.filter(
      (flightSet) => flightSet.resultIndex === currentFlightResultIdx
    );

    console.log(this.currentFlightSet);

    this.currentFlightSetSegmentsArray = this.currentFlightSet[0].segments;

    console.log(this.currentFlightSetSegmentsArray);

    this.alternateFlightSetsAvailable();
  }

  alternateFlightSetsAvailable() {

    for(let i=0;i<this.currentFlightSetSegmentsArray.length;i++){

      let arr1=this.currentFlightSetSegmentsArray[i];

      for(let j=0;j<this.currentFlightPowerSetArray.length;j++){

        let arr2=this.currentFlightPowerSetArray[j].segments[i];

        // first we will check if the flightCombination Arrays are similar or not
        if (this.isSimilarFlightCombination(arr1, arr2)) {
          continue;
        } else {
          // Make sure alternateflightSets[i] is an array before pushing values into it
          if (!Array.isArray(this.alternateflightSets[i])) {
            this. alternateflightSets[i] = []; // Initialize as an empty array if not already an array
          }
          //adding that flightSet to the array in the alternateFlightSets group (key-->idx of currentFlightSetSegment flightCombination);
          this.alternateflightSets[i].push(this.currentFlightPowerSetArray[j].resultIndex);
        }
      }

    }

    console.log(this.alternateflightSets);
  }

  // flight Combination: Flight combination is the list of flights from origin to destination (a-->b)
  // it includes all the layovers and all INDIRECT FLIGHTS

  isSimilarFlightCombination(arr1, arr2) {
    let value = false;
    if (arr1.length !== arr2.length) return false;

    for (let i = 0; i < arr1.length; i++) {
      if (
        arr1[i].Destination.ArrTime === arr2[i].Destination.ArrTime &&
        arr1[i].Origin.DepTime === arr2[i].Origin.DepTime &&
        arr1[i].Duration === arr2[i].Duration
      ) {
        value = true;
      } else {
        return false;
      }
    }

    return true;
  }

  




  settingAlternateFlightsPowerSet() {
    // for now we will be using allflights excluding the currentPowerSet key-value pair
  }

  // (setting-up / assigning values) the all the variables related to currentflight
  // settingCurrentFlight(currentFlightResultIndex) {
  //   // changing the currentFlightIdx global variable
  //   this.currentFlightIdx = currentFlightResultIndex;

  //   // getting the flight details Object by providing the resultIdx and Storing it
  //   const currentFlightObject = this.getCurrentFlightsCombinationDetails(
  //     currentFlightResultIndex
  //   );

  //   // assigning the flights of currentFlightSet  to an array
  //   this.currentFlightCombinationArray = currentFlightObject.segments;

  //   // changing the global variables used in Fare Summary
  //   this.publishedFare = currentFlightObject.fare.PublishedFare;
  //   this.offeredFare = currentFlightObject.fare.OfferedFare;

  //   console.log(this.publishedFare);
  //   console.log(this.offeredFare);
  //   console.log(this.currentFlightCombinationArray);
  // }

  // // to get all the details of some flightSet by providing its ResultIdx
  // getCurrentFlightsCombinationDetails(resultIdx: string) {
  //   return this.allFlights.find((flightCombination) => {
  //     return flightCombination.resultIndex === resultIdx;
  //   });
  // }

  // changeFlightCombination(resultIdx: string) {
  //   this.settingCurrentFlight(resultIdx);

  //   // window.location.reload();
  // }

  // // setting up all the variable related to the alternate flightSet-Combinations
  // settingAlternateFlightOptions(): void {
  //   const alternateFlightSetArray = this.getAlternateFlightCombinations();

  //   this.alternateFlightCombinations = alternateFlightSetArray;
  //   // console.log(this.alternateFlightCombinations);
  // }

  // // to get all the details of flightSets other than, the result Index provided
  // getAlternateFlightCombinations() {
  //   return this.allFlights.filter((flightCombination) => {
  //     return flightCombination.resultIndex !== this.currentFlightIdx;
  //   });
  // }

  private modalService = inject(NgbModal);

  openXl(content: TemplateRef<any>) {
    this.modalService.open(content, { size: "xl" });
  }

  dismissModal(modal: any) {
    modal.dismiss("Cross click");
  }

  closeModal(modal: any) {
    modal.close("Close click");
  }
}
