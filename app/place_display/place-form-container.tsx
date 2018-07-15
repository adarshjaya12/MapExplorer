import 'es6-promise/auto';
import * as React from 'react';
import * as _ from 'lodash';
import * as fetch from 'isomorphic-fetch';
import AutoCompleteDisplay from './address-autocomplete-display'
interface IAutoComplete {
    place_id: string;
    description: string;
    latitude:string;
    longitude:string;
}

interface PlaceFormProps{
    geoLocation:() => void;
    handleInput:(inputString: string) => void;
    googleAutoCompleteSelect:(placeId:string) =>string;
    autoCompleteList: Array<IAutoComplete>;
    displayDropDown:boolean;
    cityDescription:string;
}

class PlaceFormContainer extends React.Component<PlaceFormProps, any>{
    constructor(props: any) {
        super(props)
        console.log(this.props.autoCompleteList);
        console.log(this.props.displayDropDown);
        console.log(this.props.cityDescription);
    }
    goeClick():void{
        var cityDescription = this.props.geoLocation();
        var input = this.refs.autoCompletePlaces as any;
        if(input != ''){
            input.value = this.props.cityDescription;
        }
    }

    handleInputChange(eve):void{
        var inputText = eve.target.value as string;
        this.props.handleInput(inputText);
    }

    selectedFromAutofill(placeId):void{
        console.log(placeId);
        var cityDescription = this.props.googleAutoCompleteSelect(placeId);
        var input = this.refs.autoCompletePlaces as any;
        if(input != undefined){
            input.value = cityDescription;
        }
    }
    render() {
        return (
            <div>
                <input type="text"  id="autocomplete-text" placeholder="Enter the city" onChange={this.handleInputChange.bind(this)} ref="autoCompletePlaces" />
                <button onClick={this.goeClick.bind(this)}>Geo</button>
                <div>
                    {
                        (this.props.displayDropDown) ?
                        (<ul className="auto-complete-list" >
                            {this.props.autoCompleteList.map(item =>
                                <AutoCompleteDisplay selectedFromAutofill={this.selectedFromAutofill.bind(this)} list={item} />
                            )}
                        </ul>)
                        :
                        (<div></div>)
                    }
                </div>
            </div>
        );
    }

}

export default PlaceFormContainer;