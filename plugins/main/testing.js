const cp = require('child_process');
let ytdl = require('ytdl-core')
const ffmpeg = require('ffmpeg-static');
let handler = async(m, {conn}) => {
    
    const url = `https://youtube.com/watch?v=5U1jO4KL60Y`
    const video = await ytdl(url, {
        filter: "videoonly",
        quality: 135
    });
    
    const audio = await ytdl(url, {
        filter: "audioonly",
        quality: 140
    });
    
function mergeAudioAndVideo(inputVideoPath, inputAudioPath, outputFilePath) {
  const ffmpegProcess = cp.spawn('ffmpeg', [
    '-report',
    '-loglevel', '8', '-hide_banner',
    '-i', inputVideoPath,
    '-i', inputAudioPath,
    '-c:v', 'copy',
    '-c:a', 'aac',
    outputFilePath,
  ], {
    windowsHide: true,
    stdio: [
      'inherit', 'inherit', 'inherit',
    ],
  });

  ffmpegProcess.on('close', (code) => {
    if (code === 0) {
      console.log('Merging Completed');
    } else {
      console.error('Error during merging:', code);
    }
  });
}

// Contoh penggunaan
const inputVideoPath = video; // Ganti dengan path video input Anda
const inputAudioPath = audio; // Ganti dengan path audio input Anda
const outputFilePath = '../../tmp/outputVideo.mp4'; // Ganti dengan path output yang diinginkan

mergeAudioAndVideo(inputVideoPath, inputAudioPath, outputFilePath);

}
handler.command = /^tes$/i

module.exports = handler

/*let {
    youtubedl,
    youtubedlv2
} = require('@bochilteam/scraper')
let fetch = require('node-fetch')
let ytdl = require('ytdl-core')

let handler = async (m, {
    conn,
    args
}) => {
    if (!args[0]) throw "[ Masukkan Url Youtube! ]"
    m.react('😱')
    try {

        let Ytdl = await ytmp3(args[0])
        let dls = "Download audio succes ( V1 )"
        let ytthumb = await (await conn.getFile(Ytdl.meta.image)).data
        let doc = {
            audio: Ytdl.buffer,
            mimetype: "audio/mp4",
            fileName: Ytdl.meta.title,
            contextInfo: {
                externalAdReply: {
                    showAdAttribution: true,
                    mediaType: 2,
                    mediaUrl: args[0],
                    title: Ytdl.meta.title,
                    body: dls,
                    sourceUrl: args[0],
                    thumbnail: ytthumb
                }
            }
        }

        await conn.sendMessage(m.chat, doc, {
            quoted: m
        })

    } catch {
        try {

            let yt = await youtubedlv2(args[0]).catch(async _ => await youtubedl(args[0]))
            let link = await yt.audio["128kbps"].download()
            let ytl = "https://youtube.com/watch?v="
            let dls = "Download audio succes ( V2 )"
            let ytthumb = await (await conn.getFile(yt.thumbnail)).data
            let doc = {
                audio: {
                    url: link
                },
                mimetype: "audio/mp4",
                fileName: yt.title,
                contextInfo: {
                    externalAdReply: {
                        showAdAttribution: true,
                        mediaType: 2,
                        mediaUrl: ytl + yt.id,
                        title: yt.title,
                        body: dls,
                        sourceUrl: ytl + yt.id,
                        thumbnail: ytthumb
                    }
                }
            }

            await conn.sendMessage(m.chat, doc, {
                quoted: m
            })

        } catch {
            try {

                /*let lolhuman = await fetch(`https://api.lolhuman.xyz/api/ytaudio2?apikey=${lolkey}&url=${args[0]}`)
                let lolh = await lolhuman.json()
                let n = lolh.result.title || "error"
                await conn.sendMessage(m.chat, {
                    audio: {
                        url: lolh.result.link
                    },
                    fileName: `${n}.mp3`,
                    mimetype: "audio/mp4"
                }, {
                    quoted: m
                })
            } catch {
                await m.reply(eror)
            }
        }
    }
}
handler.help = ["mp3", "a"].map(v => "yt" + v + ` <url> <without message>`)
handler.tags = ["downloader"]
handler.command = /^y((outube|tb)audio|(outube|tb?)mp3|utubaudio|taudio|ta)$/i

module.exports = handler

async function ytmp3(url) {
    try {
        const {
            videoDetails
        } = await ytdl.getInfo(url, {
            lang: "id"
        });

        const stream = ytdl(url, {
            filter: "audioonly",
            quality: 140
        });
        const chunks = [];

        stream.on("data", (chunk) => {
            chunks.push(chunk);
        });

        await new Promise((resolve, reject) => {
            stream.on("end", resolve);
            stream.on("error", reject);
        });

        const buffer = Buffer.concat(chunks);

        return {
            meta: {
                title: videoDetails.title,
                channel: videoDetails.author.name,
                seconds: videoDetails.lengthSeconds,
                description: videoDetails.description,
                image: videoDetails.thumbnails.slice(-1)[0].url,
            },
            buffer: buffer,
            size: buffer.length,
        };
    } catch (error) {
        throw error;
    }
};*/