const fetch = require("node-fetch")
let timeout = 60000

let handler = async(m, { conn, usedPrefix }) => {
    conn.tebakgambar = conn.tebakgambar ? conn.tebakgambar : {}
    
    let id = m.chat
    if (id in conn.tebakgambar) {
        conn.reply(m.chat, 'Masih ada soal belum terjawab di chat ini', conn.tebakgambar[id][0])
        throw false
    }
    let src = await (await fetch('https://raw.githubusercontent.com/BochilTeam/database/master/games/tebakgambar.json')).json()
    let json = src[Math.floor(Math.random() * src.length)]
    
    let caption = ` *[ t e b a k - g a m b a r ]*
        
🎋 Silahkan Tebak Gambar di Sticker Tersebut.
🎋 Desc: ${json.deskripsi}


*[ Timeout ]* ${(timeout / 1000).toFixed(2)} detik
*[ Bantuan ]* ${usedPrefix}hint untuk bantuan

!!! Reply pesan ini untuk menjawab
`.trim()
        
    let s = await conn.sendSticker(m.chat, json.img, m, {author: "tebak gambar\nby: ktdprjct", asSticker: /webp/g.test(m) })
    conn.tebakgambar[id] = [
		await conn.reply(m.chat, caption, s),
		json,
		setTimeout(() => {
			if (conn.tebakgambar[id]) conn.reply(m.chat, gameOver.replace("%res", json.jawaban), conn.tebakgambar[id].msg)
			delete conn.tebakgambar[id]
		}, timeout)
	]
}
handler.help = ['tebakgambar']
handler.tags = ['game']
handler.command = /^tebakgambar/i
handler.group = true

module.exports = handler