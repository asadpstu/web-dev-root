const siege = require('siege');
const config = require('config');

/*
Case 1 : 
For testing mysql connection pooling
*/
siege().on(config.get('port')).concurrent(10).get('/mysql/user/get').attack();

/*
  Case 2 :
  For testing mysql raw connection
  siege().on(4000).concurrent(10).get('/attack').attack();
*/