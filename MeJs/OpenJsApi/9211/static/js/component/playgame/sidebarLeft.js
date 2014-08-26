qf.component.extend("9211.playgame.sidebarLeft", {
    id: "sidebarLeft",
    params:{
        gameLogoUrl:'http://pic.7fgame.com/WebGameFiles/Gamelogo/{gameId}_4.jpg',
        gameId: 0,
        serverId: 0,
        gameHomeUrl:'http://www.9211.com/GameWeb/{gameId}',
        hrefList:[],
        sidebarEventCallback:null
    },
    init: function(o){
        var arr = new Array();
        arr.push('<div id="sidebarLeft">');
        arr.push('    <div class="sidebar-content">');
        arr.push('        <div class="logo"><a class="btnLog" href="javascript:void (0)" target="_blank"><img src="images/logo_bg.png" alt=""></a></div>');
        arr.push('        <div class="leftBtn">');
        arr.push('            <ul class="btnUl">');
        arr.push('                <li><a href="http://pay.9211.com/?appinfo={gameId},{serverId}" target="_blank">充值中心</a></li>');
        arr.push('                <li><a href="http://www.9211.com/task" target="_blank">签到领积分</a></li>');
        arr.push('                <li><a href="http://www.9211.com/giftbag/cards?gameId={gameId}&serverId={serverId}" target="_blank">新手卡</a></li>');
        arr.push('                <li><a href="http://shop.9211.com/Item/ItemMore?shopType=v" target="_blank">免费送首冲</a></li>');
        arr.push('                <li><a href="http://vip.9211.com/" target="_blank">领工资返利</a></li>');
        arr.push('            </ul>');
        arr.push('        </div>');
        arr.push('        <div class="leftHref">');
        arr.push('            <ul class="herfUl">');
        arr.push('            </ul>');
        arr.push('        </div>');
        arr.push('    </div>');
        arr.push('    <div class="sidebar-toggle">');
        arr.push('        <a href="javascript:void(0);"></a>');
        arr.push('    </div>');
        arr.push('</div>');
        $("body").prepend(arr.join(''));
        delete arr;
        this.build({});
    },
    initEvent: function(o){
        var m = this,o = m.o, p = m.params;
        o('.sidebar-toggle a').click(function(){
            o(".sidebar-toggle").hasClass('sidebar-toggle-menu') ? m.open() : m.close();
            return false;
        });
    },
    open: function(){
        var m = this,o = m.o, p = m.params;
        o('.sidebar-content').show();
        o('.fTier').show();
        o(".sidebar-toggle").removeClass('sidebar-toggle-menu');
        typeof p.sidebarEventCallback == "function" && p.sidebarEventCallback('open');
    },
    close: function(){
        var m = this,o = m.o, p = m.params;
        o('.sidebar-content').hide();
        o('.fTier').hide();
        o(".sidebar-toggle").addClass('sidebar-toggle-menu');
        typeof p.sidebarEventCallback == "function" && p.sidebarEventCallback('close');
    },
    build: function(opts){
        var m = this, o = m.o;
        qf.fn.copy(m.params, opts);
        var opts = m.params;
        o(".btnUl li a").each(function(){
            var href = $(this).attr("href");
            href = href.replace("{gameId}", opts.gameId).replace("{serverId}", opts.serverId);
            o(this).attr("href", href);
        });

        var hrefArray = new Array();
        for (var i = 0; i < opts.hrefList.length; i ++){
            hrefArray.push('<li class="'+(i % 2 == 0 ? 'liBg' : '')+'"><a href="'+opts.hrefList[i].href+'" target="_blank">'+opts.hrefList[i].name+'</a></li>');
        }
        o(".herfUl").append(hrefArray.join(''));
        o(".logo img").attr("src", opts.gameLogoUrl.replace("{gameId}", opts.gameId));
        o(".logo a.btnLog").attr("href", opts.gameHomeUrl.replace("{gameId}", opts.gameId));
    }
});