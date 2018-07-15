from api.apiclient import get_call
from api.apiurl.apiurl import  PLACE_SEARCH_THINGS_TO_DO,PLACE_SEARCH,PLACE_DETAIL
from dto.nearbysearch import NearBySearch,NearBySearchModel
PLACE_LIST_ENTERTAINMENT ={"entertainment": {"airport","amusement_park","art_gallery","bar","casino","movie_theater","museum","night_club","shopping_mall","zoo"}}
PLACE_LIST_FOOD ={"food":{"bakery","bar","cafe","restaurant"}}
PLACE_LIST_SHOPPING ={"shopping":{"clothing_store","department_store","jewelry_store","shoe_store","shopping_mall"}}



def getNearBySearchByDefinedType(latlong):
    dictTypes = dict()
    dictTypes.update(PLACE_LIST_ENTERTAINMENT)
    dictTypes.update(PLACE_LIST_FOOD)
    dictTypes.update(PLACE_LIST_SHOPPING)
    resultDict = []
    for key,value in dictTypes.items():
        url = PLACE_SEARCH.format(latlong,getTypeAsString(value))
        detailList = get_call(url)
        if(detailList['status'] != "INVALID REQUEST"):
            nearByObject = NearBySearch(detailList['next_page_token'],detailList['results'],detailList['status'])
            nearByObjectModel = NearBySearchModel(key,nearByObject)
            resultDict.append(nearByObjectModel)
    return resultDict

def getTypeAsString(placeType):
    types = ""
    for ty in placeType:
        types += str(ty)+','
    return types[:-1]

# def getThingsToDo(latlong):
#     apiUrl = PLACE_SEARCH_THINGS_TO_DO.format(latlong)
#     detailList = get_call()