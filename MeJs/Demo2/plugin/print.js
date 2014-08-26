namespace("demo.plugin").extend("print", {
   exec: function(msg){
       document.getElementsByTagName("body")[0].innerHTML = msg;
   }
});