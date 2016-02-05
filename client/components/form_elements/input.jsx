class Input extends React.Component{
    constructor(props){
        super();
    }

    render(){
        let { label, id, iconName, ...other } = this.props;
        let icon ;
        if(iconName )
            icon = (<i className="material-icons prefix">{ iconName }</i>);
        return (      
                <div >
                    { icon }
                    <input id={ id } { ...other }
                           className= "validate" />
                    <label htmlFor={ id }
                           data-success='ок'>
                         { label }
                    </label>
                </div>
        )
    }
}
this.C.Form.Input = Input;