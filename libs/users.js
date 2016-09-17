var id = require('shortid');
var msg = require('./message')
module.exports = (function(){
  var userList = [];
return{
    createUser:function(req, callback){
       var name = req.body.userName;
       console.log("invoking name....");
       console.log(name);
       var response = {};
            response.type = 0;
       if(name.length > 10){
           response.errorMsg = 'Username should not contain more than 10 character!';
           response.type = 1
           callback(response.errorMsg, null);
           return;
       }
       
       for(var i=0; i<userList.length; i++){
           if(userList[i].name === name){
              response.errorMsg = 'Username already exits, Try another name!';
              response.type = 1
              callback(response.errorMsg, null);
               break;
           }
       }

       if(response.type == 1){return;}
      
     var unique = id.generate();
     userList.push({id:unique, name:name, time:Date.now()});
      msg.setMsg(unique, name.concat(' Joined..')); 
     response.user = {id:unique, name:name};
     callback(null, response.user);
    },

    getUser:function(callback){
        if(userList.length > 0){
            callback(null, userList);
            return;
        }
            var response = {};
            response.type = 1;
            callback(response.type, null);
    },
    remove:function(req,callback){
        if(userList.length > 0){
           for(var i=0; i<userList.length; i++){
                if(userList[i].id == req.body.id){
                    msg.setMsg(req.body.id, userList[i].name.concat(' has left! '));
                    userList.splice(i,1);
                    callback(null, "success");
                    break;
                }
           }
           return;
        }
        var response = {};
            response.type = 1;
        callback(response.type, null);
    },
    msg:{
        getList:function(callback){
           if(msg.getMsg().length > 0){
               callback(null, msg.getMsg());
               return;
           }
           var response = {};
               response.type = 1;
            callback(response.type, null);
        },
         postNewMsg:function(req, callback){
            var response = {};
            response.type = 0;
           if(req.body.text != ""){
               var cusername = "";
                for(var i=0; i<userList.length; i++){
                      if(userList[i].id == req.body.id){
                          cusername = userList[i].name;
                           break;
                      }
                 }


               msg.setMsg(req.body.id, cusername.concat(' said: '+ req.body.text));
               callback(null, "your message has been posted!");
               return;
           }

           response.msg = "You cam't do that!, Please text Hi instead :)";
          callback(response.msg, null);
       }
    }

}

})();