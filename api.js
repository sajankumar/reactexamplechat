var users = require('./libs/users');
module.exports = function (app,express) {
     var router = express.Router();

   
     var messages = [];


    // middleware that is specific to this router
    router.use(function timeLog(req, res, next) {
        console.log('Time: ', Date.now());
        next();
    });



    router.post('/login', function(req,res) {
        console.log(req.body);
        users.createUser(req, function(err, data){
            if(err){
                res.status(500).json({msg:err});
                return;
            }
            res.status(200).json({'user':data});
            console.log(data);
        });
        
    });


    router.post('/newmsg', function(req,res){
          users.msg.postNewMsg(req, function(err, data){
             if(err){
                 res.status(500).json({msg:err});
                 return;
             }
               res.status(200).json({'newmsg':data});
          });
    });


    router.post('/logout', function(req,res){
        console.log("invoking logout request");
        users.remove(req, function(err, data){
            if(err){
                res.status(500).json({msg:err});
                return;
            }
            res.status(200).json({msg:data});
        })
    });


    router.get('/users', function(req,res){
        users.getUser(function(err,data){
            if(err){
                res.status(500).json({msg:err});
                return;
            }
            res.status(200).json({'users':data});
            console.log(data);
        });
    });

     router.get('/messages', function(req,res){
       users.msg.getList(function(err,data){
            if(err){
                res.status(500).json({msg:err});
                return;
            }
            res.status(200).json({'msg':data});
            console.log(data);
        });
    });
    return router;
};