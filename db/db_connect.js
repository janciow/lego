const mysql = require('mysql');

const APP_SECRET = process.env.APP_SECRET;
const APP_USER= process.env.APP_USER;
const APP_DB_NAME= process.env.APP_DB_NAME;
const APP_HOST_URL= process.env.APP_HOST_URL;

const db_config ={
    host: APP_HOST_URL,
    user: APP_USER,
    password: APP_SECRET,
    database: APP_DB_NAME,
    multipleStatements: true
}

let connection;

function handleDisconnect() {
  connection = mysql.createConnection(db_config); // Recreate the connection, since
                                                  // the old one cannot be reused.

  connection.connect(function(err) {              // The server is either down
    if(err) {                                     // or restarting (takes a while sometimes).
      console.log('error when connecting to db:', err);
      setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting to reconnect,
    }                                     // to avoid a hot loop, and to allow our node script to
  });                                     // process asynchronous requests in the meantime.
                                          // If you're also serving http, display a 503 error.
  connection.on('error', function(err) {
    console.log('db error', err);
    if(err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
      handleDisconnect();                         // lost due to either server restart, or a
    } else {                                      // connnection idle timeout (the wait_timeout
      // throw err;     
      console.log(JSON.stringify(err, null, 2))                             // server variable configures this)
    }
  });
}

handleDisconnect();

module.exports = connection; 