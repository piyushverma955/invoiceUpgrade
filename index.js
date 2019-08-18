var express = require('express');
var app = express();
var portNumber = process.env.PORT || "3002";
var controller = require('./controller');
var inputFile = process.env.INPUT ;
var outputFile = process.env.OUTPUT;

app.get("/invoiceUpgrade", (_req, _res) => {
    if(inputFile && outputFile){
        controller.invoiceUpdate(inputFile,outputFile)
        .then(() => {
            _res.send({ message: "Invoice Updated Successfully !!" })
        })
        .catch(err => {
            _res.status(500).json({ messgae: err.message })
        })
    }
    else{
        _res.status(500).json({ messgae: "please give proper paths" })

    }
    
})

app.listen(portNumber, () => {
    console.log('System is running on port ' + portNumber);
});