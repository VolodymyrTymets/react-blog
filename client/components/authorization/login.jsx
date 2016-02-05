class Login extends React.Component{
    constructor(props){
        super();
        this.state = {
            formState:'initial',
            errMessage:''
        };
        this.requireMessage = "Fielld $s must be required";
        this.userNotFoundMessage = "User not Found. Incorrect Email or password";
    }
    setFormState(state,errMessage){
        this.setState({
            formState:state,
            errMessage:errMessage
        });
    }
    inputRequire(e){
        let email = e.target.email.value;
        let password = e.target.password.value;

        if(email === '') {this.setFormState('error',this.requireMessage.replace('$s', 'Email')); return false} ;
        if(password === '') {this.setFormState('error',this.requireMessage.replace('$s', 'Password')); return false};
        return true;
    }
    handleClick(e) {
        e.preventDefault();
        let self = this;

        // Require Input
        if(!this.inputRequire(e)) return;

        self.setFormState({formState:'loading'});
        Meteor.loginWithPassword(e.target.email.value,e.target.password.value, (err,res) => {
            if(err){
                if(err.error === 403){ this.setFormState('error',this.userNotFoundMessage); return }
                this.setFormState('error',err.message)
            }else{
                Materialize.toast('Login was success!', 4000);
                FlowRouter.go('/');
            }
        });
    }
    render(){
        let submitIconName = '';
        let submitColor = '';
        switch (this.state.formState){
            case 'initial':{
                submitIconName = "play_arrow";
                break;
            }
            case 'loading':{
                submitIconName = "loop";
                break;
            }
            case 'done':{
                submitIconName = "done";
                break;
            }
            case 'error':{
                submitIconName = "error_outline";
                submitColor = 'pink'
                break;
            }
        }
        return (
            <div className="row">
                <form className="col s6 offset-s3 card-panel" onSubmit={ this.handleClick.bind(this) }>
                    <div className="row">
                        <div className="col s12">
                            <h3>Login</h3>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col s12">
                            <span className="pink-text text-darken-2">{ this.state.errMessage }</span>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s12">
                            <C.Form.Input label="Email" id="email" name="email" type="email"/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s12">
                            <C.Form.Input label="Password" id="password" name="password" type="password"/>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col s2 m4 offset-s10 offset-m8">
                            <button className={ "waves-effect waves-light btn " + submitColor} type="submit"> <i className="material-icons right">{ submitIconName }</i>Submit</button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}
this.C.Login = Login;