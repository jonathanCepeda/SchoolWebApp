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

    patch : function(contentID,targetGroup, title, text, imageURL, videoURL){
        return contentsCollection
            .updateOne({ 
                contentID : contentID 
            }, {  
                $set: {
                    targetGroup: targetGroup,
                    title: title,
                    text: text,
                    imageURL: imageURL,
                    videoURL: videoURL
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
