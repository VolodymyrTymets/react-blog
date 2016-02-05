Meteor.methods({
    'addArticle': (opt) => {
        let userId = Meteor.userId();
        let articleId;
        if(userId){
           let article = opt;
           article.createdBy = userId;
           article.createdAt = new Date();
           article.fotosId = article.fotosId ? article.fotosId : [];
           articleId = Articles.insert(article);
        }
        return articleId;
    },
    'setImageToArticle':(articleId,imageId) => {
        console.log('-> setImageToArticle articleId ['+articleId+'] imageId ['+imageId+']')
        let article = Articles.findOne({ _id: articleId});
        article.fotosId.push(imageId);
        Articles.update({_id:article._id},article);
    },
    'removeArticle': (articleId) => {
        let article = Articles.findOne({ _id: articleId});
        if(article) {
            Images.remove({_id:article.fotoId});
            Articles.remove({_id:article._id});
            return article;
        }
    }
})