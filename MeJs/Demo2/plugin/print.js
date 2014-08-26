namespace("demo.plugin").extend("print", {
   imports:{
        plugin:"demo.plugin"
   },
   exec: function(msg){
       document.getElementsByTagName("body")[0].innerHTML = msg;
   }
});