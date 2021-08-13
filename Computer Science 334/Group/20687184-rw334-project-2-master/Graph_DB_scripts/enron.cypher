MATCH (n) DETACH DELETE n;
CREATE CONSTRAINT IF NOT EXISTS ON (u:User) ASSERT u.eid IS UNIQUE;
CREATE CONSTRAINT IF NOT EXISTS ON (m:Message) ASSERT m.mid IS UNIQUE;
CREATE INDEX IF NOT EXISTS FOR (n:User) ON (n.email);

LOAD CSV WITH HEADERS FROM "file:///employeelist.csv" AS row
MERGE (u:User {eid: row.eid})
SET u.firstName = row.firstname,
    u.lastName  = row.lastname,
    u.email     = row.email_address;
    
LOAD CSV WITH HEADERS FROM "file:///message.csv" AS row
MERGE (m:Message {mid: row.mid})
SET m.date       = row.date,
    m.sender     = row.sender
MERGE (u:User {email: row.sender});

LOAD CSV WITH HEADERS FROM "file:///message.csv" AS row
MATCH (m:Message {mid: row.mid})
MATCH (u:User {email: row.sender})
MERGE (u)-[r:SENT]->(m)
SET r.date = row.date;

LOAD CSV WITH HEADERS FROM "file:///recipientinfo.csv" AS row
MATCH (m:Message) WHERE m.mid = row.mid
MATCH (u:User) WHERE u.email = row.rvalue
WITH row, m, u, CASE row.rtype WHEN "TO"  THEN [1] ELSE [] END AS to
WITH row, m, u, to, CASE row.rtype WHEN "CC"  THEN [1] ELSE [] END AS cc
WITH row, m, u, to, cc, CASE row.rtype WHEN "BCC" THEN [1] ELSE [] END AS bcc
FOREACH ( _ IN to  | MERGE (m)-[:TO]->(u) )
FOREACH ( _ IN cc  | MERGE (m)-[:CC]->(u) )
FOREACH ( _ IN bcc | MERGE (m)-[:BCC]->(u) );


MATCH p=(n:User)-[:SENT]->(:Message)-[]->(m:User)
WHERE n <> m
MERGE (n)-[r:Mailed]->(m)
ON CREATE SET r.num_emails = 1
ON MATCH SET r.num_emails = r.num_emails + 1;


MATCH p=(n:User)-[z:Mailed]->(m:User)-[:Mailed]->(n)
WHERE n <> m
MERGE (n)-[r:Contacted]-(m)
ON CREATE SET r.exchange_emails = z.num_emails
ON MATCH SET r.exchange_emails = r.exchange_emails + z.num_emails;


CALL gds.labelPropagation.write(
  {
    nodeProjection: 'User',
    relationshipProjection: 'Contacted',
    writeProperty: 'label',
    relationshipProperties: 'exchange_emails',
    relationshipWeightProperty: 'exchange_emails'
  }
);


CALL gds.pageRank.write( 
{ 
   nodeProjection: 'User', 
   writeProperty: 'centrality', 
   relationshipProjection: 'Contacted',
   relationshipProperties: 'exchange_emails', 
   relationshipWeightProperty: 'exchange_emails'  
} 
); 

CALL gds.alpha.allShortestPaths.stream({
  nodeQuery: 'MATCH (n) RETURN id(n) AS id',
  relationshipQuery: 'MATCH (n)-[r:Contacted]->(m) RETURN id(n) AS source, id(m) AS target, toFloat(r.exchange_emails) AS cost',
  relationshipWeightProperty: 'cost'
})YIELD sourceNodeId, targetNodeId, distance;






