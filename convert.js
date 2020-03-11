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
        <style>#forkongithub a{background:#000;color:#fff;text-decoration:none;font-family:arial,sans-serif;text-align:center;font-weight:bold;padding:5px 40px;font-size:1rem;line-height:2rem;position:relative;transition:0.5s;}#forkongithub a:hover{background:#c11;color:#fff;}#forkongithub a::before,#forkongithub a::after{content:"";width:100%;display:block;position:absolute;top:1px;left:0;height:1px;background:#fff;}#forkongithub a::after{bottom:1px;top:auto;}@media screen and (min-width:800px){#forkongithub{position:fixed;display:block;top:0;right:0;width:200px;overflow:hidden;height:200px;z-index:9999;}#forkongithub a{width:200px;position:absolute;top:60px;right:-60px;transform:rotate(45deg);-webkit-transform:rotate(45deg);-ms-transform:rotate(45deg);-moz-transform:rotate(45deg);-o-transform:rotate(45deg);box-shadow:4px 4px 10px rgba(0,0,0,0.8);}}</style><span id="forkongithub"><a href="https://github.com/reneluria/autowebsite">Contrib on GitHub</a></span>
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