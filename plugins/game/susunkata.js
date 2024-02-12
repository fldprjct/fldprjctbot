const fetch = require("node-fetch")

let timeout = 60000 // 1menit

let handler = async(m, { conn, usedPrefix }) => {
    conn.susunkata = conn.susunkata ? conn.susunkata : {}
    let id = m.chat
    if (id in conn.susunkata) {
        conn.reply(m.chat, 'Masih ada soal belum terjawab di chat ini', conn.susunkata[id][0])
        throw false
    }
    let soalKata = await (await fetch(`https://raw.githubusercontent.com/BochilTeam/database/master/games/susunkata.json`)).json()
    let json = soalKata[Math.floor(Math.random() * soalKata.length)]
    
    let caption = ` *[ s u s u n - k a t a ]*
        
🎋 Susunlah kata dibawah ini.
🎋 soal: ${json.soal}
🎋 tipe: ${json.tipe}


*[ Timeout ]* ${(timeout / 1000).toFixed(2)} detik
*[ Bantuan ]* ${usedPrefix}suka untuk bantuan

!!! Reply pesan ini untuk menjawab
`.trim()
    conn.susunkata[id] = [
        await conn.reply(m.chat, caption, m),
        json,
        setTimeout(() => {
            if (conn.susunkata[id]) conn.reply(m.chat, gameOver.replace("%res", json.jawaban), conn.susunkata[id][0])
            delete conn.susunkata[id]
        }, timeout)
    ]
}
handler.help = ['susunkata']
handler.tags = ['game']
handler.command = /^susunkata/i
handler.group = true

module.exports = handler