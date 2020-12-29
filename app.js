const express = require('express')
const { exec } = require('child_process');
const app = express()

app.use('/static', express.static('./static'))
const port = 3000

app.get('/', (req, res) => {
    res.sendFile('index.html', { root: './' })
})

app.get('/download', (req, res) => {
    var url = req.query.url
    console.log("Url: "+url)
    console.log("Url decoded: "+decodeURI(url))
    exec('youtube-dl --get-url --extract-audio --audio-format=mp3 --audio-quality=0 ' + decodeURI(url),
        (error, stdout, stderr) => {+
            console.log("stdout======"+stdout);
            console.log("stderr======="+stderr);
            if (error !== null) {
                console.log("500 "+error )
                res.status(500).send(responseError(error))
            } else {
                console.log("200 "+stdout )
                res.status(200).send(responseSuccess(stdout))
            }
        });
})

function responseSuccess(data) {
    return {
        "status_code": 1,
        "message": "Response success",
        "data": data
    }
}

function responseError(error) {
    return {
        "status_code": 2,
        "message": error,
        "data": null
    }
}


app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
