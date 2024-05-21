const fetch = require("node-fetch");

let handler = async(m, {conn, text, usedPrefix, command}) => {
    if(!text) throw conn.reply(m.chat, `Contoh: ${usedPrefix + command} url`, m)
    if (!text.match(/((www|vt|vm).tiktok.com)/gi)) throw m.reply(`Url salah, perintah ini untuk mengunduh Media Tiktok`)
    const { key } = await conn.reply(m.chat, set.textwait, m);
    m.react(set.wait)
    try {
        let tiktok = await (await fetch(`https://aemt.me/download/ttdl?url=${text}`)).json()
        let hasil = tiktok.result.audio[0]
        conn.sendFile(m.sender, hasil, "", `v.1`, fakeMen)
        conn.editMessage(m.chat, key, set.textsukses, m)
        m.react(set.sukses)
    } catch {
        try {
            let tiktok = await (await fetch(`https://aemt.me/download/tiktokdl?url=${text}`)).json()
            let hasil = tiktok.result.music
            conn.sendFile(m.sender, hasil, "", `v.2`, fakeMen)
            conn.editMessage(m.chat, key, set.textsukses, m)
            m.react(set.sukses)
        } catch (e) {
            console.log(e)
            conn.editMessage(m.chat, key, set.textgagal, m)
            m.react(set.gagal)
        }
    }
}
handler.help = ['tta', 'tiktoka'].map(v => v + ' <link>')
handler.tags = ['downloader']
handler.command = /^(tta|tiktoka)$/i
module.exports = handler
