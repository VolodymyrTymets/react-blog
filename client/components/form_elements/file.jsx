class File extends React.Component{
    constructor(props){
        super();
    }
    componentDidMount(){

    }
    render(){
        let { label, id, placeholder, multiple, ...other } = this.props;
        let input = !multiple ?
            (<input id= { id } type="file"  {...other}/>) :
            (<input id= { id } type="file" multiple  {...other}/>)
        return (
            <div className="file-field input-field">
                <div className="btn">
                    <span>{ label }</span>
                    { input }
                    </div>
                    <div className="file-path-wrapper">
                        <input className="file-path validate" type="text" placeholder={ placeholder }/>
                    </div>
            </div>
        )
    }
}
this.C.Form.File = File;