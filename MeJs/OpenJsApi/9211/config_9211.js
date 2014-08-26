me.config.extend("9211", {
    alias: {
            header: {
                js: "static/js/component/header.js",
                css: "static/css/component/header.css"
            },
            footer: {
                js: "static/js/component/footer.js",
                css: "static/css/component/footer.css"
            },
            playgame: {
                header: {
                    js: "component/playgame/header.js",
                    css: "component/playgame/header.css"
                },
                sidebarLeft: {
                    js: "component/playgame/sidebarLeft.js",
                    css: "component/playgame/sidebarLeft.css"
                },
                message: {
                    js: "component/playgame/message.js",
                    css: "component/playgame/message.css"
                },
                onlinePlayer: {
                    js: "component/playgame/onlinePlayer.js"
                }
            }
    },
    init: function(){
        if (qf.isDebug)
            this.url = "http://static.7fgame.com/webGameFiles/web2/OpenJsApi/9211/debug/";
    }
});
