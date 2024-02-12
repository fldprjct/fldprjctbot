const fetch = require("node-fetch")

let handler = async(m, {conn, text}) => {
    let res = await fetch(`https://weeb-api.vercel.app/anime?search=${text}`)
    let data = await res.json()
}