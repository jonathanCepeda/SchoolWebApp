const mongoose = require( 'mongoose' );

const contentsSchema =mongoose.Schema({
    contentID : {
        type : String,
        required : true,
        unique : true
    },
    targetGroup : String,
    title : String,
    text : String,
    imageURL : String,
    videoURL : String
});

const contentsCollection = mongoose.model("contents", contentsSchema);

const Contents = {
    get : function(){
        return contentsCollection
            .find()
            .then( contents => {
                return contents;
            })
            .catch( err => {
                throw Error(err);
            });
    },

    getOne : function(contentID){
        return contentsCollection
            .find({ contentID : contentID })
            .then( content => {
                return content;
            })
            .catch( err => {
                throw Error(err);
            });
    },

    post : function(newContent){
        return contentsCollection
            .create(newContent)
            .then( createdContent => {
                return createdContent;
            })
            .catch( err => {
                throw Error(err);
            });
    },

    delete : function(contentID){
        return contentsCollection
            .remove({ contentID : contentID })
            .then( deletedContent => {
                return deletedContent;
            })
            .catch( err => {
                throw Error(err);
            });
    },

    patch : function(updateContent){
        return contentsCollection
            .updateOne({ 
                contentID : updateContent.contentID 
            }, {  
                $set: {
                    targetGroup: updateContent.targetGroup,
                    title: updateContent.title,
                    text: updateContent.text,
                    imageURL: updateContent.imageURL,
                    videoURL: updateContent.videoURL
                }
            })
            .then( updatedContent => {
                return updatedContent;
            })
            .catch( err => {
                throw Error(err);
            });
    }
};

module.exports = { Contents };
