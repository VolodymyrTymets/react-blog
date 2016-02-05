Meteor.startup(() => {
    if(!Articles.findOne()){
        console.log("Insert into Articles -> [50] items");
        for(let i =0;i<50;i++){
            let article = {
                createdAt: new Date(),
                createtBy: "EtRqLe88CsiG4AcT8",
                text: "##description description descriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescription description description description descriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescription ",
                title: "Article #" + i
            }
            Articles.insert(article)
        }
    }
})