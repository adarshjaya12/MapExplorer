import 'es6-promise/auto';
import * as React from 'react';
import * as _ from 'lodash';
import * as fetch from 'isomorphic-fetch';
import {PlaceObject,IAutoComplete,TypeResultObject,INearBySearchResult} from '../classes/class'


interface PlaceListContainerProps{
    nearBySearchList: Array<INearBySearchResult>;
}

interface PlaceListContainerState{
    nearByTypeList: Array<string>;
    displayList:Array<PlaceObject>;
    typeSelected: string;
}
class PlaceListContainer extends React.Component<PlaceListContainerProps, PlaceListContainerState>{
    constructor(props: any) {
        super(props)
        this.state={
            nearByTypeList:new Array<string>(),
            displayList:new Array<PlaceObject>(),
            typeSelected: 'default'
        }
        
    }

    componentDidMount(){
        var typeStrings = this.props.nearBySearchList.map(x => x.Type);
        var result = new Array<PlaceObject>();
        var filteredResult: INearBySearchResult = undefined;
        if(this.state.typeSelected == 'default')
            filteredResult = this.props.nearBySearchList[0];
        else
            filteredResult = this.props.nearBySearchList.filter(x => x.Type == this.state.typeSelected)[0];
        result= filteredResult.TypeResult.Result;
        this.setState({
            nearByTypeList: typeStrings,
            displayList : result
        });
    }
    dropdownChange(e: any): void {
        var typeSelectedValue = e.target.value;
        this.setState({
            typeSelected: typeSelectedValue
        })
    }

    render() {
        return (
            <div>
                <div>
                    <select  onChange={this.dropdownChange.bind(this)} value={this.state.typeSelected}>
                        {this.state.nearByTypeList.map(item =>
                            <option key={item} value={item} >
                                {item}
                            </option>
                        )}
                    </select>
                </div>
                <div>
                    <ul className="auto-complete-list" >
                        {this.state.displayList.map(item =>
                            <li >
                                <p>{item.Name}</p>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        );
    }

}

export default PlaceListContainer;