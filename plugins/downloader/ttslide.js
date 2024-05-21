let fetch = require('node-fetch');

let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) throw `Example: ${usedPrefix + command} https://vt.tiktok.com/ZS81qJD5v/`;
    if (!(text.includes('http://') || text.includes('https://'))) return m.reply(`url invalid, please input a valid url. Try with add http:// or https://`);
    if (!text.includes('tiktok.com')) return m.reply(`Hanya support url vt.tiktok.com`);
    const { key } = await conn.reply(m.chat, set.textwait, m);
    m.react(set.wait)
    try {
        let res = await fetch(`https://aemt.me/download/tiktokslide?url=${encodeURIComponent(text)}`);
        res = await res.json(); // Parse response as JSON
        let images = res.result.data.images
        
        if (!images || images.length === 0) throw m.reply('Error: no data');
        conn.editMessage(m.chat, key, set.textsukses, m)
        m.react(set.sukses)
        
        let totalImages = images.length;
        let delay = 7500; // Delay in milliseconds
        
        images.forEach((image, index) => {
            let caption = `Mengirim ${index + 1} dari ${totalImages} slide gambar.`;
            setTimeout(() => {
                //m.reply(`Image ${index + 1}: ${image}`);
                conn.sendFile(m.sender, image, "", caption, fakeMen)
            }, (index + 1) * delay); // atur delaynya d sini
        });
    } catch (e) {
        console.error(e);
        conn.editMessage(m.chat, key, set.textgagal, m)
        m.react(set.gagal)
    }
};

handler.help = ['ttslide <url>'];
handler.tags = ['downloader'];
handler.command = /^(ttfoto|ttslide|tiktokslide|tiktokfoto)$/i;

module.exports = handler;