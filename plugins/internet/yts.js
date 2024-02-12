let fetch = require("node-fetch")
let yts = require("youtube-yts")

let handler = async(m, {conn, text, command, usedPrefix}) => {
    if(!text) throw conn.reply(m.chat, `Contoh: ${usedPrefix + command} judul`, m)
    if ((text.includes('youtube.com') || text.includes('youtu.be'))) return m.reply(`fitur ini khusus search..`)
    try {
        let response = await fetch(`https://weeb-api.vercel.app/ytsearch?query=${text}`)
        let data = await response.json()
        
        let teks = `*🌴 YouTube Search Engine 🌴*\n\n🔎 _Search Term:_ *${text}*\n🎐 *Total Results:* *${data.length}*\n\n◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦`;
        for (let i of data ) {
            teks += global.ytSearch.replace("%title", i.title).replace("%view", i.views).replace("%author", i.author.name).replace("%durasi", i.duration.timestamp).replace("%upload", i.ago).replace("%link", i.url)
        }
        await conn.sendMessage(m.chat, {
            text: teks, contextInfo: { mentionedJid: [m.sender],
                externalAdReply: {
                    title: global.set.name,
                    body: '',
                    mediaType: 1,
                    renderLargerThumbnail: true, 
                    thumbnail: await (await fetch(data[0].thumbnail)).buffer(),
                    thumbnailUrl: data[0].thumbnail,
                    sourceUrl: global.set.linkGc,
                    mediaUrl: ``
                }
            }
        }, {quoted: m})
        
    } catch {
        try {
            
        } catch (e) {
            m.reply("error...")
        }
    }
}
handler.help = ['yts'].map(v => v + ' <judul>')
handler.tags = ['internet']
handler.command = /^(yts|ytsearch)$/i

module.exports = handler