let handler = async(m, { conn, text, usedPrefix, command }) => {
    let who
    if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : false
    else who = m.chat
    let user = db.data.users[who]
    if (who) {
        if ( who === user.premium = true) {
            user.premium = true
            m.reply(`✔️ Success`)
        } else return m.reply("user sudah premium..")
    } else return m.reply(`tag or mention someone!`)
}
handler.help = ['addprem [@user]']
handler.tags = ['owner']
handler.command = /^(add|tambah)p(rem)?$/i
handler.rowner = true

module.exports = handler