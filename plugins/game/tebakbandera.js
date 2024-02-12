const fetch = require("node-fetch")

let timeout = 60000 // 1menit

let handler = async(m, { conn, usedPrefix }) => {
    conn.tebakbendera = conn.tebakbendera ? conn.tebakbendera : {}
    
    let id = m.chat
    if (id in conn.tebakbendera) {
        conn.reply(m.chat, 'Masih ada soal belum terjawab di chat ini', conn.tebakbendera[id][0])
        throw false
    }
    let src = await (await fetch(`https://raw.githubusercontent.com/BochilTeam/database/master/games/tebakbendera2.json`)).json()
    let json = src[Math.floor(Math.random() * src.length)]
    
    let caption = ` *[ t e b a k - b e n d e r a ]*
        
🎋 Silahkan Tebak bendera di Sticker Tersebut.

*[ Timeout ]* ${(timeout / 1000).toFixed(2)} detik
*[ Bantuan ]* ${usedPrefix}teba untuk bantuan

!!! Reply pesan ini untuk menjawab
`.trim()

    let s = await conn.sendSticker(m.chat, json.img, m, {author: "tebak bendera\nby: ktdprjct", asSticker: /webp/g.test(m) })
    
    conn.tebakbendera[id] = [
        await conn.reply(m.chat, caption, s),
        json,
        setTimeout(() => {
            if (conn.tebakbendera[id]) conn.reply(m.chat, gameOver.replace("%res", json.name), conn.tebakbendera[id][0])
            delete conn.tebakbendera[id]
        }, timeout)
    ]
}
handler.help = ['tebakbendera']
handler.tags = ['game']
handler.command = /^tebakbendera/i
handler.group = true

module.exports = handler