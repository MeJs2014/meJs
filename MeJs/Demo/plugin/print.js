namespace("demo.plugin").extend("print", {
    imports: {
        plugin: "demo.plugin"
    },
   exec: function(msg){
       document.writeln(msg);
   }
});