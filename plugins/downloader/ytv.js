let fetch = require("node-fetch")
let ytdl = require('ytdl-core')

let handler = async(m, {conn, args, text, command, usedPrefix}) => {
    if(!text) throw conn.reply(m.chat, `Contoh: ${usedPrefix + command} url`, m)
    if (!(text.includes('http://') || text.includes('https://'))) return m.reply(`url invalid, please input a valid url. Try with add http:// or https://`);
    //if (!text.includes('youtube.com')) return m.reply(`Hanya support url youtube.com`);
    try {
        let Ytdl = await ytmp4(args[0])
        let limit = 600 < Ytdl.meta.seconds
        
        if(!limit) {
            await conn.sendFile(m.chat, Ytdl.buffer, "", Ytdl.meta.title + `\n\n${set.name}`, m)
        } else {
            m.reply("hanya bisa mendownload media di bawah 10 menit...")
        }
    } catch (e) {
        console.log(e)
        m.reply('gagal dalam mendownload media..')
    }
}
handler.help = ['ytmp4'].map(v => v + ' <url>')
handler.tags = ['downloader']
handler.command = /^(ytmp4|ytv)$/i
module.exports = handler


async function ytmp4(url) {
    try {
        const {
            videoDetails
        } = await ytdl.getInfo(url, {
            lang: "id"
        });
        
        const stream = ytdl(url, {
            filter: "videoandaudio",
            quality: 18
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
};