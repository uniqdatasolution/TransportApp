const sql = require('mssql');

const config = {
    user: 'DB_A57073_logistic_admin',
    password: 'uniq@920',
    server: 'sql5103.site4now.net',
    database: 'DB_A57073_logistic',
    options: {
        trustedconnecction: true,
        enableArithAort: true,
    },
}

function handleConnection() {
    var conn = new sql.ConnectionPool(config);
    var req = new sql.Request(conn);
  
    conn.connect(function(err) {
      if(err) {
          console.log('Connection Error',err);
          return;
      }
      else {
          console.log('Database Connected Succesfully');
      }
    });
  }
  
  handleConnection();
  
  module.exports = config;