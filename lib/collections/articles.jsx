Articles = new Mongo.Collection('articles');
if(Meteor.isServer) {
    Articles._ensureIndex({
        'title': 'text',
        'text': 'text'
    });
}