try:
    import httplib  # Python 2
except ImportError:
    import http.client as httplib  # Python 3
try:
    from urllib import urlencode  # Python 2
except ImportError:
    from urllib.parse import urlencode  # Python 3

from pprint import pprint
import json
from config import ZOMATO_API_URL, ZOMATO_BASE_URL, ZOMATO_API_KEY, ZOMATO_MAX_RESULT

def get_locations(radius, lat, lng):
    # build request
    conn = httplib.HTTPSConnection(ZOMATO_BASE_URL)
    headers = {"user-key": ZOMATO_API_KEY, "Accept": "application/json"}
    params = {
        'lat': lat,
        'lon': lng,
        'radius': radius,
        'sort': 'real_distance',
        'order': 'asc',
        'count': ZOMATO_MAX_RESULT,
    }

    # send request
    conn.request("GET", ZOMATO_API_URL + urlencode(params), None, headers)
    
    # parse response
    return json.loads("{\"response\":" + conn.getresponse().read().decode('utf-8') + "}")
