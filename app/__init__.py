from flask import Flask

app = Flask(__name__)
app.config.from_object('config')
app.config.from_envvar('FEEDME_CONFIG_PATH')

from app import views