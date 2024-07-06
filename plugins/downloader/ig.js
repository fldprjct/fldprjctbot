let fetch = require("node-fetch")
const { ndown } = require("imran-downloader")
let handler = async(m, {conn, text, usedPrefix, command}) => {
    if (!text) throw conn.reply(m.chat, `Contoh: ${usedPrefix + command} url`, m)
    const { key } = await conn.reply(m.chat, set.textwait, m);
    m.react(set.wait)
    try {
        let igdl = await (await fetch(`https://aemt.me/download/igdl?url=${text}`)).json()
        let hasil = igdl.result[0].url
        conn.sendFile(m.sender, hasil, "", set.name, fakeMen)
        conn.editMessage(m.chat, key, set.textsukses, m)
        m.react(set.sukses)
    } catch (e) {
        try {
            let igs = await ndown(text)
            let hasil = igs.data[0].url
            conn.sendFile(m.sender, hasil, "", set.name, fakeMen)
            conn.editMessage(m.chat, key, set.textsukses, m)
            m.react(set.sukses)
        } catch (e) {
            conn.editMessage(m.chat, key, set.textgagal, m)
            m.react(set.gagal)
        }
    }
}
handler.help = ['ig'].map(v => v + ' <link>')
handler.tags = ['downloader']
handler.command = /^(ig|igdl)$/i
module.exports = handler
