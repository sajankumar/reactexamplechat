import React from 'react';


/* landing page */

class Home extends React.Component{

	constructor(props){
		super(props);

    
	}

    

    componentWillMount(){
        if(!this.props.welcomeUser){
            document.location.href = '/';
        }
    }

    componentDidMount(){
         $(window).bind("beforeunload", function(event) {
            this.logoutHandler(true);
             return "You sure want to close?";
            }.bind(this));
    }

    logoutHandler(e){
        console.log("logout....");
          var id = this.props.welcomeUser.id;
          localStorage.clear();
                        $.ajax({url:this.props.logout, method:'POST', data:{id:id}}).done(function(res){
                        console.log("removed your from the session!");
                         document.location.href = '/';

                    }.bind(this));

         if(typeof e === "boolean"){
                 document.location.href = '/';

         }              
    }

	render(){
		return(
			<div className='container'>
            <header>
				<h1>Welcome Mr. {this.props.welcomeUser.name} <a href='#' className='btn btn-sm btn-danger' onClick={this.logoutHandler.bind(this)}>Logout</a>
</h1>                            

            </header>


                <div className='row'>
                    <div className='col-xm-4 col-sm-4 col-md-4 col-lg-4'>
                        <UserList url={this.props.fetchUsers} delay={this.props.polling} cuser={this.props.welcomeUser.id}/>
                    </div>

                    <div className='col-xm-8 col-sm-8 col-md-8 col-lg-8'>
                        <TextArea url={this.props.fetchMessages} delay={this.props.polling} />
                    </div>
                </div>

                <div className='send-text-box'>
                    <SendText url={this.props.postMsg} cuser={this.props.welcomeUser.id} />
                </div>
			</div>
		);
	}
}


class UserList extends React.Component{
   	constructor(props){
		super(props);

		this.state = { 'users':[]};
	}

    componentWillMount(){
       var interval = setInterval(function(){
             $.ajax({url:this.props.url, method:'GET',error:function(fail){
                 console.log(fail);
                 alert("Something went wrong, Unable to fetch users. Error Type: " + JSON.parse(fail.responseText).msg );
                  clearInterval(interval);
                  localStorage.clear();
                 document.location.href = '/';
                                       
             }}).done(function(data){
                 for(var i=0; i<data.users.length; i++){
                      if(data.users[i].id == this.props.cuser){
                           data.users.splice(i,1);
                           break;
                      }
                 }
                this.setState({users:data.users});
            }.bind(this));

        }.bind(this),this.props.delay);
             
    }

   

    
    render(){
        return(
         <div className='outer-wrapper'>
            <div className='wrapper'>
                <div className='list-group'>
                    {this.state.users.map((v, i)=> <a href='#' className='list-group-item' key={i}> {v.name} </a>  )}
                 </div>
            </div>
        
        </div>

        );
    }

}


class TextArea extends React.Component{
 	constructor(props){
		super(props);

		this.state = { 'messages':[]};
	}

     componentWillMount(){
       var interval = setInterval(function(){
             $.ajax({url:this.props.url, method:'GET', error:function(fail){
                  console.log(fail);
                 alert("Something went wrong,  Error Type: " + JSON.parse(fail.responseText).msg );
                 clearInterval(interval);
                 localStorage.clear();
                 document.location.href = '/';
             }}).done(function(data){
                this.setState({messages:data.msg});
                $('#scrollDiv').animate({
                 scrollTop:$('#scrollDiv').height() * $('#scrollDiv').offset().top},'slow');
            }.bind(this));

        }.bind(this),this.props.delay);
             
    }
    render(){
        return(
           <div className='message-box'> 
            <div className='wrapper' id='scrollDiv'>
                 <div className='list-group'>
                      {this.state.messages.map((v, i)=> <div href='#'  key={i}> <p>{v.message}</p>  <span className="badge">{new Date(v.time).toDateString().concat(' | '+new Date(v.time).toLocaleTimeString())}</span></div>  )}
                </div>

            </div>
            </div>
        );
    }
}



class SendText extends React.Component{
  
    constructor(props){
      super(props);

    }


     sendMsg(){
         if(this.refs.msgs.value == ""){
             return;
         }
      var msg = this.refs.msgs.value
      var cuserId = this.props.cuser;
      var params = {text:msg, id:cuserId};
       $.ajax({url:this.props.url, method:'POST',data:params, error:function(fail){
           alert(JSON.parse(fail.responseText).msg);
       }}).done(function(data){
           console.log("msg posted..");
           this.refs.msgs.value = "";
            }.bind(this));
    }

    enterKeyHandler(evt){
        if(evt.key === 'Enter'){
            this.sendMsg();
        }
    }
     
   render(){

      return(
            <div className='send-msg'>
              <div className='input-group'>
                  <input type='text' placeholder='Send message..' ref={'msgs'} className='form-control' onKeyUp={this.enterKeyHandler.bind(this)} />
                  <button className='btn btn-sm btn-default' onClick={this.sendMsg.bind(this)}>send</button>
              </div>
            </div>
      );

   }


}



Home.defaultProps = {
    fetchUsers:"/api/users",
    fetchMessages:"/api/messages",
    postMsg:"/api/newmsg",
    logout:"/api/logout",
    polling:2000,
    welcomeUser: JSON.parse(localStorage.getItem('user'))
};



export default Home;  