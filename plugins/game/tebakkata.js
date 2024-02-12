const fetch = require("node-fetch")

let timeout = 60000 // 1menit

let handler = async(m, { conn, usedPrefix }) => {
    conn.tebakkata = conn.tebakkata ? conn.tebakkata : {}
    let id = m.chat
    if (id in conn.tebakkata) {
        conn.reply(m.chat, 'Masih ada soal belum terjawab di chat ini', conn.tebakkata[id][0])
        throw false
    }
    let soalKata = await (await fetch(`https://raw.githubusercontent.com/BochilTeam/database/master/games/tebakkata.json`)).json()
    let json = soalKata[Math.floor(Math.random() * soalKata.length)]
    
    let caption = ` *[ t e b a k - k a t a ]*
        
🎋 Silahkan tebak kata dibawah ini.
🎋 soal: ${json.soal}


*[ Timeout ]* ${(timeout / 1000).toFixed(2)} detik
*[ Bantuan ]* ${usedPrefix}teka untuk bantuan

!!! Reply pesan ini untuk menjawab
`.trim()
    conn.tebakkata[id] = [
        await conn.reply(m.chat, caption, m),
        json,
        setTimeout(() => {
            if (conn.tebakkata[id]) conn.reply(m.chat, gameOver.replace("%res", json.jawaban), conn.tebakkata[id][0])
            delete conn.tebakkata[id]
        }, timeout)
    ]
}
handler.help = ['tebakkata']
handler.tags = ['game']
handler.command = /^tebakkata/i
handler.group = true

module.exports = handler