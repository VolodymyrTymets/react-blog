FlowRouter.route('/article',{
    name:"Article",
    action(params, queryParams){
        renderMainLayoutWith(< C.Article articleId = { queryParams._id} />)
    }
});