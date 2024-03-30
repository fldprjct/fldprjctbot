let handler = async(m, { conn, isOwner, isAdmin, isRAdmin, text, participants }) => {
    if (isOwner || isAdmin || isRAdmin) {
        const tag = participants.filter(participant => participant.admin !== "superadmin" && participant.admin !== "admin").map(participant => participant.id);
        
        conn.sendMessage(m.chat, { text: text, mentions: tag })
    } else { m.reply('lu bukan atmin group!!') }
}

handler.help = ['hidetag <pesan>']
handler.tags = ['group']
handler.command = /^(hidetag)$/i

handler.group = true

module.exports = handler