let handler = async(m, { conn, text }) => {
    if (!text) return conn.reply(m.chat, `Mau request fitur apa?`, m)
    if (text > 300) return conn.reply(m.chat, 'Maaf Teks Terlalu Panjang, Maksimal 300 Teks', m)
    let nomor = m.sender
    m.reply("Permintaanmu akan di sampaikan ke owner bot")
    const teks1 = `*[ REQUEST ]*\nNomor : wa.me/${nomor.split("@s.whatsapp.net")[0]}\nPesan : ${text}`
    conn.reply(global.set.owner[0][0] + '@s.whatsapp.net', teks1, m)
}
handler.help = ['request <fitur>']
handler.tags = ['main']
handler.command = /^(request|req)$/i
module.exports = handler