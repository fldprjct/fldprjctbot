let fetch = require("node-fetch")
let handler = async(m, {conn, text, usedPrefix, command}) => {
    if(!text) throw conn.reply(m.chat, `Contoh: ${usedPrefix + command} url`, m)
    if (!text.match(/((www|vt|vm).tiktok.com)/gi)) throw m.reply(`Url salah, perintah ini untuk mengunduh Media Tiktok`)
    m.reply("wait...")
    
    /*try {
        let ttdl2 = await (await fetch(`https://aemt.me/download/ttdl?url=${text}`)).json()
        let hasil = ttdl2.result.video[0]
        conn.sendFile(m.chat, hasil, "", set.name, m)
        return;
    } catch (e) {
        m.reply("error, mencoba cara ketiga..")
    }*/
    
    try {
        let ttdl3 = await (await fetch(`https://skizo.tech/api/tiktok?url=${text}&apikey=filand`)).json()
        let judul = ttdl3.data.title
        let hasil = ttdl3.data.play
        conn.sendFile(m.chat, hasil, "", judul + "\n\n" + set.name, m)
        return;
    } catch (e) {
        console.log(e)
        m.reply("gagal mendownload media\nAtau mungkin link tersebut tiktokslide/foto")
    }
    
}
handler.help = ['tt'].map(v => v + ' <link>')
handler.tags = ['downloader']
handler.command = /^(tt|tiktok)$/i
module.exports = handler
