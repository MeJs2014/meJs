qf.component.extend("9211.playgame.onlinePlayer", {
    setIntervalSec:300000,
    params: {
        gameId:"",
        serverId:"",
        userId:"",
        onlinePlayerUrl: '/OnlinePlayer/OnlineHeartbeat'
    },
    init: function(){

    },
    setInterval: function(){
        var post = qf.fn.ajax.postJson, p = this.params;
        post(p.onlinePlayerUrl, {"gameId": p.gameId, "serverId": p.serverId, "userId": p.uid}, function(r){
            window.console && window.console.log(r.Code);
        });
    }
});