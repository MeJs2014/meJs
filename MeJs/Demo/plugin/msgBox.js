namespace("demo.plugin").extend("msgBox",{
    imports: {
        plugin: "demo.plugin"
    },
    show: function(msg){
        alert(msg);
    }
});