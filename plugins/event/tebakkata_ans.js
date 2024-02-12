let similarity = require('similarity')
const threshold = 0.72
module.exports = {
    async before(m) {
        let id = m.chat
        if (!m.quoted || !m.quoted.fromMe || !m.quoted.isBaileys || !m.text || !/.*\[ Bantuan \].*.*teka/i.test(m.quoted.text))
            return !0
        this.tebakkata = this.tebakkata ? this.tebakkata : {}
        if (!(id in this.tebakkata))
            return conn.reply(m.chat, 'Soal itu telah berakhir', m)
        if (m.quoted.id == this.tebakkata[id][0].id) {
            let json = JSON.parse(JSON.stringify(this.tebakkata[id][1]))
            // m.reply(JSON.stringify(json, null, '\t'))
            if (m.text.toLowerCase() == json.jawaban.toLowerCase().trim()) {
                clearTimeout(this.tebakkata[id][3])
                delete this.tebakkata[id]
                m.reply(gameWin)
            } else if (similarity(m.text.toLowerCase(), json.jawaban.toLowerCase().trim()) >= threshold)
                m.reply(`*Dikit Lagi!*`)
            else
                m.reply(`*Salah!*`)
        }
        return !0
    }
}