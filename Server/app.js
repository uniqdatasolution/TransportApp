const path = require('path')
const express = require("express");
const http = require('http');
const bodyParser = require('body-parser');
const jwt = require('./_helpers/jwt');
const errorHandler = require('./_helpers/error-handler');
const cors = require('cors');
const fs = require('fs');

class Server{

    constructor(){
       
        this.app = express();
        this.app.use(cors());
        this.app.options('*', cors())
        this.app.use(jwt());
        this.app.use(errorHandler);
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(bodyParser.json());
        this.app.use(express.static('public'));
        this.app.use("/ProfileImage", express.static(path.join(__dirname, 'Uploads/images')));
        
        var AdminRoutes = require('./controllers/admin/admin.routes');
        var DriverRoutes = require('./controllers/driver/driver.routes');
        // var customerRoutes = require('./contoller/customer/customer.routes');
        // var customerDocumentRoutes = require('./contoller/customer_document/document.routes');
        // var LoanRoutes = require('./contoller/loan/loan.routes');
        // var TransactionRoutes = require('./contoller/loan_transactions/transactions.routes');

        this.app.use('/api/AdminUser', AdminRoutes);
        this.app.use('/api/Driver', DriverRoutes);
        // this.app.use('/api', customerRoutes);
        // this.app.use('/api', customerDocumentRoutes);
        // this.app.use('/api', LoanRoutes);
        // this.app.use('/api', TransactionRoutes);
        
        this.http = http.Server(this.app);
        
    }

    async appExecute(){
        const port = process.env.PORT || 4001;
        this.app.listen(port);
        console.log('api running at ', port);
   }

}
    
const app = new Server();
app.appExecute();
