const fetch = require("node-fetch")

let handler = async(m, {conn, text}) => {
    try {
        const { key } = await conn.reply(m.chat, set.textwait, m);
        m.react(set.wait)
        let res = await fetch(`https://aemt.me/download/fbdown?url=${text}`)
        let data = await res.json()
        let hasil = data.result.url.urls[0].hd
        conn.sendFile(m.sender, hasil, "", set.name, fakeMen)
        conn.editMessage(m.chat, key, set.textsukses, m)
        m.react(set.sukses)
    } catch (e) {
        try {
            
        } catch (e) {
            conn.editMessage(m.chat, key, set.textgagal, m)
            m.react(set.gagal)
        }
    }
}
handler.help = ['fb'].map(v => v + ' <url>')
handler.tags = ['downloader']
handler.command = /^fb$/i
module.exports = handler