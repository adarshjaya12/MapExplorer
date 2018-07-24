export interface IAutoComplete {
    place_id: string;
    description: string;
    latitude:string;
    longitude:string;
}

export interface PlaceObject{
    Geomenty: any;
    OpeningHours: any;
    PlaceId: string;
    Name:string;
    Vicinity:string;
    rating:string;
}
export interface TypeResultObject{
    NextPage:string;
    Result:Array<PlaceObject>;
    Status:string;
}
export interface INearBySearchResult{
    Type:string;
    TypeResult: TypeResultObject;
}