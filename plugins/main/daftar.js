const Captcha = require("@haileybot/captcha-generator");

let handler = async(m, {conn, text}) => {
    conn.regist = conn.regist ? conn.regist : {}
    // daftar
    if (!text) return m.reply("masukkan nama dan umur\nContoh: .reg fldrj03.18")
    let user = global.db.data.users[m.sender]
    if (conn.regist[m.sender]) return m.reply('kamu sudah mengajukan pendaftaran, silahkan verifikasi captcha...');
    if(user.registered === true) return m.reply("kamu sudah terdaftar di database bot")
    let [name, age] = text.split `.`
    if (!name) return m.reply("Nama tidak boleh kosong (Alphanumeric)")
    if (!age) return m.reply("Umur tidak boleh kosong (Angka)")
    age = parseInt(age);
    if (age > 25) return m.reply("*Gak boleh!*,\nTua Amat Dah 🗿")
    if (age < 5) return m.reply("*Gak boleh!*,\nBanyak Pedo 🗿")
    if (user.name && user.name.trim() === name.trim()) return m.reply("Nama sudah dipakai...")
    
    // Captcha
    let captcha = new Captcha();
    let confirm = "☘️ ʀᴇᴘʟʏ ᴘᴇsᴀɴ ɪɴɪ ᴅᴇɴɢᴀɴ ᴍᴇɴɢᴇᴛɪᴋ ᴋᴏᴅᴇ ᴏᴛᴘ ʏᴀɴɢ ᴀᴅᴀ ᴘᴀᴅᴀ ɢᴀᴍʙᴀʀ!";
    let { key } = await conn.sendFile(m.chat, captcha.dataURL, '', confirm, fakeMen);
    
    // db
    const id = m.sender
    conn.regist[id] = {
        message: m,
        id: m.sender,
        names: name,
        age: age,
        user,
        key,
        captcha: captcha.value,
        timeout: setTimeout(() => {
            conn.sendMessage(m.chat, { delete: key });
            delete conn.registrasi[m.sender];
        }, 60 * 1000)
    }
}

handler.help = ["daftar", "register"].map(v => v + " <nama>.<umur>");
handler.tags = ["xp"];
handler.command = /^(register|verify|daftar|reg(is)?|verif)$/i;
module.exports = handler
