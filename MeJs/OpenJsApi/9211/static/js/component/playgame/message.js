qf.component.extend("9211.playgame.message", {
    setIntervalSec:600000,
    curSec: 600000,
    params: {
        gameId:"",
        serverId:"",
        createUserMessageUrl: 'http://www.9211.com/ClientApi/CreateUserMessage',
        getPlayTypeUserEfftiveMessageUrl: 'http://www.9211.com/ClientApi/GetPlayPageTextTypeUnreadUserMessage',
        setUserMassageReadedUrl:"http://www.9211.com/ClientApi/SetUserMassageReaded"
    },
    id:"playgameMsg",
    init: function(o){
        var arr = new Array(), get = qf.fn.ajax.get, p = this.params;
        arr.push('    <div id="playgameMsg" style="display: none">');
        arr.push('        <a class="close" href="javascript:void(0)" title="关闭">关闭</a>');
        arr.push('        <div class="cotP">');
        arr.push('            <p style="overflow: hidden;height: 59px;"></p>');
        arr.push('            <p><a href="javascript:void(0)" target="_blank">现在就体验</a></p>');
        arr.push('        </div>');
        arr.push('    </div>');

        !qf.fn.isIE() && $("body").prepend(arr.join(''));
        delete arr;

        get(p.createUserMessageUrl, {gameId: p.gameId, serverId: p.serverId}, function(r){
            r.Code != 0 && window.console && window.console.log(r.Message)
        });
    },
    initEvent: function(o){
        var get = qf.fn.ajax.get,m = this, p = m.params;
        o(".close").click(function(){
            m.close();
        });
    },
    build: function(opts){
        var m = this, o = m.o;
        qf.fn.extend(m.params, opts);
        o().css({top: m.params.top, left: m.params.left});
        //$("iframe.ie").css({ width:o().width(), height:o().height(), top: m.params.top, left: m.params.left,position: 'absolute',border: 0,"background-color": 'transparent',filter:"alpha(opacity=0)" });
        return this;
    },
    setInterval: function(){
        if (qf.fn.isIE())
            return;
        var get = qf.fn.ajax.get, p = this.params, o = this.o;
        get(p.getPlayTypeUserEfftiveMessageUrl, null, function(r){
            if (r.Code == 0 && r.Data.length){
                o(".cotP p").eq(0).html(r.Data[0].TextContent);
                o(".cotP a").attr("href",r.Data[0].RedirectUrl);
                var ids = new Array();
                for(var i = 0; i < r.Data.length; i ++){
                    ids.push(r.Data[i].MsgId);
                }
                o().attr("ids", ids.join(','));
                o().show();
            } else
                window.console && window.console.log(r.Message);
        });
    },
    close: function(){
        var get = qf.fn.ajax.get, p = this.params, o = this.o;
        this.o().hide();
        get(p.setUserMassageReadedUrl, {"ids": o().attr("ids")}, function(r){
            r.Code != 0 && window.console && window.console.log(r.Message);
        });
    }
});