FlowRouter.route('/register',{
    name:"Register",
    action(params){
        renderMainLayoutWith(< C.Register />)
    }
});