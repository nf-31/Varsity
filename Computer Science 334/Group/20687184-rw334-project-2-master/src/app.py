# Author: Joubert Visagie 22983856, Levi Dipnarain 20857624
from flask import Flask, render_template, request, redirect, url_for
from flask_bootstrap import Bootstrap
import requests
# import ./API

app = Flask(__name__)
bootstrap = Bootstrap(app)


@app.route("/", methods=['POST', 'GET'])
def home():
    if request.method == 'POST':
        if request.form['nav_button'] == 'query':
            return redirect(url_for('employee_query'))
        elif request.form['nav_button'] == 'social':
            return redirect(url_for('social_network'))
        elif request.form['nav_button'] == 'centrality':
            return redirect(url_for('centrality'))
        elif request.form['nav_button'] == 'propagation':
            return redirect(url_for('label_propagation'))
        elif request.form['nav_button'] == 'register':
            return redirect(url_for('register'))
        elif request.form['nav_button'] == 'login':
            return redirect(url_for('login'))
        elif request.form['nav_button'] == 'shortestPath':
            return redirect(url_for('shortestPath'))
    elif request.method == 'GET':
        return render_template("home.html")


#@app.route("/graph/SocialNetwork")
#def social_network():
#    if checkAuthenticationToken(session, UserList, username) is True:
#        return render_template("social_network.html")
#    else:
#        return redirect(url_for('register'))
    #return render_template("social_network.html")

@app.route("/graph/SocialNetwork", methods=['POST', 'GET'])
def social_network():

    username = request.args.get('username')

    token = request.args.get('token')

    parameters = {"username": username, "token": token}

    r = requests.get(
        url =  "http://127.0.0.1:14000/api/token",
        params = parameters
        )

    r_valid = r.json["token_valid"]

    if r_valid is True:
        return render_template("social_network.html")
    else:
        return redirect(url_for('register'))
    # return render_template("social_network.html")


@app.route("/graph/LabelPropagation")
def label_propagation():
    return render_template("label_propagation.html")


@app.route('/graph/path.html')
def shortestPath():
    return render_template('path.html')


@app.route('/employee_query')
def employee_query():
    return render_template("employee_query.html")


@app.route('/employee_results', methods=['GET'])
def employee_results():
    searchterm = request.args.get('searchterm')
    firstdate = request.args.get('firstdate')
    lastdate = request.args.get('lastdate')
    url = "http://127.0.0.1:14000/api/enron/users"
    data = {"searchterm": searchterm, "firstdate": firstdate, "lastdate": lastdate}
    result = requests.get(url, params=data)
    return render_template("employee_results.html", result=result.json())


@app.route("/graph/Centrality")
def centrality():
    return render_template("centrality.html")


@app.route("/login")
def login():
    return render_template("index.html")


@app.route('/register', methods=['POST', 'GET'])
def register(invalid=0, defusername=""):
    if invalid != 0:
        return render_template("register.html", invalid=invalid, username=defusername)

    if request.method == 'GET':
        return render_template("register.html", username=defusername)
    elif request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        url = 'http://127.0.0.1:14000/api/users'
        user = {'username': username, 'password': password}
        result = requests.post(url, data=user)
        if result.status_code == 201:
            return redirect(url_for("home"))
        elif result.status_code == 409:
            return register(1, username)


@app.errorhandler(404)
def page_not_found(e):
    return render_template('404.html'), 404


@app.errorhandler(500)
def internal_error(e):
    return render_template('500.html'), 500


if __name__ == "__main__":
    app.jinja_env.auto_reload = True
    app.config['TEMPLATES_AUTO_RELOAD'] = True
    app.run(port=8000)
