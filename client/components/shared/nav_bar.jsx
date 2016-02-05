let NavBar= React.createClass({
    mixins:[ReactMeteorData],
    getMeteorData(){
        return {
            currentUser:Meteor.user()
        }
    },
    componentDidMount(){
        $(".dropdown-button").dropdown();
    },
    handleLogOut:function(e){
        e.preventDefault();
        Meteor.logout();
    },
    render(){
        let navDropDown;
        if(this.data.currentUser){
            navDropDown = (
                <ul id="nav-drop-down" className="dropdown-content">
                    <li><a href="/add-article"> Article <i className="material-icons right">playlist_add</i></a></li>
                    <li className="divider"></li>
                    <li><a href="#" onClick={ this.handleLogOut }>Log Out</a></li>
                </ul>
            )
        }else{
            navDropDown = (
                <ul id="nav-drop-down" className="dropdown-content">
                    <li><a href="/login">Sign In</a></li>
                    <li><a href="/register">Sign Up</a></li>
                </ul>
            )
        }
        return (
            <div>
                { navDropDown }
                <nav>
                    <div className="nav-wrapper">
                        <a href="/" className="brand-logo">React Blog</a>
                        <ul className="right hide-on-med-and-down">
                            <li><a className="dropdown-button" href="#!" data-activates="nav-drop-down">More <i className="material-icons right">view_list</i></a></li>
                        </ul>
                    </div>
                </nav>
            </div>
    )
    }
})
this.C.NavBar = NavBar;