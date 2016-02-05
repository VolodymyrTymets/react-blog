FlowRouter.route('/login',{
    name:"Login",
    action(params){
        renderMainLayoutWith(< C.Login />)
    }
});