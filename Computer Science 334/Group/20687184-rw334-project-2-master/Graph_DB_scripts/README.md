Steps to setup Neo4j

1. Download the zipped/tarred server from here: https://neo4j.com/download-center/?ref=web-product-database/#community
2. Unzip/Untar the server.
3. Do the following for the plugins that we'll be using:
	- Download GDS graph library from here (Neo4j Graph Data Science Library 1.5.1): https://neo4j.com/download-center/#algorithms
	- Place the .jar file in the /plugins directory found in the server
	  directory
	- Replace the neo4j.conf file in the /conf directory with the configuration
	  file that I supply in this directory.
4. I am repurposing the import script they gave us in the spec since importing
is a little tricy. For the supplied import script to work we need the employees,
messages and recipients in seperate .csv files. Luckily MySql Workbench as a
handy export to csv feature that I used to create these seperate .csv files.
Thus do the following:
	- Right click on the message/employee/recipient table and select the export
	  wizzard in MySql Workbench.
	- With the exception for the message table where we select only to export the
	  "mid", "date", "sender" and "folder" to keep the files small (and because some of the
bodies in the messages breaks the import script), export all the columns to
employeelist.csv/message.csv/recipientinfo.csv
	- Use commas as line seperator and select "No" for placing "null" and "NULL" as SQL keyword.
	- Export only about 20 000 rows for testing
	- Place these files in the /import directory of the server directory.
5. Start the neo4j server by being in "neo4j-community-4.2.5" and executing
`./bin/neo4j start` which will start the server and is then accesible via the
browser at `localhost:7474`.
6. In the neo4j browser login as user "neo4j" with password "neo4j". After this
it will ask for a password change. Change it to the same one as the MySql
password "!QWErty123".
7. Place the "init_gdb.sh" and enron.cypher inside the /neo4j-community-4.2.5 directory and run the script like so `./init_gdb.sh`
8. To shutdown the server execute `./bin/neo4j stop` in the "/neo4j-community-4.2.5" directory.
