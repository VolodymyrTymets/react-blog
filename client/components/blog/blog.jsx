let Blog = React.createClass({
    mixins:[ReactMeteorData],
    getMeteorData(){
        Meteor.subscribe("searchArticles",this.state.searchQuery,{limit:this.state.itemInPage});
        return {
            articles:Articles.find().fetch(),
            articlesCount:Counts.get('articles')
        }
    },
    getInitialState(){
      return {
          itemPerPage:5,
          itemInPage:5,
          page:1,
          searchQuery:''
      }
    },
    addBlogItems(){
        window.Blog = this;
        let newPage = this.state.page +  1;
        let newItemInPage= this.state.itemPerPage * newPage;
        this.setState({
            page:newPage,
            itemInPage:newItemInPage
        })
    },
    handleMoreClick(e){
        e.preventDefault();
        this.addBlogItems();
    },
    handleSearchChange(e){
        e.preventDefault();
        if(e.target.value.length === 0 ){
            this.setState({
                searchQuery:e.target.value,
                page:1
            })
        }
        if(e.target.value.length > 3 ){
            this.setState({
                searchQuery:e.target.value
            })
        }

    },
    componentDidMount(){

    },
    render(){
        let moreButton  ;
        if(this.state.searchQuery === '' && this.data.articlesCount > this.state.itemInPage){
            moreButton = (
                            <div className="row">
                                <div className="col s4 offset-s6">
                                    <a className="waves-effect waves-light btn-large" onClick= { this.handleMoreClick }>More</a>
                                </div>
                            </div>
                        )
        }
        return (
            <div className="row">
                <div className="col s12">
                    <div className="container">
                        <div className="row">
                            <div className="col s8">
                            <h2> Blog </h2>
                            </div>
                            <div className="col s4">
                            <form >
                                <div className="input-field">
                                    <C.Form.Input  id="search" name="search" type="text" iconName="search" onChange= { this.handleSearchChange }/>
                                </div>
                            </form>
                            </div>
                        </div>
                    </div>
                    < C.ArticleList items= {this.data.articles } />
                    { moreButton }
                </div>
            </div>
        )

    }
});

this.C.Blog = Blog;
