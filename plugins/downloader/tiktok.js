const fetch = require("node-fetch")
const { tiktokdl } = require('tiktokdl')
let handler = async(m, {conn, text, usedPrefix, command}) => {
    if(!text) throw conn.reply(m.chat, `Contoh: ${usedPrefix + command} url`, m)
    if (!text.match(/((www|vt|vm).tiktok.com)/gi)) throw m.reply(`Url salah, perintah ini untuk mengunduh Media Tiktok`)
    const { key } = await conn.reply(m.chat, set.textwait, m);
    m.react(set.wait)
    try {
        let response = await (await fetch(`https://api.tiklydown.eu.org/api/download?url=${text}`)).json()      
        let video = response.video.noWatermark
        conn.sendFile(m.sender, video, 'tiktok.mp4', `v.1\n\n${set.name}`, fakeMen)
        conn.editMessage(m.chat, key, set.textsukses, m)
        m.react(set.sukses)
    } catch {
        try {
            let tiktok = await (await fetch(`https://aemt.me/download/ttdl?url=${text}`)).json()
            let hasil = tiktok.result.video[0]
            let title = tiktok.result.title
            conn.sendFile(m.sender, hasil, "", `${title}\n\nv.2\n${set.name}`, fakeMen)
            conn.editMessage(m.chat, key, set.textsukses, m)
            m.react(set.sukses)
        } catch {
            try {
                let tiktok = await tiktokdl(text);
                let hasil = tiktok.video;
                conn.sendFile(m.sender, hasil, "", `v.3\n\n${set.name}`, fakeMen)
                conn.editMessage(m.chat, key, set.textsukses, m)
                m.react(set.sukses)
            } catch (e) {
                console.log(e)
                conn.editMessage(m.chat, key, set.textgagal, m)
                m.react(set.gagal)
            }
        }
    }
}
handler.help = ['tt'].map(v => v + ' <link>')
handler.tags = ['downloader']
handler.command = /^(tt|tiktok)$/i
module.exports = handler
