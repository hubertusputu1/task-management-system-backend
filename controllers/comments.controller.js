import mongoose from 'mongoose'
const Users = mongoose.model('Users');
const Tasks = mongoose.model('Tasks');
const Comments = mongoose.model('Comments');

class CommentsController {
   static createComment(req, res, next) {
      const { body: { comment } } = req;

        if(!comment.userId) {
            return res.status(422).json({
                errors: {
                    userId: 'is required',
                },
            });
        }
        
        if(!comment.taskId) {
            return res.status(422).json({
                errors: {
                    taskId: 'is required',
                },
            });
        }

        if(!comment.text) {
            return res.status(422).json({
                errors: {
                    text: 'is required',
                },
            });
        }

        const newComment = new Comments(comment);

        return newComment.save()
        .then(() => res.json({ comment: newComment.showData() }));
   }

   static deleteComment(req, res, next) {
      const { params: { id } } = req
    
      return Comments.findByIdAndRemove(id)
      .then(_ => res.status(200).json({comment: 'comment deleted'}))
   }

   static getAllComments(req, res, next) {
      const { query: { taskId } } = req

      return Comments.find({taskId})
      .then(comments => res.status(200).json({comments: comments}))
   }
}

export default CommentsController