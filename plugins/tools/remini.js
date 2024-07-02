const fetch = require('node-fetch');
const uploader = require("../../lib/uploader")
const { remini } = require('betabotz-tools');

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
            await conn.sendFile(m.chat, hasil, 'hade.jpg', 'HD kan? kagak:v\n\nv.1', m);
        } else {
            m.reply('Mohon kirimkan gambar.');
        }
    } catch (e) {
        try {
            let q = m.quoted ? m.quoted : m;
            let mime = (q.msg || q).mimetype || '';
            
            if (/image/.test(mime)) {
                let media = await q.download();
                let link = await uploader(media)
                let response = await remini(link)
                let hasil = response.image_data;
                
                m.reply(`Sedang memproses...`);
                await conn.sendFile(m.chat, hasil, 'hade.jpg', 'HD kan? kagak:v\n\nv.2', m);
            }
        } catch (e) {
            console.error(e);
            m.reply('Terjadi kesalahan saat memproses gambar.');
        }
    }
};
handler.help = ['remini', 'hd'].map(v => v + '<reply gambar>')
handler.tags = ['tools']
handler.command = /^(remini|hd)$/i;
module.exports = handler;
