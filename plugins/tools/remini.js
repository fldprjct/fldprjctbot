const fetch = require('node-fetch');
const uploader = require("../../lib/uploader")

let handler = async (m, {conn}) => {
    try {
        let q = m.quoted ? m.quoted : m;
        let mime = (q.msg || q).mimetype || '';
        
        if (/image/.test(mime)) {
            let media = await q.download();
            let link = await uploader(media)
            let response = await fetch(`https://aemt.me/remini?url=${link}&resolusi=4`);
            let remini = await response.json();
            let hasil = remini.url;
            
            m.reply(`Sedang memproses...`);
            await conn.sendFile(m.chat, hasil, 'hade.jpg', 'HD kan? kagak:v', m);
        } else {
            m.reply('Mohon kirimkan gambar.');
        }
    } catch (error) {
        console.error(error);
        m.reply('Terjadi kesalahan saat memproses gambar.');
    }
};
handler.help = ['remini'].map(v => v + '<reply gambar>')
handler.tags = ['tools']
handler.command = /^remini$/i;
module.exports = handler;
