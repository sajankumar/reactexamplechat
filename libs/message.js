module.exports = (function(){
    var messages = [];

  return{
      setMsg:function(id,msg){
          messages.push({msgId:id, message:msg, time:Date.now()});
         
       },
       getMsg:function(){
           return messages;
       }
      
  }
})();