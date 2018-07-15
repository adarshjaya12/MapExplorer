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
    
    def serialize(self):
        return{
            'next_page':self.NextPage,
            'status': self.status,
            'result': ([e.serialize() for e in self.Result])
        }


class Results:
    def __init__(self,geometry,icon,id,name,place_id,reference,scope,types,vicinity,plus_code='',rating='',opening_hours='',price_level='',photos=''):
        self.Geomenty = Geomenty(**geometry)
        self.PlaceId = place_id
        self.Vicinity = vicinity
        self.rating = rating
        self.OpeningHours = opening_hours
    def serialize(self):
        return{
            'geomenty': self.Geomenty.serialize(),
            'place_id' :self.PlaceId,
            'vicinity' :self.Vicinity,
            'rating' :self.rating,
            'openingHours': self.OpeningHours
        }

class Geomenty:
    def __init__(self,location,viewport):
        self.Latitude = location['lat']
        self.Longitude = location['lng']
    def serialize(self):
        return {
            'latitude' : self.Latitude,
            'longitude' : self.Longitude
        }