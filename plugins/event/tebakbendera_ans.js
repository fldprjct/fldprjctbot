const similarity = require('similarity')
const threshold = 0.72
module.exports = {
    async before(m) {
        let id = m.chat
        if (!m.quoted || !m.quoted.fromMe || !m.quoted.isBaileys || !/.*\[ Bantuan \].*.*teba/i.test(m.quoted.text)) return !0
        this.tebakbendera = this.tebakbendera ? this.tebakbendera : {}
        if (!(id in this.tebakbendera)) return m.reply('Soal itu telah berakhir')
        if (m.quoted.id == this.tebakbendera[id][0].id) {
            let json = JSON.parse(JSON.stringify(this.tebakbendera[id][1]))
            // m.reply(JSON.stringify(json, null, '\t'))
            if (m.text.toLowerCase() == json.name.toLowerCase().trim()) {
                clearTimeout(this.tebakbendera[id][3])
                delete this.tebakbendera[id]
                m.reply(gameWin)
            } else if (similarity(m.text.toLowerCase(), json.name.toLowerCase().trim()) >= threshold) m.reply(`*Dikit Lagi!*`)
            else m.reply(`*Salah!*`)
        }
        return !0
    }
}