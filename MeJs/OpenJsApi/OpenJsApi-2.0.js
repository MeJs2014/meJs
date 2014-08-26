assembly("common", "../common/config_common.js");
assembly("9211", "9211/config_9211.js");
namespace("qf").extend("component", {
    imports:{
        $:"common.jQuery1"
    },
    init: function(code, callback){
        var m = this;
        m.load(code, function(){
            me.modularity._inits(m[code]);
            typeof callback == "function" && callback(m[code]);
        });
        return this;
    },
    construct: function(){
        var m = this;
        m["o"] = function(xpath){
            return xpath ? $("#"+ m.id).find(xpath) : $("#"+ m.id);
        }
        typeof m.init == "function" && m.init(m["o"]);
        typeof m.initEvent == "function" && m.initEvent(m["o"]);
        typeof m.setInterval == "function" && me.setIntervalList.push(this);
    },
    destruct: function(){

    }
});