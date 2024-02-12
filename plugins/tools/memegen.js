const uploader = require("../../lib/uploader")
let handler = async(m, {conn, text, usedPrefix}) => {
    try {
        let [teks, teks2] = text.split `|`
        let q = m.quoted ? m.quoted : m
        let mime = (q.msg || q).mimetype || ''
        if (!mime) throw 'Tidak ada foto'
        if (!/image\/(jpe?g|png)/.test(mime)) throw `Mime ${mime} tidak support`
        
        let img = await q.download()
        let url = await uploader(img)
        let memegen = `https://api.memegen.link/images/custom/${teks}/${teks2}.png?background=${url}`
        conn.sendSticker(m.chat, memegen, m, { author: set.auth, asSticker: /webp/g.test(mime) })
    } catch (e) {
        m.reply(`Masukan format!!\nReply image dengan caption ${usedPrefix}smeme teks1|teks2\n*Jangan reply sticker*`)
    }
}
handler.help = ['memegen'].map(v => v + ' <text1|text2>')
handler.tags = ['tools']
handler.command = /^memegen$/i;
module.exports = handler;
