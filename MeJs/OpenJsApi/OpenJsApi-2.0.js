assembly("common", "../common/config_common.js");
assembly("9211", "9211/config_9211.js");
namespace("qf.fn").extend("ajax", {
    imports:{
        $:"common.jQuery1"
    },
    construct: function(){
        var m = this, ajax = function(type, datatype){
            return function(url, data, callback){
                data = data || {};
                qf.fn.extend(data, {"responseType":'jsonp'});
                $.ajax({
                    'url' : url,
                    'type' : type,
                    'data':data,
                    'dataType' : datatype,
                    "success": function(r){
                        typeof callback == 'function' && callback(r);
                    }
                });
            }
        }
        this["get"] = ajax("GET", "jsonp");
        this["post"] = ajax("POST", "jsonp");
        this["getJson"] = ajax("GET", "json");
        this["postJson"] = ajax("POST", "json");
    }
});
namespace("qf").extend("component", {
    setIntervalSec:100,
    imports:{
        $:"common.jQuery1"
    },
    _queue:[],
    init: function(code, callback){
        var m = this;
        m._queue = m._queue || [];
        m._queue.push({ code: code, callback:callback });

        return this;
    },
    construct: function(){
        var m = this;
        m["o"] = function(xpath){
            return xpath ? $("#"+ m.id).find(xpath) : $("#"+ m.id);
        }
        if (m.namespace != qf.component.namespace) {
            typeof m.init == "function" && m.init(m["o"]);
            typeof m.initEvent == "function" && m.initEvent(m["o"]);
            typeof m.setInterval == "function" && me.setIntervalList.push(this);
        }
    },
    setInterval: function(){
        var m = this;
        for(var i = 0; i < m._queue.length; i ++){
            this.load(m._queue[i].code, function(){
                typeof m._queue[i].callback == "function" && m._queue[i].callback(m[m._queue[i].code]);
            });
        }
    },
    destruct: function(){

    }
});