const fs = require('fs');
const http = require('https');
// const fetch = require('node-fetch')

const init = async () => {

    let readData = fs.readFileSync('README.md', 'utf8')

    http.request("https://quotable.io/random", function (res) {
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            data = JSON.parse(chunk)
            console.log(data);


            let currentTime = new Date();
            let currentOffset = currentTime.getTimezoneOffset();
            let ISTOffset = 330;   // IST offset UTC +5:30 
            let d = new Date(currentTime.getTime() + (ISTOffset + currentOffset) * 60000);
            d = d.toLocaleDateString("en-IN")

            readData = readData.replace(/<!-- #quote -->(.|\n)*<!-- #quoteEnd -->/gm, `<!-- #quote -->\n${data.content}\n- ${data.author}\n\nUpdated on: [${d}]\n<!-- #quoteEnd -->`)

            console.log(readData)

            fs.writeFile("README.md", readData, function (err) {
                if (err) {
                    return console.log(err);
                }
                console.log("The file was saved!");
            });

        });
    }).end();


}

init()

