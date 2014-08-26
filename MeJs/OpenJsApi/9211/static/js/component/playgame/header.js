qf.component.extend("9211.playgame.header", {
    id:"gameplayheader",
    //默认Header配置
    params : {
        username: '',
        vipLevel: 0,
        vipUrl:"http://vip.9211.com/",
        userCenterUrl: 'http://www.9211.com/UserCenter/Account',
        gameId: 1000022,
        serverId: 1,
        msgNum: '',
        msgPageUrl:'http://www.9211.com/UserCenter/Message',
        msgInfoUrl:'http://www.9211.com/ClientApi/GerUserMessageCount?responseType=jsonp',
        userNoticeUrl:'http://www.9211.com/ClientApi/GetGameAnnouncementInfo',
        gamePayUrl:'http://pay.9211.com/?appinfo={gameId},{serverId}',
        changedEventCallback:null
    },
    init: function(o){
        var arr = new Array();
        arr.push('<div id="gameplayheader" class="tools_top_box">');
        arr.push('    <div class="tools_top">');
        arr.push('        <div class="topLeft">');
        arr.push('            <div class="logo">');
        arr.push('                <a href="http://www.9211.com/" target="_blank">9211.com</a>');
        arr.push('            </div>');
        arr.push('            <div class="game_name">');
        arr.push('                <a class="btnSc" href="javascript:void (0)">加入收藏夹</a>&nbsp;&nbsp;&nbsp;&nbsp;');
        arr.push('                <a class="btnZm" href="javascript:void (0)">收藏至桌面</a>');
        arr.push('            </div>');
        arr.push('            <div class="notice">');
        arr.push('                <div class="noticeHd">');
        arr.push('                    <span>公告：</span>');
        arr.push('                    <a href="javascript:void(0)" target="_blank"></a>');
        arr.push('                </div>');
        arr.push('            </div>');
        arr.push('        </div>');
        arr.push('        <div class="topRight">');
        arr.push('            <p><span class="spHy"></span><a class="urName" href="javascript:;" target="_blank"></a></p>');
        arr.push('            <a class="rkVa" href="javascript:;" target="_blank"><em class="btnV1"></em></a>');
        arr.push('            <div class="divLine"></div>');
        arr.push('            <a class="mail mailPost" href="javascript:;" target="_blank"><span>消息</span><em>0</em></a>');
        arr.push('            <div class="divLine"></div>');
        arr.push('            <a class="topUp" href="javascript:;" target="_blank">充值</a>');
        arr.push('            <div class="divLine"></div>');
        arr.push('            <a class="btnSq" href="javascript:;">&nbsp;</a>');
        arr.push('        </div>');
        arr.push('    </div>');
        arr.push('    <div class="tools_open" style=""><a class="arrow" href="javascript:void(0);" alt="点击打开"></a></div>');
        arr.push('</div>');
        $("body").prepend(arr.join(''));
        delete arr;
        this._initialLoginForm(o);
    },
    initEvent: function(o){
        var m = this;
        o(".btnSc").click(function(){
            qf.fn.addFavorite();
        });
        o(".btnZm").click(function(){
            qf.fn.createDesktop();
        });
        o(".btnSq").click(function(){
            m.close();
            return false;
        });
        $(".tools_open").click(function(){
            m.open();
            return false;
        });
    },
    close: function(){
        var m = this, o = m.o;
        o(".tools_top").hide();
        o(".tools_open").show();
        qf.component["9211.playgame.sidebarLeft"] && qf.component["9211.playgame.sidebarLeft"].o(".logo").css("margin-top","5px");
        typeof m.params.changedEventCallback == "function" && m.params.changedEventCallback("close");
    },
    open: function(){
        var m = this, o = m.o;
        o(".tools_top").show();
        o(".tools_open").hide();
        qf.component["9211.playgame.sidebarLeft"] && qf.component["9211.playgame.sidebarLeft"].o(".logo").css("margin-top","38px");
        typeof m.params.changedEventCallback == "function" && m.params.changedEventCallback("open");
    },
    build: function(opts){
        var m = this;
        qf.fn.extend(m.params, opts);
        m._initialLoginForm(m.o);
    },
    _GetNewsContent: function(data) {
        if (typeof (data) == 'undefined' || data == null) {
            return data;
        }
        if (data.length > 19) {
            return data.substr(0, 19) + '...';
        }
        else {
            return data.substr(0, 19)
        }
    },
    //获取游戏公告
    _getGameAnnouncement: function() {
        var m = this, get = qf.fn.ajax.get;
        get(m.params.userNoticeUrl, { gameId: m.params.gameId, serverId: m.params.serverId }, function(r){
            m.o(".noticeHd a").html(r.Data.Title).attr("href", r.Data.URL);
        });
    },
    _initialLoginForm:function(o) {
        var m = this, get = qf.fn.ajax.get;
        o('.urName').html(m.params.username).attr('href', m.params.userCenterUrl);
        o('.rkVa em').attr('class', 'btnV' + m.params.vipLevel);
        o("a.rkVa").attr("href", m.params.vipUrl);
        o(".mail").attr("href", m.params.msgPageUrl);
        o(".topUp").attr("href", m.params.gamePayUrl.replace("{gameId}", m.params.gameId).replace("{serverId}", m.params.serverId));
        if (!m.params.msgNum)
        {
            get( m.params.msgInfoUrl, undefined, function(r){
                o(".mail em").html(r || 0);
                (r || 0) && $(".mail").addClass("mailPost");
                !(r || 0) && $(".mail").removeClass("mailPost");
                var wCount = 200 + parseInt($(".topRight p").width()) + parseInt($(".topRight .mail > em").width());
                $(".topRight").width(wCount);
            });
        }
        m._getGameAnnouncement(o);
    }
});