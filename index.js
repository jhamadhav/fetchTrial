const fs = require('fs');
const http = require('https');
// const fetch = require('node-fetch')

const init = async () => {
    http.request("https://quotable.io/random", function (res) {
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            data = JSON.parse(chunk)

            let txtData = `${data.content}\n-${data.author}`
            console.log(txtData)

            fs.writeFile("test.txt", txtData, function (err) {
                if (err) {
                    return console.log(err);
                }
                console.log("The file was saved!");
            });

        });
    }).end();


}

init()

