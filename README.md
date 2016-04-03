# feed-me

Web App (sort-of) which points you to the 10 nearest restaurants near you.

### How to make it work:

It is of great importance to know that this is a Python-based web app so you should have Python (2.7) and [virtualenv](https://virtualenv.pypa.io/en/latest/).

```
git clone https://github.com/teh-username/feed-me.git
cd feed-me
virtualenv flask
flask/bin/pip install -r requirements.txt
chmod a+x run.py
./run.py
```

You should then be able to access the app via http://localhost:5000/
