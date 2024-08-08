let cheerio = require("cheerio")
let axios = require("axios")

let handler = async(m, {conn, args}) => {
    
if(!args[0]) return m.reply("INVALID URL (reel, watch, share)")
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};

function facebook(url) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            try {
                if (!url.match(/facebook\.\w+\/(reel|watch|share)/gi))
                    return reject("INVALID URL (reel, watch, share)");
                const a = yield axios
                    .get("https://fdownloader.net/id", {
                    headers: {
                        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36",
                    },
                })
                    .then((v) => v.data);
                const EX = /k_exp ?= ?"(\d+)"/i;
                const TO = /k_token ?= ?"([a-f0-9]+)"/i;
                const ex = (_a = a.match(EX)) === null || _a === void 0 ? void 0 : _a[1];
                const to = (_b = a.match(TO)) === null || _b === void 0 ? void 0 : _b[1];
                if (!ex || !to)
                    return reject("Error Extracting Exp And Token");
                const b = yield axios
                    .post("https://v3.fdownloader.net/api/ajaxSearch?lang=id", new URLSearchParams({
                    k_exp: ex,
                    k_token: to,
                    q: url,
                    lang: "id",
                    web: "fdownloader.net",
                    v: "v2",
                    w: "",
                }), {
                    headers: {
                        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36",
                        origin: "https://fdownloader.net",
                    },
                })
                    .then((v) => v.data);
                if (b.status !== "ok")
                    return reject("Failed Doing Ajax Search");
                const _ = cheerio.load(b.data);
                const $ = cheerio.load(_(".detail").html());
                const d = {
                    title: $(".thumbnail > .content > .clearfix > h3").text().trim(),
                    duration: $(".thumbnail > .content > .clearfix > p").text().trim(),
                    thumbnail: $(".thumbnail > .image-fb > img").attr("src") || "",
                    media: $("#popup_play > .popup-body > .popup-content > #vid").attr("src") ||
                        "",
                    video: $("#fbdownloader")
                        .find(".tab__content")
                        .eq(0)
                        .find("tr")
                        .map((i, el) => {
                        const d = {
                            quality: $(el).find(".video-quality").text().trim(),
                            url: $(el).find("a").attr("href") ||
                                $(el).find("button").attr("data-videourl") ||
                                el,
                        };
                        if (d.url === "#note_convert")
                            return;
                        return d;
                    })
                        .get(),
                    music: $("#fbdownloader").find("#audioUrl").attr("value") || "",
                };
                resolve(d);
            }
            catch (e) {
                reject(e);
            }
        }));
    });
}
const { key } = await conn.reply(m.chat, set.textwait, m);
m.react(set.wait)

try {
    let res = await facebook(args[0])
    .then(result => 
        //console.log(result.video[0].url)
        conn.sendFile(m.sender, result.video[0].url, "", set.name, fakeMen)
      )
      .then(result =>
        console.log(result)
      )
    conn.editMessage(m.chat, key, set.textsukses, m)
    m.react(set.sukses)
} catch (e) {
    try {
    } catch (e) {
        conn.editMessage(m.chat, key, set.textgagal, m)
        m.react(set.gagal)
    }
}
}

handler.help = ['fb2'].map(v => v + ' <url>')
handler.tags = ['downloader']
handler.command = /^fb2$/i

handler.register = true
handler.limit = true

module.exports = handler


/*
facebook('https://www.facebook.com/reel/8332097983521651')
  .then(result => 
    console.log(result.video[0].url)
  )

  .then(result =>
    console.log(result)
  )
}
*/