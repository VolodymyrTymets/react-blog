class TextArea extends React.Component{
    constructor(props){
        super();
    }
    componentDidMount(){
      if(this.props.counter){
          $(this.refs.self).characterCounter();
      }
    }
    render(){
        let { label, id, iconName, counter, ...other } = this.props;
        let icon ;
        if(iconName )
            icon = (<i className="material-icons prefix">{ iconName }</i>);
        return (
            <div >
                { icon }
                <textarea id={ id } { ...other } ref="self" length= { counter }
                       className= "materialize-textarea" />
                <label htmlFor={ id }
                       data-success='ок'>
                    { label }
                </label>
            </div>
        )
    }
}
this.C.Form.TextArea = TextArea;