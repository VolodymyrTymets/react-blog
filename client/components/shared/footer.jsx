class Footer extends React.Component{
    constructor(props){
        super();
        this.state = {};
    }

    render(){
        return (
            <footer className="page-footer grey darken-4">
                <div className="container">
                    <div className="row">
                        <div className="col l12 s12">
                            <h5 className="white-text">Meteor - React blog </h5>
                            <p className="grey-text text-lighten-4">You can use rows and columns here to organize your footer content.</p>
                        </div>
                    </div>
                </div>
                <div className="footer-copyright">
                    <div className="container">
                        <div className="row">
                            <div className="col l6  offset-l3 valign-wrapper">
                                <div className="valign-wrapper">
                                    © 2016 Copyright Text
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        )
    }
}
this.C.Footer = Footer;