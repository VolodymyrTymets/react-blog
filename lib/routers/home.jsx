FlowRouter.route('/',{
    name:"Home",
    action(params, queryParams){
        renderMainLayoutWith(< C.Home />)
    },
    subscriptions(params, queryParams){
        this.register('articles', Meteor.subscribe('articles'));
    }
});