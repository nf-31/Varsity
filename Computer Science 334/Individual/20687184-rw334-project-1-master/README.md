# Name

GitScrape

# Description

GitScrape is a web app that displays the top 10 repositiories on GitHub based on the search term.

## Requirements

Use the following command to install the project dependencies:

```bash
pip3 install -r requirements.txt
```

## Usage

To run the web app, ensure you are in the project directory, then use the following command in the terminal:

```bash
python3 app.py
```

## Web App Browser Access

To access the web app on the browser, open the following link http://127.0.0.1:5000/.

## Notes

1. If the search term produces no results, an empty table is shown.
2. Pagination is implemented with the GitHub API option only.
3. If a field returns no result, its table entry is **None**.
