class Register extends React.Component{
    constructor(props){
        super();
        this.state = {
            formState:'initial',
            errMessage:''
        };

        this.requireMessage = "Fielld $s must be required";
        this.confirmPasswordMessage = "Confirm Password not the same";
        this.invalidPasswordMessage = "Min length of password is 6";
    }

    inputRequire(e){
        let email = e.target.email.value;
        let password = e.target.password.value;
        let confirmPassword = e.target.confirmPassword.value;
        if(email === '') {this.setFormState('error',this.requireMessage.replace('$s', 'Email')); return false} ;
        if(password === '') {this.setFormState('error',this.requireMessage.replace('$s', 'Password')); return false};
        if(confirmPassword === '') {this.setFormState('error',this.requireMessage.replace('$s', 'Confirm Password')); return false};
        if(password.length < 6){
            this.setFormState('error',this.invalidPasswordMessage); return false
        }
        if(password !== confirmPassword){
            this.setFormState('error',this.confirmPasswordMessage); return false
        }
        if(e.target.firstName.value === '') {this.setFormState('error',this.requireMessage.replace('$s', 'Name')); return false};
        if(e.target.lastName.value === '') {this.setFormState('error',this.requireMessage.replace('$s', 'Surname')); return false};
        return true;
    }
    handleClick(e){
        e.preventDefault();
        let  self = this;
        // Require all inputs
        if(!this.inputRequire(e)) return;

        self.setState({formState:'loading'});

        let opt = {
            email: e.target.email.value,
            password: e.target.password.value,
            profile: {
                firstName: e.target.firstName.value,
                lastName: e.target.lastName.value
            }
        };
        Meteor.call('createUserInRole',opt,'users',(err,res) => {
            if(err){
                self.setState({formState:'error'});
                self.setState({errMessage:err.message});
            }else{
                Materialize.toast('Register was success!', 4000);
                FlowRouter.go('/');
            }
        });
    }
    setFormState(state,errMessage){
        this.setState({
            formState:state,
            errMessage:errMessage
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
                <form className="col s8 offset-s2 card-panel" onSubmit={ this.handleClick.bind(this) }>
                    <div className="row">
                        <div className="col s12">
                           <h3>Register</h3>
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
                        <div className="input-field col s12">
                            <C.Form.Input label="Confirm password" id="confirm-password" name="confirmPassword" type="password"/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s6">
                            <C.Form.Input label="First tName" id="first-name" name="firstName" iconName="account_circle" type="text"/>
                        </div>
                        <div className="input-field col s6">
                            <C.Form.Input label="Last Name" id="last-name" name="lastName" iconName="account_circle"  type="text"/>
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
this.C.Register = Register;
