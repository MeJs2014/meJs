me.config.extend("9211", {
    pagesPath:"static/page/",
    cssPath:"static/css/",
    jsPath:"static/js/",
    alias: {
        header: {
            js: "component/header.js",
            css: "component/header.css"
        },
        footer: {
            js: "component/footer.js",
            css: "component/footer.css"
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
    }
});
