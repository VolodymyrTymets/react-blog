let ArticleItem =  React.createClass({
    mixins:[ReactMeteorData],
    getMeteorData(){
        return {
            currentUser:Meteor.user()
        }
    },
    componentDidMount() {
        Materialize.fadeInImage($(this._item))
    },
    handleRemoveArticle(e){
        e.preventDefault();
        var data = $(e.target).data();
        Meteor.call('removeArticle',data.articleid,(err,res) => {
            if (err) {
                Materialize.toast(err.message, 4000);
            } else {
                Materialize.toast('Article ' + res.title + ' was success removed!', 4000);
            }
        });
    },
    render() {
        let { item, ...other } = this.props;
        let moreButton = (
            <div className="fixed-action-btn horizontal click-to-toggle">
                <a className="btn-floating btn-large teal lighten-2">
                    <i className="large mdi-navigation-menu"></i>
                </a>
                <ul>
                    {
                        this.data.currentUser && this.data.currentUser._id === item.createdBy ?
                        (<li><a  className="btn-floating red" onClick= { this.handleRemoveArticle } data-articleid= { item._id }>
                            <i className="material-icons" data-articleid= { item._id }>insert_chart</i></a></li>) : ''
                    }
                    <li><a className="btn-floating yellow darken-1"><i className="material-icons">format_quote</i></a></li>
                    <li><a className="btn-floating green"><i className="material-icons">publish</i></a></li>
                    <li><a className="btn-floating blue"><i className="material-icons">attach_file</i></a></li>
                </ul>
            </div>
        );

        return item.imgUrl === '' ? (
            <div className="card small article-item" ref= {(c) => this._item = c}>
                <div className="card-content ">
                    <span className="card-title">{ item.title } </span>
                    <p>{ item.text }</p>
                </div>
                <div className="card-action">
                    <div className="col s6">
                        <a href={ "/article?_id=" + item._id }>More</a>
                    </div>
                    <div className="col s6">
                        { this.data.currentUser ? moreButton : '' }
                    </div>
                </div>
            </div>
        ) : (
            <div>
                <div className="card small article-item" ref= {(c) => this._item = c}>
                    <div className="card-image">
                        <img src= { item.imgUrl }/>
                        <span className="card-title">{ item.title }</span>
                    </div>
                    <div className="card-content">
                        <p>{ item.text }</p>
                    </div>
                    <div className="card-action">
                        <div className="col s6">
                            <a href={ "/article?_id=" + item._id }>More</a>
                        </div>
                        <div className="col s6">
                            { this.data.currentUser ? moreButton : '' }
                        </div>
                    </div>
                </div>
            </div>
        )


    }
})
this.C.ArticleItem = ArticleItem