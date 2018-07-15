import 'es6-promise/auto';
import * as React from 'react';
import * as _ from 'lodash';
import * as fetch from 'isomorphic-fetch';
import PlaceFormContainer from './place-form-container';

interface IAutoComplete {
    place_id: string;
    description: string;
    latitude:string;
    longitude:string;
}

interface PlaceContainerState{
    autoCompleteFillList: Array<IAutoComplete>;
    latitude:string;
    longitude:string;
    displayDropDown: boolean;
    cityDescription:string;
}

class PlaceContainer extends React.Component<any, any>{
    constructor(props: any) {
        super(props)
        this.state={
            autoCompleteFillList: new Array<IAutoComplete>(),
            latitude: '',
            longitude: '',
            displayDropDown:false,
            cityDescription: ''
        }
    }

    fetchFromAPI(apiUrl: string): any {
        fetch(apiUrl).then(response => {
            if (response.status >= 200 && response.status < 300) {
                console.log("Success");
            }
            return response.json();
        }).then(body => {
            console.log(body);
            this.setState({
                autoCompleteFillList : body,
                displayDropDown:true
            });
        })
    }
    handleInputChange(inputText: string): void {
        var autoCompleteUrl = "/autofillcities?input=" + inputText;
        this.fetchFromAPI(autoCompleteUrl);
    }
    
    buttonSubmit(): boolean {
        var latitude= this.state.latitude;
        var longitude = this.state.longitude;
        var url = "/Submit?&latitude="+latitude+"&longitude="+longitude;
        this.fetchFromAPI(url);
        return false;
    }

    fetchGeoLocation(apiUrl: string): void {
        fetch(apiUrl).then(response => {
            if (response.status >= 200 && response.status < 300)
            {
                console.log("Success");
            }
            return response.json();
        }).then(body => {
            var description = body.city+', '+body.state+', '+body.country;
            this.setState({
                autoFillList: new Array<IAutoComplete>(),
                cityDescription:description
            });
        });
    }
    geolocation(): void {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.success.bind(this));
        } else {
            console.log("No geo location");
        }
    }

    googleAutoCompleteSelect(placeId: string): string {
        console.log(placeId);
        var autoPlace = this.state.autoCompleteFillList.filter(it => it.place_id == placeId);
        if (autoPlace.length > 0) {

            this.setState({
                autoCompleteFillList: new Array<IAutoComplete>(),
                latitude: autoPlace[0].latitude,
                longitude: autoPlace[0].longitude,
            });
            return autoPlace[0].description;
        }
        return "";
    }

    success(position :any): void {
        var lat = position.coords.latitude;
        var long = position.coords.longitude;
        this.setState({
            latitude: lat,
            longitude:long
        })
        console.log('Your latitude is :' + lat + ' and longitude is ' + long);
        var goeLocationUrl = "/GetGeoLocation?latitude=" + lat + "&longitude=" + long;
        this.fetchGeoLocation(goeLocationUrl);
    }
    
    render() {
        const display = this.state.displayList;
        return (
            <div>
                <PlaceFormContainer geoLocation={this.geolocation.bind(this)} 
                handleInput ={this.handleInputChange.bind(this)}  
                googleAutoCompleteSelect={this.googleAutoCompleteSelect.bind(this)}
                autoCompleteList={this.state.autoCompleteFillList} displayDropDown={this.state.displayDropDown} cityDescription={this.state.cityDescription}  />
            </div>
        );
    }

}

export default PlaceContainer;