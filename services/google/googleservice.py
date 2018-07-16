from services.google.nearbysearchservice import getNearBySearchByDefinedType
from api.apiurl.apiurl import REVERSE_GEO_CODING,AUTO_COMPLETE,PLACE_DETAIL
from dto.autocomplete import AutoComplete,Prediction,AutoCompleteJson
from dto.geocoding import GeoCoding,Result,AddressComponent,CityModel,Location
from api.apiclient import get_call


def getNearByItems(lat,lng):
    latLong = str(lat)+','+str(lng)
    result = getNearBySearchByDefinedType(latLong)
    return result


def getLatLongBasedOnPlaceId(text):
        autoUrl = PLACE_DETAIL.format(text)
        result =  get_call(autoUrl)
        geoCoding = GeoCoding(**result)
        location = geoCoding.results[0]["geometry"]["location"]
        return Location(**location)


def getAutoCompelte(text):
	autoUrl = AUTO_COMPLETE.format(text)
	result =  get_call(autoUrl)
	autoObject = AutoComplete(**result)
	resultList = []
	for place in  autoObject.predictions:
		prediction = Prediction(**place)
		x = AutoCompleteJson(prediction.description,prediction.place_id)
		resultList.append(x)
	return resultList


def getCityModelFromGeo(lat,longi):
	autoUrl = REVERSE_GEO_CODING.format(lat,longi)
	result = get_call(autoUrl)
	geoCoding = GeoCoding(**result)
	address_compList = [AddressComponent(**comp) for comp in geoCoding.results[0]["address_components"]]
	cityFilter = next(x for x in address_compList for y in x.types  if y == "sublocality" or y == "sublocality_level_1" or y == "locality" )
	stateFilter = next(x for x in address_compList for y in x.types  if y == "administrative_area_level_1" )
	countryFilter = next(x for x in address_compList for y in x.types if y == "country")
	place_id = geoCoding.results[0]["place_id"]
	lati = geoCoding.results[0]["geometry"]["location"]["lat"]
	longi = geoCoding.results[0]["geometry"]["location"]["lng"]
	return CityModel(place_id,cityFilter.long_name,stateFilter.short_name,countryFilter.short_name,lati,longi)
