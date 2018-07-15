class NearBySearch:
    def __init__(self,next_page_token,results,status):
        self.NextPage = next_page_token
        self.status = status
        self.Result =self.bindDataToResult(results)

    def bindDataToResult(self,results):
        returnList = []
        for res in results:
            resObj = Results(**res)
            returnList.append(resObj)
        return returnList
    

class NearBySearchModel:
    def __init__(self,key,result):
        self.Type = key
        self.TypeResult = result


class Results:
    def __init__(self,geometry,icon,id,name,place_id,reference,scope,types,vicinity,plus_code='',rating='',opening_hours='',price_level='',photos=''):
        self.Geomenty = Geomenty(**geometry)
        self.PlaceId = place_id
        self.Vicinity = vicinity
        self.Name = name
        self.rating = rating
        self.OpeningHours = opening_hours


class Geomenty:
    def __init__(self,location,viewport):
        self.Latitude = location['lat']
        self.Longitude = location['lng']
