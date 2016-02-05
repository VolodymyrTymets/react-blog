let Article = React.createClass({
    mixins:[ReactMeteorData],
    getMeteorData(){
        Meteor.subscribe("articles",{ _id:this.props.articleId });
        return {
            article:Articles.findOne()
        }
    },

    componentDidMount(){
       setTimeout(() => {
           $(this._paralax ).parallax();
           $(this._carousel).carousel();
           $('.carousel-item').materialbox();
       },500);

    },
    render(){
        let { article, ...other } = this.data;
        let img;
        let carousel;
        if (article) {
            carousel = (
                <div className="carousel" ref= {(c) => this._carousel = c}>
                    {
                        article.fotosId.map((item) => {
                            let carlImg = Images.findOne({_id: item })

                            return (<a className="carousel-item" key={ item } href="#one!">
                                        <img  data-caption="A picture of some deer and tons of trees" width="250" src={ carlImg ? carlImg.url() : '' }/></a>)
                        })
                    }

                </div>
            )
            img = Images.findOne({_id: article.fotoId});
            return (
                <div>
                    <div className="parallax-container">
                        <div className="parallax" ref= {(c) => this._paralax = c} ><img src={ img ? img.url() : '/images/no-image.png' }/></div>
                    </div>
                    <div className="section white">
                        <div className="row container">
                            <h2 className="header">{ article.title }</h2>

                            <p className="grey-text text-darken-3 lighten-3">
                                { article.text }
                            </p>

                            { carousel }
                        </div>
                    </div>
                </div>
            )
        }else{
            return (<C.Loading />)
        }

    }
});

this.C.Article = Article;
