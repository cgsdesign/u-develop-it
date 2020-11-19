DROP TABLE IF EXISTS parties;
DROP TABLE IF EXISTS candidates;


CREATE TABLE parties (
  id INTEGER PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  description TEXT
);
/*NOTE!!!! Of table( like parties) is referenced, it must go ABOVe where it is referenced*/

CREATE TABLE candidates (
  id INTEGER PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  industry_connected BOOLEAN NOT NULL,
  party_id INTEGER UNSIGNED,
  CONSTRAINT fk_party FOREIGN KEY (party_id) REFERENCES parties(id) ON DELETE SET NULL
);
/*CONSTRAINT = flags field as forign id 
  this makesit so no id not already asigned in parties field can be asigned to a candidate
  ON DELETE SET NULL is so that if a party is deleted thie party_id is reasigned to null/no party
*/
