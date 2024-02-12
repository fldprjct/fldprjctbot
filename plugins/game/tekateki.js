const fetch = require("node-fetch")

let timeout = 60000 // 1menit

let handler = async(m, { conn, usedPrefix }) => {
    conn.tekateki = conn.tekateki ? conn.tekateki : {}
    let id = m.chat
    if (id in conn.tekateki) {
        conn.reply(m.chat, 'Masih ada soal belum terjawab di chat ini', conn.tekateki[id][0])
        throw false
    }
    let soalKata = await (await fetch(`https://raw.githubusercontent.com/BochilTeam/database/master/games/tekateki.json`)).json()
    let json = soalKata[Math.floor(Math.random() * soalKata.length)]
    
    let caption = ` *[ t e k a - t e k i ]*
        
🎋 Silahkan jawab teka-teki dibawah ini.
🎋 soal: ${json.soal}


*[ Timeout ]* ${(timeout / 1000).toFixed(2)} detik
*[ Bantuan ]* ${usedPrefix}teki untuk bantuan

!!! Reply pesan ini untuk menjawab
`.trim()
    conn.tekateki[id] = [
        await conn.reply(m.chat, caption, m),
        json,
        setTimeout(() => {
            if (conn.tekateki[id]) conn.reply(m.chat, gameOver.replace("%res", json.jawaban), conn.tekateki[id][0])
            delete conn.tekateki[id]
        }, timeout)
    ]
}
handler.help = ['tekateki']
handler.tags = ['game']
handler.command = /^tekateki/i
handler.group = true

module.exports = handler