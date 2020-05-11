const express = require('express');
var youtubeStream = require('youtube-audio-stream');
const app = express();

app.use('/static', express.static('./static'));
const port = 3000

app.get('/', (req, res) => { 
    res.sendFile('index.html', { root: './' });
});

app.get('/download', (req, res) => {

    var url = req.query.url;  
    try {
        console.log("return");
        youtubeStream(url).pipe(res)
    } catch (exception) {
        res.status(500).send(exception)
    }
    
    // var url = req.query.url;    
    // res.header("Content-Disposition", 'attachment;\  filename="Video.mp4');    
    // // ytdl(url, {format: 'mp4'}).pipe(res);
    // let videoID =  ytdl.getURLVideoID(url);
    // console.log(`VideoId: ${videoID}`);
    // ytdl.getInfo(videoID, (err, info) => {
    //     if (err) throw err;
    //     let audioFormats = ytdl.filterFormats(info.formats, 'audioonly');
    //     console.log('Formats with only audio: ' + audioFormats.length);
    //     ytdl(req.query.url, {filter: format => audioFormats}).pipe(res);
    //   });
});

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
