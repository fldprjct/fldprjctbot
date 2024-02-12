let fetch = require("node-fetch")

let handler = async (m, { conn, text, args }) => {
    if (!text.includes('.')) throw 'Contoh penggunaan:\n\n*.semoji2 🐷.😣*'
    let [emoji1, emoji2] = text.split`.`
    
    let q = m.quoted ? m.quoted : m
    let mime = (q.msg || q).mimetype || q.mediaType || ''
    let anu = await (await fetch(`https://tenor.googleapis.com/v2/featured?key=AIzaSyAyimkuYQYF_FXVALexPuGQctUWRURdCYQ&contentfilter=high&media_filter=png_transparent&component=proactive&collection=emoji_kitchen_v5&q=${encodeURIComponent(emoji1)}_${encodeURIComponent(emoji2)}`)).json()
    if (anu.results.length > 0) {
        for (let res of anu.results) {
            conn.sendSticker(m.chat, res.url, m, {author: set.auth, asSticker: /webp/g.test(mime) })
        }
    } else {
        conn.reply(m.chat, 'Tidak ada hasil yang ditemukan.\n silahkan coba yang lain...', m);
    }
}
handler.help = ['smix 😂.🥵']
handler.tags = ['tools']
handler.command = /^(emojimix|semoji2|smix)$/i

module.exports = handler