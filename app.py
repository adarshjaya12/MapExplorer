from flask import Flask,render_template,request,jsonify,json
import jsonpickle
from services.google.googleservice import getNearByItems,getCityModelFromGeo,getAutoCompelte
app = Flask(__name__)


@app.route('/')
def index():
    return render_template('index.html')
    

@app.route('/autofillcities')
def autocomplete():
    inputResult = request.args.get('input')
    result = getAutoCompelte(inputResult)
    return jsonify([e.serialize() for e in result])

@app.route('/GetGeoLocation')
def getGeoLocation():
    latitude = request.args.get("latitude")
    longitude= request.args.get("longitude")
    result = getCityModelFromGeo(latitude,longitude)
    return jsonify(result.serialize())

@app.route('/Submit')
def submit():
    latitude = request.args.get("latitude")
    longitude= request.args.get("longitude")
    result = getNearByItems(latitude,longitude)
    return jsonpickle.encode(result)


if __name__ == '__main__':
    app.run()
