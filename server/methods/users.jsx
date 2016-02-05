Meteor.methods({
    'createUserInRole': (opt,role) =>{
        let userId = Accounts.createUser(opt);
        Roles.addUsersToRoles(userId,role);
        return userId;
    }
})