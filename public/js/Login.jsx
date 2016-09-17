import React from 'react';

class Login extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			userName:"",
			password:""
		};
	}
    
   componentWillMount(){
	   if(localStorage.getItem('user')!= null){
                      document.location.href = "/home";

	   }
   }


	loginHandler(){

		if(this.state.userName === ''){
			return;	
		}
		var params = {
			userName: this.state.userName,
			password:this.state.password
		};
		$.ajax({url:this.props.url, method:'POST', data:params,
		 success:function(data){
			
		},
		 error:function(fail){
			 alert(JSON.parse(fail.responseText).msg);
			console.log(fail);
		}}).done(function(res){
			console.log("inside done function");
            console.log(res);
			localStorage.setItem('user', JSON.stringify(res.user));
            document.location.href = "/home";
		}.bind(this));
	}

	setUserName(e){
		this.setState({ 
			userName:e.target.value
		});
	}

	setPassword(e){
		this.setState({
			password:e.target.value
		});

	}


   render() {
      return (
         <div className='container'>
         	
         		<div className='form-group login-box'>
		         		 <label>Login Here!</label>
						  <div className='input-group'>
		         		 	<input type='text' placeholder='your name!' className='form-control' id='userName' onChange={this.setUserName.bind(this)}/>  
		         		 	<button className='btn btn-lg input-group-addon' onClick={this.loginHandler.bind(this)}>Login</button>
						  </div>
         		</div>

         	

         </div>
      );
   }
}

Login.defaultProps= {
	url:"/api/login"
}

export default Login;


    

	