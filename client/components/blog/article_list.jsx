class ArticleList extends React.Component{
    constructor(props){
        super();
        this.state = {
        }
           }

    render(){
        return (
            <div className= "container" id="articles-container">
                {
                    this.props.items.map((item) => {
                        let img = Images.findOne({ _id:item.fotoId });
                        item.imgUrl = img ? img.url() : '';
                        return (
                            <div key = { item._id } >
                                < C.ArticleItem item={ item } key={ item._id } />
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}
this.C.ArticleList = ArticleList;