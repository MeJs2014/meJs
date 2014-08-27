(function(){
    assembly("common", "../common/config_common.js");
    assembly("9211", "9211/config_9211.js");
    namespace("qf").extend("fn", {
        copy: function(o, n){
            me.fn.copy(o, n);
        },
        construct: function(){
            me.fn.clone(this, me.fn);
        }
    });
    namespace("qf.fn").extend("ajax", {
        imports:{
            $:"common.jQuery"
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
            $:"common.jQuery",
            ajax:"qf.fn.ajax"
        },
        _queue:{},
        params: null,
        index:0,
        setParameters:function(opts){
            this.params = opts;
            return this;
        },
        init: function(code, callback){
            var m = this;
            m.load(code, function(){
                m._queue[code] = callback;
            });
            return this;
        },
        construct: function(){
            var m = this;
            m["o"] = function(xpath){
                return xpath ? $("#"+ m.id).find(xpath) : $("#"+ m.id);
            }
            if (m.namespace != qf.component.namespace) {
                me.fn.copy( m.params, this.parent.params );
                typeof m.init == "function" && m.init(m["o"]);
                typeof m.initEvent == "function" && m.initEvent(m["o"]);
                typeof m.setInterval == "function" && me.setIntervalList.push(this);
                typeof m._queue[m.name] == "function" && m._queue[m.name](this);
            }
        },
        destruct: function(){

        }
    });
})(me);
