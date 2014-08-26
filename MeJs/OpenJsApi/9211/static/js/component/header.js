qf.component.extend("9211.header",{
    id:"header_9211",
    params : {
        uid: 0,
        username: '',
        msgNum: '',
        msgPageUrl:'http://www.9211.com/UserCenter/Message',
        msgInfoUrl:'http://www.9211.com/ClientApi/GerUserMessageCount?responseType=jsonp',
        logonUrl: '/Login/Logon',
        headerLogoUrl: '',
        logoutUrl: '/Login/Logoff?returnurl=' + window.location.href,
        passportLogin: 'http://10.10.1.14:8090/iframe/template/user/login.aspx?style=login03&returnurl=http://localhost:9001/Login/Logon?returnurl=' + window.location.href,
        passportregister: 'http://10.10.1.14:8090/Iframe/Template/user/Reg.aspx?plat=11&pro=9211&date=20140219&win=2&islogin=true&returnurl=http://localhost:9001/Login/Logon?returnurl=' + window.location.href
    },
    initLoginPop: function(){
        $('body').prepend('<div id="loginForm" class="rtertier" style="left:50%; margin-left:-194px; top:570px;display:none;z-index:100;top: 50%;margin-top: -214px;"><a id="loginFormClose" class="close" href="javascript:void(0);" title="关闭">关闭</a><div class="hdtit clearfix"><strong>登录</strong></div><div class="loginCot" style="display:block;"><iframe id="loginFormLogonIframe" src="" width="388" height="340" scrolling="no" frameborder="0" allowtransparency="true"></iframe></div></div>');
        $('body').prepend('<div style="position: fixed;_position: absolute;top: 0;left: 0;background: #000;filter: alpha(opacity=10);opacity: 0.6;filter: alpha(opacity=60);z-index:99;display:none;" id="popboxbg"></div>');
        $('#popboxbg').height('100%').width('100%');
        $("#loginFormClose").unbind("click").click(function(){
            $('#loginForm').hide();
            $('#popboxbg').hide();
        });
    },
    init: function(){
        var arr = new Array();
        arr.push('<div id="header_9211">');
        arr.push('    <div class="main">');
        arr.push('        <div class="topLeft">');
        arr.push('            <ul class="topUl leftUl">');
        arr.push('                <li class="lim01"><a href="http://www.9211.com/">前往首页</a></li>');
        arr.push('                <li class="lim02"><a href="javascript:void(0)">设为首页</a></li>');
        arr.push('                <li class="lim03"><a href="javascript:void(0)">加入收藏夹</a></li>');
        arr.push('                <li class="lim04"><a href="javascript:void(0)">收藏至桌面</a></li>');
        arr.push('            </ul>');
        arr.push('        </div>');
        arr.push('        <div class="topRight">');
        arr.push('            <ul id="headerLogoutPart" class="topUl rightUl" style="display:none;">');
        arr.push('                <li class="lim01"><a href="javascript:void(0)">登录</a><span>|</span></li>');
        arr.push('                <li class="lim02"><a title="注册" target="_blank" id="headerRegister" href="http://passport.9211.com/register.aspx">注册</a></li>');
        arr.push('            </ul>');
        arr.push('            <p id="headerLogonPart" style="display:block;">欢迎您，<a class="auser" id="headerUsername" href="http://www.9211.com/UserCenter/Account" target="_blank"></a>&nbsp;&nbsp;<a class="quit" id="headerQuit" href="javascript:void(0)">退出</a>&nbsp;&nbsp;<a class="mail" href="javascript:void(0)"><span>消息</span><em>1</em></a></p></div>');
        arr.push('        <div class="games gamesUp"><a href="javascript:void(0)">所有游戏</a></div>');
        arr.push('    </div>');
        arr.push('</div>');
        arr.push('<div id="header9211_allGefc" style=" left:50%; margin-left:104px; top:28px;">');
        arr.push('    <div class="hotGameWrap"><p class="hotGameText">热门游戏</p>');
        arr.push('        <ul class="hotGameImg">');
        arr.push('            <li><a href="javascript:;" data-openGameSite="1000022"><img src="http://static.7fgame.com/webGameFiles/webpic/header_img1.jpg" width="70" height="38"/>攻城掠地</a></li>');
        arr.push('            <li><a href="javascript:;" data-openGameSite="1000040"><img src="http://static.7fgame.com/webGameFiles/webpic/header_img2.jpg" width="70" height="38"/>暗黑世界</a></li>');
        arr.push('            <li><a href="javascript:;" data-openGameSite="1000034"><img src="http://static.7fgame.com/webGameFiles/webpic/header_img3.jpg" width="70" height="38"/>龙之纹章</a></li>');
        arr.push('        </ul>');
        arr.push('    </div>');
        arr.push('    <table class="tabFc" cellpadding="0" cellspacing="0" border="0">');
        arr.push('    <tr>');
        arr.push('        <th><a href="javascript:void(0)" target="_blank">角色扮演</a></th>');
        arr.push('        <th><a href="javascript:void(0)" target="_blank">战争策略</a></th>');
        arr.push('        <th><a href="javascript:void(0)" target="_blank">其他</a></th>');
        arr.push('    </tr>');
        arr.push('    <tr>');
        arr.push('    <td><a href="javascript:void(0)" target="_blank" data-openGameSite="1000016"><span class="hotIco_H">烈焰</span></a><span></span></td>');
        arr.push('    <td><a href="javascript:void(0)" target="_blank" data-openGameSite="1000022"><span class="hotIco_H">攻城掠地</span></a></td>');
        arr.push('     <td><a href="javascript:void(0)" target="_blank" data-openGameSite="1000029"><span class="">热力赛车</span></a></td>');
        arr.push('</tr>');
        //

        arr.push('    <tr>');
        arr.push('        <td><a href="javascript:void(0)" target="_blank" data-openGameSite="1000012"><span class="hotIco_H">大侠传</span></a><span></span></td>');
        arr.push('        <td>&nbsp;</td>');
        arr.push('        <td><a href="javascript:void(0)" target="_blank" data-openGameSite="1000043"><span class="">弹弹堂3</span></a></td>');
        arr.push('    </tr>');
        arr.push('    <tr>');
        arr.push('        <td><a href="javascript:void(0)" target="_blank" data-openGameSite="1000013"><span class="hotIco_H">龙纹战域</span></a><span></span></td>');
        arr.push('        <td>&nbsp;</td>');
        arr.push('        <td><a href="javascript:void(0)" target="_blank" data-openGameSite="1000011"><span class="">空中大灌篮</span></a></td>');
        arr.push('    </tr>');
        arr.push('    <tr>');
        arr.push('        <td><a href="javascript:void(0)" target="_blank" data-openGameSite="1000024"><span class="hotIco_N">枪魂</span></a><span></span></td>');
        arr.push('        <td>&nbsp;</td>');
        arr.push('        <td>&nbsp;</td>');
        arr.push('    </tr>');
        arr.push('    <tr>');
        arr.push('        <td><a href="javascript:void(0)" target="_blank" data-openGameSite="1000021"><span class="">御天</span></a><span></span></td>');
        arr.push('        <td>&nbsp;</td>');
        arr.push('        <td>&nbsp;</td>');
        arr.push('    </tr>');
        arr.push('    <tr>');
        arr.push('        <td><a href="javascript:void(0)" target="_blank" data-openGameSite="1000001"><span class="">英雄前线</span></a><span></span></td>');
        arr.push('        <td>&nbsp;</td>');
        arr.push('        <td>&nbsp;</td>');
        arr.push('    </tr>');
        arr.push('    <tr>');
        arr.push('        <td><a href="http://www.9211.com/Game" target="_blank" class="hotMore">更多&gt;&gt;</a><span></span></td>');
        arr.push('        <td><a href="http://www.9211.com/Game" target="_blank" class="hotMore">更多&gt;&gt;</a></td>');
        arr.push('        <td><a href="http://www.9211.com/Game" target="_blank" class="hotMore">更多&gt;&gt;</a></td>');
        arr.push('    </tr>');
        arr.push('</table>');
        arr.push('</div>');

        $("body").prepend(arr.join(''));
        delete arr;
        this.build({});
    },
    initEvent: function(o){
        var isShow = false, m = this;
        $("#header9211_allGefc").hide();
        o(".games a").mouseover(function () {
            $("#header9211_allGefc").show();
            $(".games").addClass("gamesDown");
        });
        $("#header9211_allGefc").mouseover(function () {
            isShow = true;
            $(this).show();
            $(".games").addClass("gamesDown");
        });
        $("#header9211_allGefc").mouseout(function () {
            if (isShow) {
                $(this).hide();
                isShow = false;
            }
            o(".games").removeClass("gamesDown");
        });
        o(".games a").mouseout(function () {
            $("#header9211_allGefc").hide();
            isShow = false;
            $(".games").removeClass("gamesDown");
        });

        //设置首页
        o(".lim02 a").not("#headerLogoutPart .lim02 a").on("click", function(e){
            m.setHome(this);
        });

        //加入收藏夹
        o(".lim03 a").on("click", function(){
            qf.fn.addFavorite();
        });

        //收藏到桌面
        o(".lim04 a").on("click", function(){
            qf.fn.createDesktop();
        });
        // 登出
        o(".quit").on("click", function(){
            m._setSiteLogout();
        });

        o("#headerLogoutPart a").not("#headerRegister").on("click", function(){
            m.showLoginPopUp();
        });

        $("[data-openGameSite]").on("click", function(){
            m._openWebsite($(this).attr("data-openGameSite"));
        });
    },
    showLoginPopUp: function(){
        !$("#loginForm").length && this.initLoginPop();
        $('#loginFormLogonIframe').attr('src', this.params.passportLogin);
        $('#loginFormLogon').click();
        $('#loginForm').show();
        $('#popboxbg').show();
    },
    build: function(setting){
        var m = this;
        $.extend(m.params, setting);
        m._initialLoginForm();
        if (m.params.uid == 0) {
            m._setSiteLogout();
        }
        else {
            m._setSiteLogon();
        }
    },
    _initialLoginForm: function() {
        var m = this;
        if (typeof (m.params.headerLogoUrl) == 'undefined' || m.params.headerLogoUrl == null || m.params.headerLogoUrl.length == 0) {
            $('#webSiteLogo').parent().hide();
            $('.headtop .topLeft').css('left', '4px');
            $('.headtop .main').css('height', '34px');
            $('.headtop .topLeft').css('top', '0');
            $('.headtop .topRight').css('top', '0');
            $('.headtop .games').css('top', '3px');
        }
        else {
            $('#webSiteLogo').css('background-image', m.params.headerLogoUrl);
            $('#header9211_allGefc').css('top', '37px');
        }
        var logonUrl = m.params.passportLogin;
        var registerUrl = m.params.passportregister;

    },
    //设置顶部为用户登录状态
    _setSiteLogon: function() {
        var m = this, o = m.o, get = qf.fn.ajax.get;
        o('#headerUsername').html(m.params.username);
        o('#headerQuit').attr('href', m.params.logoutUrl);
        o(".mail em").html(m.params.msgNum || 0);
        (m.params.msgNum || 0) && $(".mail").addClass("mailPost");
        o(".mail").attr('href', m.params.msgPageUrl);
        o('#headerLogonPart').show();
        o('#headerLogoutPart').hide();

        !m.params.msgNum && get( m.params.msgInfoUrl, null, function(r){
            if (m.params.msgNum)
                return;
            o(".mail em").html(r || 0);
            (r || 0) && o(".mail").addClass("mailPost");
            !(r || 0) && o(".mail").removeClass("mailPost");
        });
    },
    //设置顶部为用户未登录状态
    _setSiteLogout: function() {
        //$('#headerLogon').attr('href',params.logonUrl);
        $('#headerLogonPart').hide();
        $('#headerLogoutPart').show();
    },
    //页面上"设为首页"功能的处理事件
    setHome:function(obj) {
        try {
            obj.style.behavior = 'url(#default#homepage)';
            obj.setHomePage(window.location.href);
        } catch (e) {
            if (window.netscape) {
                try {
                    netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
                } catch (e) {
                    alert("抱歉，您所使用的浏览器无法完成此操作！\n\n您需要手动将9211游戏中心【http://www.9211.com】设置为首页");
                }
            } else {
                alert("抱歉，您所使用的浏览器无法完成此操作！\n\n您需要手动将9211游戏中心【http://www.9211.com】设置为首页");
            }
        }
    },
    _openWebsite: function(gameId) {
        var url = 'http://www.9211.com/GameWeb/' + gameId + '/OfficialWebsite/Index';
        window.open(url);
    },
    _saveShortcut: function() {
        var url = 'http://www.9211.com/home/SaveShortcut?name=' + encodeURIComponent('9211游戏中心') + '&url=' + encodeURIComponent("http://www.9211.com")
        window.open(url);
    }
});