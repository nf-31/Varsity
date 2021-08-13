from flask import Flask, render_template, request, redirect
from scraper import scrape_github, github_api

''' This source file contains the code for the web app using Flask
'''

app = Flask(__name__)

# home page
@app.route('/')
def home():
    return render_template('home.html')

# route to interface page
@app.route('/interface')
def interface():
    return render_template('interface.html')

# route to scrape results page
@app.route('/scrape', methods = ['POST', 'GET'])
def scrape():
    if request.method == 'POST':
        search_term = request.form['q']
    else:
        search_term = request.args.get('q')
    result = scrape_github(search_term)
    return render_template('scrape.html', result = result)

# route to GitHub API results page
@app.route('/github_api', methods = ['POST', 'GET'])
def github():
    if request.method == 'POST':
        search_term = request.form['q']
        num_pages = int(request.form['num'])
    else:
        search_term = request.args.get('q')
        num_pages = int(request.args.get('num'))
    result = github_api(search_term,num_pages)
    return render_template('github_api.html', result = result)

    
if __name__ == '__main__':
    app.run()

