const mongoose = require( 'mongoose' );

/*
Announcements{
    homeworkID,
    targetGroup, (groupID or all)
    title,
    text, (optional)
    imageURL, (optional)
    videoURL (optional)
}
*/


const announcementSchema =mongoose.Schema({
    announcementID : {
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
