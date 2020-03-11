var fs = require('fs'),
    showdown  = require('showdown'),
    converter = new showdown.Converter();

fs.readFile(__dirname + '/style.css', function (err, styleData) {
    if (err) {
        throw err;
    }
    let preContent = `
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1">
      </head>
      <body>
        <div id='content'>
    `

    let postContent = `
        </div>
        <style type='text/css'>` + styleData + `</style>
      </body>
    </html>`;


    process.argv.slice(2).forEach((val, index) => {
        fs.readFile(process.cwd() + '/' + val, function (err, data) {
            if (err) {
                throw err;
            }
            let text = data.toString();
            process.stdout.write(preContent + converter.makeHtml(text) + postContent);
        });
    });
});