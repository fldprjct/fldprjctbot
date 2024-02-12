const fetch = require("node-fetch")

let handler = async(m, {conn, command}) => {
    let type = (command).toLowerCase();
    let baseUrl = 'https://weeb-api.vercel.app/';
    
    const fetchImage = async (endpoint) => {
        try {
            const response = await fetch(baseUrl + endpoint);
            if (!response.ok) throw m.reply(`gagal mendapatkan gambar ${type}`)
            const imageBuffer = await response.buffer(); // Get the image data as a buffer
            conn.sendFile(m.chat, imageBuffer, 'img.jpg', `Random ${type}`, m);
        } catch (error) {
            console.error(error);
            m.reply(`error...`);
        }
    }
    switch (type) {
        case 'loli':
            fetchImage('loli');
        break;
        
        case 'waifu':
            fetchImage('waifu');
        break;
        
        case 'neko':
            fetchImage('neko');
        break;
        
        case 'zerotwo':
            fetchImage('zerotwo');
        break;
        
        default:
        break;
    }
}
handler.help = ['waifu', 'neko', 'zerotwo', 'loli']
handler.tags = ['internet']
handler.command = ['waifu', 'neko', 'zerotwo', 'loli']

module.exports = handler