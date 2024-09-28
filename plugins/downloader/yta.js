let fetch = require("node-fetch")
let ytdl = require('@distube/ytdl-core')

let handler = async(m, {conn, args, text, command, usedPrefix}) => {
    if(!text) throw conn.reply(m.chat, `Contoh: ${usedPrefix + command} url`, m)
    if (!(text.includes('http://') || text.includes('https://'))) return m.reply(`url invalid, please input a valid url. Try with add http:// or https://`);
    //if (!text.includes('youtube.com')) return m.reply(`Hanya support url youtube.com`);
    const { key } = await conn.reply(m.chat, set.textwait, m);
    m.react(set.wait)
    try {
        let Ytdl = await ytmp3(args[0])
        let limit = 600 < Ytdl.meta.seconds
        let ytthumb = await (await conn.getFile(Ytdl.meta.image)).data
        let doc = {
            audio: Ytdl.buffer,
            mimetype: "audio/mp4",
            ptt: true,
            fileName: Ytdl.meta.title,
            contextInfo: {
                externalAdReply: {
                    showAdAttribution: true,
                    mediaType: 2,
                    mediaUrl: args[0],
                    title: "↺ |◁   II   ▷|   ♡",
                    body: set.name + " [ V.1 ]",
                    sourceUrl: args[0],
                    thumbnail: ytthumb
                }
            }
        }
        if(!limit) {
            await conn.sendMessage(m.sender, doc, { quoted: fakeMen })
            conn.editMessage(m.chat, key, set.textsukses, m)
            m.react(set.sukses)
        } else {
            conn.editMessage(m.chat, key, "hanya bisa mendownload media di bawah 10 menit...", m)
        }
    } catch (e) {
        console.log(e)
        try {
            
        } catch (e) {
            console.log(e)
            conn.editMessage(m.chat, key, set.textgagal, m)
            m.react(set.gagal)
        }
    }
}
handler.help = ['ytmp3'].map(v => v + ' <url>')
handler.tags = ['downloader']
handler.command = /^(ytmp3|yta)$/i
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
};