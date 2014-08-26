namespace("demo.plugin").extend("msg", {
    imports:{
        msgBox: "demo.plugin.msgBox",
        print:"demo.plugin.print"
    },
    show: function(msg){
        this.msgBox.show(msg);
    },
    print: function(msg){
        this.print.exec(msg);
    }
});