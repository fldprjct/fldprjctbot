let fetch = require("node-fetch")
let handler = async(m, {conn, text, usedPrefix, command}) => {
    if (!text) throw conn.reply(m.chat, `Contoh: ${usedPrefix + command} url`, m)
    if (!text.match(/https:\/\/www.instagram.com\/(p|reel|tv)/gi)) throw m.reply(`Url salah, perintah ini untuk mengunduh media Instagram`)
        
    let igdl = await (await fetch(`https://aemt.me/download/igdl?url=${text}`)).json()
    let hasil = igdl.result[0].url
    conn.sendFile(m.chat, hasil, "", set.name, m)
}
handler.help = ['ig'].map(v => v + ' <link>')
handler.tags = ['downloader']
handler.command = /^(ig|igdl)$/i
module.exports = handler
