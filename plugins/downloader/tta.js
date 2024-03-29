const fetch = require("node-fetch");

let handler = async(m, {conn, text, usedPrefix, command}) => {
    if(!text) throw conn.reply(m.chat, `Contoh: ${usedPrefix + command} url`, m)
    if (!text.match(/((www|vt|vm).tiktok.com)/gi)) throw m.reply(`Url salah, perintah ini untuk mengunduh Media Tiktok`)
    m.reply("wait...")
    try {
        let tiktok = await (await fetch(`https://aemt.me/download/ttdl?url=${text}`)).json()
        let hasil = tiktok.result.audio[0]
        let title = tiktok.result.title
        conn.sendFile(m.chat, hasil, "", `${title}`, m)
    } catch {
        try {
            let tiktok = await (await fetch(`https://aemt.me/download/tiktokdl?url=${text}`)).json()
            let hasil = tiktok.result.music
            conn.sendFile(m.chat, hasil, "", `${set.name}`, m)
        } catch (e) {
            console.log(e)
            m.reply("gagal mendownload media\nsilahkan report ke owner..")
        }
    }
}
handler.help = ['tta'].map(v => v + ' <link>')
handler.tags = ['downloader']
handler.command = /^(tta|tiktoka)$/i
module.exports = handler
