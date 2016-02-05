Meteor.publishComposite("articles", function (opt    ,filters) {
    Counts.publish(this, 'articles', Articles.find());
    return {
        find: function () {
            return  Articles.find(opt, filters);
        },
        children: [
            {
                find: function (article) {
                    return Images.find({_id: article.fotoId});
                }
            },
            {
                find: function (article) {
                    return Images.find({_id: { $in: article.fotosId} });
                }
            }
        ]
    }
});

Meteor.publishComposite("searchArticles", function (query,filters) {
    let opt = query !== '' ? {
            $text: {
            $search: query
            }
        } : {};
    let searchFilter = {
        fields: {
            score: {
                $meta: 'textScore'
            }
        },
        sort: {
            score: {
                $meta: 'textScore'
            },
            createdAt:-1
        }
    };
    let exfilter = _.extend(filters,searchFilter);
    Counts.publish(this, 'articles', Articles.find());
    return {
        find: function () {
            return  Articles.find(opt, exfilter);
        },
        children: [
            {
                find: function (article) {
                    return Images.find({_id: article.fotoId});
                }
            }
        ]
    }
});