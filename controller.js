var e = {};
var lineByLine = require('n-readlines');
var fs = require("fs");

e.invoiceUpdate = (inputFile,outputFile) => {
    var input = new lineByLine(inputFile);

    var updatedNumber = e.upgradeToNumber(input);
    return new Promise(function (resolve, reject) {
        fs.writeFile(outputFile, updatedNumber, function (err) {
            if (err) reject(err);
            else resolve();
        });
    });

}

e.upgradeToNumber = (numbers) => {
    var digits = {
        " _ | ||_|": 0,

        "     |  |": 1,

        " _  _||_ ": 2,

        " _  _| _|": 3,

        "   |_|  |": 4,

        " _ |_  _|": 5,

        " _ |_ |_|": 6,

        " _   |  |": 7,

        " _ |_||_|": 8,

        " _ |_| _|": 9,

    }

    let line;
    let line_number = 0;
    let lines = []
    let number = [];
    let result = "";
    let illegal = false;

    while (line = numbers.next()) {  
        line_number++;
        if (line_number > 2) {

            for (let i = 0; i < lines.length; i++) {
                for (let j = 0; j < lines[i].length / 3; j++) {
                    if (!number[j]) {
                        number[j] = '';
                    }
                    number[j] = number[j] + lines[i].substr(j * 3, 3);
                }

            }

            var number_line = '';

            for (let i = 0; i < number.length; i++) {
                if (digits[number[i]] != undefined) {
                    number_line = number_line + digits[number[i]];
                }
                else {
                    number_line = number_line + '?';
                    illegal = true;
                }
            }
            if (illegal) number_line = number_line + " ILLEGAL";
            number_line = number_line + "\n";

            result = result + number_line;
            line = numbers.next();
            line_number = 0;
            lines = []
            number = [];
            illegal = false;
        };
    }
    return result;
}

module.exports = e;