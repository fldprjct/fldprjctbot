const fetch = require("node-fetch")
let handler = async(m, {conn, text, usedPrefix, command}) => {
    if(!text) throw conn.reply(m.chat, `Contoh: ${usedPrefix + command} url`, m)
    if (!text.match(/((www|vt|vm).tiktok.com)/gi)) throw m.reply(`Url salah, perintah ini untuk mengunduh Media Tiktok`)
    m.reply("wait...")
    try {
        let response = await (await fetch(`https://api.tiklydown.eu.org/api/download?url=${text}`)).json()      
        if ('video' in response) {
            let video = response.video.noWatermark
            conn.sendFile(m.sender, video, 'tiktok.mp4', `v.1\n\n${set.name}`, m)
            m.reply('Media telah dikirimkan ke chat pribadi')
        }
    } catch {
        try {
            let tiktok = await (await fetch(`https://aemt.me/download/ttdl?url=${text}`)).json()
            let hasil = tiktok.result.video[0]
            let title = tiktok.result.title
            conn.sendFile(m.sender, hasil, "", `${title}\n\nv.2\n${set.name}`, m)
            m.reply('Media telah dikirimkan ke chat pribadi')
        } catch {
            try {
                let tiktok = await (await fetch(`https://aemt.me/download/tiktokdl?url=${text}`)).json()
                let hasil = tiktok.result.video
                conn.sendFile(m.sender, hasil, "", `v.3\n\n${set.name}`, m)
                m.reply('Media telah dikirimkan ke chat pribadi')
            } catch (e) {
                console.log(e)
                m.reply("gagal mendownload media\njika link tersebut tiktok slide gunakan command .tiktokslide")
            }
        }
    }
}
handler.help = ['tt'].map(v => v + ' <link>')
handler.tags = ['downloader']
handler.command = /^(tt|tiktok)$/i
module.exports = handler
