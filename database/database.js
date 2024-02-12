const fetch = require("node-fetch")
module.exports = (m, conn = { user: {} }) => {
    const isNumber = x => typeof x === 'number' && !isNaN(x)
    let user = global.db.data.users[m.sender]
    if (typeof user !== 'object') global.db.data.users[m.sender] = {}
    if (user) {
        if (!isNumber(user.afk)) user.afk = -1
        if (!('afkReason' in user)) user.afkReason = ''
        if (!('banned' in user)) user.banned = false
        if (!('premium' in user)) user.premium = false
        if (!isNumber(user.hit)) user.hit = 0
        if (!isNumber(user.warning)) user.warning = 0
        if (!isNumber(user.limit)) user.limit = global.set.limit
        if (!('registered' in user)) user.registered = false
        if (!user.registered) {
            if (!('name' in user)) user.name = conn.getName(m.chat)
            if (!('email' in user)) user.email = ''
            if (!isNumber(user.regTime)) user.regTime = -1
        }
    } else global.db.data.users[m.sender] = {
        afk: -1,
        afkReason: '',
        banned: false,
        premium: false,
        hit: 0,
        warning: 0,
        limit: global.set.limit,
        registered: false,
        name: conn.getName(m.chat),
        email: '',
        regTime: -1
    }
    
    if (m.isGroup) {
        let group = global.db.data.group.find(v => v.jid == m.chat)
        if (group) {
            if (!('welcome' in group)) group.welcome = true
            if (!('antidelete' in group)) group.antidelete = false
            if (!('antilink' in group)) group.antilink = true
            if (!('mute' in group)) group.mute = false
            if (!('filter' in group)) group.filter = false
            if (!('member' in group)) group.member = {}
        } else {
            global.db.data.group.push({
                jid: m.chat,
                welcome: false,
                antidelete: false,
                antilink: false,
                mute: false,
                filter: false,
                member: {}
            })
        }
    }
    
    let settings = global.db.data.settings[conn.user.jid]
    if (typeof settings !== 'object') global.db.data.settings[conn.user.jid] = {}
    if (settings) {
        if (!('debug' in settings)) settings.debug = false
        if (!('chatbot' in settings)) settings.chatbot = true
        if (!('error' in settings)) settings.error = []
        if (!('groupmode' in settings)) settings.groupmode = false
        if (!('self' in settings)) settings.self = false
    } else global.db.data.settings[conn.user.jid] = {
        debug: false,
        chatbot: true,
        error: [],
        groupmode: false,
        self: false
    }
}