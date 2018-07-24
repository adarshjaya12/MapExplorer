import 'es6-promise/auto';
import * as React from 'react';
import * as _ from 'lodash';
import * as fetch from 'isomorphic-fetch';
import PlaceFormContainer from './place-form-container';
import {PlaceObject,IAutoComplete,TypeResultObject,INearBySearchResult} from '../classes/class'
import PlaceListContainer from './place-list-container';


interface PlaceContainerState{
    autoCompleteFillList: Array<IAutoComplete>;
    latitude:string;
    longitude:string;
    displayDropDown: boolean;
    cityDescription:string;
    nearBySearchList: Array<INearBySearchResult>;
    displaySearchList:boolean;
}

class PlaceContainer extends React.Component<any, PlaceContainerState>{
    constructor(props: any) {
        super(props)
        this.state={
            autoCompleteFillList: new Array<IAutoComplete>(),
            nearBySearchList: new Array<INearBySearchResult>(),
            latitude: '',
            longitude: '',
            displayDropDown:false,
            cityDescription: '',
            displaySearchList:false,
        }
    }

    fetchFromAPIForInputChange(apiUrl: string): any {
        fetch(apiUrl).then(response => {
            if (response.status >= 200 && response.status < 300) {
            }
            return response.json();
        }).then(body => {
            this.setState({
                autoCompleteFillList : body,
                displayDropDown:true
            });
        })
    }
    handleInputChange(inputText: string): void {
        var autoCompleteUrl = "/autofillcities?input=" + inputText;
        this.fetchFromAPIForInputChange(autoCompleteUrl);
    }
    
    buttonSubmit(): boolean {
        var latitude= this.state.latitude;
        var longitude = this.state.longitude;
        var url = "/Submit?&latitude="+latitude+"&longitude="+longitude;
        fetch(url).then(response => {
            if (response.status >= 200 && response.status < 300) {
            }
            return response.json();
        }).then(body => {
            this.setState({
                nearBySearchList : body,
                displaySearchList:true
            });
        })
        return false;
    }

    fetchGeoLocation(apiUrl: string): void {
        fetch(apiUrl).then(response => {
            if (response.status >= 200 && response.status < 300)
            {
            }
            return response.json();
        }).then(body => {
            var description = body.city+', '+body.state+', '+body.country;
            this.setState({
                autoCompleteFillList: new Array<IAutoComplete>(),
                cityDescription:description
            });
        });
    }
    geolocation(): void {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.success.bind(this));
        } else {
        }
    }
    fetchLatLong(apiurl:string):void{
        fetch(apiurl).then(response => {
            if (response.status >= 200 && response.status < 300)
            {
            }
            return response.json();
        }).then(body => {
            this.setState({
                latitude:body.latitude,
                longitude:body.longitude
            });
        });
    }
    googleAutoCompleteSelect(placeId: string): string {
        var autoPlace = this.state.autoCompleteFillList.filter(it => it.place_id == placeId);
        var apiurl = '/GetLatAndLong?place_id='+placeId;
        if (autoPlace.length > 0) {
            this.setState({
                autoCompleteFillList: new Array<IAutoComplete>(),
            });
            this.fetchLatLong(apiurl);
            return autoPlace[0].description;
        }
        return "";
    }

    success(position :any): void {
        var lat = this.state.latitude;
        var long = this.state.longitude;
        var goeLocationUrl = "/GetGeoLocation?latitude=" + lat + "&longitude=" + long;
        this.fetchGeoLocation(goeLocationUrl);
    }
    
    render() {
        return (
            <div>
                <div>
                    <PlaceFormContainer geoLocation={this.geolocation.bind(this)} 
                    handleInput ={this.handleInputChange.bind(this)}  
                    googleAutoCompleteSelect={this.googleAutoCompleteSelect.bind(this)}
                    autoCompleteList={this.state.autoCompleteFillList}
                    displayDropDown={this.state.displayDropDown} 
                    cityDescription={this.state.cityDescription}
                    buttonSubmit={this.buttonSubmit.bind(this)}  />
                </div>
                <div>
                    {
                        (this.state.displaySearchList) ?
                        <PlaceListContainer nearBySearchList={this.state.nearBySearchList} />
                        :
                        <div></div>
                    }
                </div>
            </div>
        );
    }

}

export default PlaceContainer;