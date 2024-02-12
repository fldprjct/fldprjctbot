const similarity = require('similarity')
const threshold = 0.72

module.exports = {
    async before(m) {
        let id = m.chat
        if (!m.quoted || !m.quoted.fromMe || !m.quoted.isBaileys || !/.*\[ Bantuan \].*.*teki/i.test(m.quoted.text)) return !0
        this.tekateki = this.tekateki ? this.tekateki : {}
        if (!(id in this.tekateki)) return m.reply('Soal itu telah berakhir')
        if (m.quoted.id == this.tekateki[id][0].id) {
            let json = JSON.parse(JSON.stringify(this.tekateki[id][1]))
            // m.reply(JSON.stringify(json, null, '\t'))
            if (m.text.toLowerCase() == json.jawaban.toLowerCase().trim()) {
                clearTimeout(this.tekateki[id][3])
                delete this.tekateki[id]
                m.reply(gameWin)
            } else if (similarity(m.text.toLowerCase(), json.jawaban.toLowerCase().trim()) >= threshold) m.reply(`*Dikit Lagi!*`)
            else m.reply(`*Salah!*`)
        }
        return !0
    }
}