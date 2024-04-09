let handler = async(m, { conn, isOwner, isAdmin, isRAdmin, text, participants }) => {
    const fkontak = {
    	"key": {
        "participants":"0@s.whatsapp.net",
    		"remoteJid": "status@broadcast",
    		"fromMe": false,
    		"id": "Halo"
    	},
    	"message": {
    		"contactMessage": {
    			"vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`
    		}
    	},
    	"participant": "0@s.whatsapp.net"
    }
    if (isOwner || isAdmin || isRAdmin) {
        const tag = participants.filter(participant => participant.admin !== "superadmin" && participant.admin !== "admin").map(participant => participant.id);
        
        conn.sendMessage(m.chat, { text: text, mentions: tag }, {quoted: fkontak})
    } else { m.reply('lu bukan atmin group!!') }
}

handler.help = ['hidetag <pesan>']
handler.tags = ['group']
handler.command = /^(hidetag)$/i

handler.group = true

module.exports = handler