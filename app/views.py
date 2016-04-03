from flask import request
from flask import jsonify
from flask import render_template
from zomato_api import get_locations
from app import app

@app.route('/')
@app.route('/index')
def index():
    return render_template('index.html', maps_key=app.config['GOOGLE_MAPS_V3_KEY'])

@app.route('/get-places', methods=['POST'])
def get_places():
    ret = {
        'is_successful': True
    }
    
    try:
        response = get_locations(request.form['radius'], request.form['lat'], request.form['lng'])
        ret['data'] = response
    except Exception as e:
        ret['is_successful'] = False

    return jsonify(ret)
