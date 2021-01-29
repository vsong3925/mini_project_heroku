import json
from flask import Flask, render_template

app = Flask(__name__)

@app.route("/")
def index():
    # use render_template to serve up the index.html
    return(render_template("index.html"))

@app.route("/samples")
def samples():

    # open the json file, located at static/data/samples.json
    samples = open("static/data/samples.json")
    
    # use json.load() to read in the file as json
    samples_data = json.load(samples)
    # return that json through the Flask endpoini
    
    return samples_data

if __name__ == "__main__":
    app.run(debug=True)