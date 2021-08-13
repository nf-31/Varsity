from bs4 import BeautifulSoup
import requests
import re
import urllib.parse


def scrape_github(search_term, num_pages = 1):
    '''Scrapes github repos from the given search term

    Parameters
    ----------
    search_term : str
        The search term for the github repositories
    num_pages : int
        The number of pages to scrape

    Returns
    -------
    scraped_info : list
        A list of dictionaries containing the necessary information from the scraped repos 
    '''

    scraped_info = []
    # URL encode string
    query = urllib.parse.quote(search_term)
    
    url_string = "https://github.com/search?q=" + query
    html = requests.get(url_string)
    soup = BeautifulSoup(html.text, 'lxml')
    repositories = soup.find_all('li', class_ ='repo-list-item hx_hit-repo d-flex flex-justify-start py-4 public source') # extract raw repo data

    i = 0
    for repository in repositories:
        if i < 10:
            scraped_info.append(get_fields_scrape(repository))
        i += 1

    return scraped_info

def github_api(search_term, num_pages = 1):
    '''Searches for repositories with the given search term using the GitHub REST API

    Parameters
    ----------
    search_term : str
        The search term for the github repositories
    num_pages : int
        The number of pages required to query for repositories
    
    Returns
    -------
    repo_info : list
        A list of dictionaries containing the necessary info from the repositories
    '''
    repo_info = []

    url_string = "https://api.github.com/search/repositories"
    headers = {'Accept':'application/vnd.github.v3.text-match+json'}
    for page in range(1, num_pages + 1): # pagination

        payload = {'q':search_term, 'page': page, 'per_page': 10}
        response = requests.get(url_string, params = payload, headers=headers)
        if response.status_code != 200: # stop iterations if page not found
            break
        request = response.json()
        stop = len(request['items']) # max number of iterations

        for i in range(stop):
            repo_info.append(get_fields_api(request,i))
    
    return repo_info


def get_fields_scrape(repository):
    '''
    Obtains required fields from scrape

    Parameters
    ----------
    repository: obj
        BeautifulSoup object containing repository info
    
    Returns
    -------
    result : dict
        Dictionary containing required fields to be output in list

    '''
    
    keys = ["repo_name", "description", "tags", "num_stars", "language", "license", "last_updated", "num_issues"]
    result = dict.fromkeys(keys)

    result[keys[0]] = repository.find('a', class_ = 'v-align-middle').text # Extract repository name

    # Extract repo description if available
    if repository.find('p', class_ = "mb-1") is not None:
        result[keys[1]] = repository.find('p', class_ = "mb-1").text.strip()
    
    #Extract repo tags if available, otherwise output "none."
    tags = repository.find_all('a', class_ = 'topic-tag topic-tag-link f6 px-2 mx-0')
    extracted_tags = []
    if len(tags) > 0:
        for tag in tags:
            extracted_tags.append(tag.text.strip())
        result[keys[2]] = extracted_tags
    
    #Extract number of stars if available
    stars = repository.find('a', class_ = "Link--muted")
    if stars is not None:
        result[keys[3]] = stars.text.strip()
    
    # Extract programming language if available
    language = repository.find('span', itemprop ="programmingLanguage")
    if language is not None:
        result[keys[4]] = language.text
    
    #Extract license if available
    license = repository.find(text = re.compile('license')) # regular expression used as html did not provide easy way to extract data
    if license is not None:
        prelim = license.split()
        result[keys[5]] = " ".join(prelim)

    # Extract last updated time
    last_updated = repository.find('relative-time', class_ = "no-wrap")['datetime']
    result[keys[6]] = last_updated

    # Extract number of issues
    no_of_issues = repository.find('a', class_ = "Link--muted f6")
    if no_of_issues is not None:
        prelim = no_of_issues.text.split() # remove whitespace
        result[keys[7]] = int(prelim[0])

    return result

def get_fields_api(request, i=0):
    ''' Obtains relevant fields from JSON file

    Parameters
    ----------
    request : dict
        Dictionary containing JSON data
    
    i : int
        Repository index

    Returns
    -------
    result : dict
        Dictionary containing required data from github
    '''
    keys = ["repo_name", "description", "num_stars", "language", "license", "last_updated", "has_issues"]
    result = dict.fromkeys(keys)
    repo = request['items'][i]
  
    
    # Parse data
    result[keys[0]] = repo['full_name'] # Repository name
    # Repository description
    if repo['description'] is not None:
        result[keys[1]] = repo['description']
    # Number of stars
    if repo['stargazers_count'] is not None:
        result[keys[2]] = repo['stargazers_count']
    # Language
    if repo['language'] is not None:
        result[keys[3]] = repo['language']
    # License
    if repo['license'] is not None:
        if repo['license']['name'] != "Other":
            result[keys[4]] = repo['license']['name']
    # Last updated
    result[keys[5]] = repo['updated_at']
    # Has issues
    result[keys[6]] = repo['has_issues']

    return result

