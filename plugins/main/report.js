let handler = async(m, { conn, text, usedPrefix, command }) => {
    if (!text) return conn.reply(m.chat, `Silahkan masukan laporan kamu\n\nContoh: ${usedPrefix + command} Lapor pengguna mengirim foto bokep tolong di tindak.`, m)
    if (text > 300) return conn.reply(m.chat, 'Maaf Teks Terlalu Panjang, Maksimal 300 Teks', m)
    let nomor = m.sender
    m.reply("Laporanmu akan di sampaikan ke owner bot")
    const teks1 = `*[ REPORT ]*\nNomor : wa.me/${nomor.split("@s.whatsapp.net")[0]}\nPesan : ${text}`
    conn.reply(global.set.owner[0][0] + '@s.whatsapp.net', teks1, m)
}
handler.help = ['report <fitur>']
handler.tags = ['main']
handler.command = /^(report|lpr|lapor)$/i
module.exports = handler