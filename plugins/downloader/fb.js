const fetch = require("node-fetch")

let handler = async(m, {conn, text}) => {
    try {
        m.reply("wait...")
        let res = await fetch(`https://aemt.me/download/fbdown?url=${text}`)
        let data = await res.json()
        let hasil = data.result.url.urls[0].hd
        conn.sendFile(m.chat, hasil, "", set.name, m)
    } catch (e) {
        try {
            
        } catch (e) {
            m.reply("error...")
        }
    }
}
handler.help = ['fb'].map(v => v + ' <url>')
handler.tags = ['downloader']
handler.command = /^fb$/i
module.exports = handler