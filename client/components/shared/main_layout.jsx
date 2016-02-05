class MainLayout extends React.Component{
    render(){
        return (
             <div className="container-fluid">
                {this.props.header}
                <div className="content">
                   {this.props.content}
                </div>
                {this.props.footer}
             </div>
        )
    }
}
this.C.MainLayout = MainLayout;