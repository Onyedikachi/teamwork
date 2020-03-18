/* eslint-disable radix */
const Gif = require('../../models/Gif');

module.exports.createGif = (req, res) => {
  const image = {};
  image.gifUrl = req.file.url;
  image.gifStatus = req.body.gifStatus;
  image.userId = req.body.userId;
  image.gifName = req.body.gifName;
  image.publicId = req.file.public_id;
  image.createdOn = new Date().toLocaleString();

  Gif.create(image)
    .then(newImage => {
      if (newImage) {
        return res.status(200).json({
          data: {
            message: 'GIF image successfully posted',
            gifId: parseInt(newImage.gif_id),
            createdOn: new Date(`${newImage.created_on}`).toLocaleString(),
            title: newImage.gif_name,
            imageUrl: newImage.gif_url
          },
          status: 'success'
        });
      }
      return res.status(400).json({
        data: {
          message: 'Error creating GIF'
        },
        status: 'error'
      });
    })
    .catch(error => {
      return res.status(400).json({
        data: {
          message: 'Error creating GIF'
        },
        status: 'error'
      });
    });
};
module.exports.deleteGif = (req, res) => {
  const gif = {};
  gif.gifId = parseInt(req.params.gifId);
  Gif.delete(gif)
    .then(count => {
      if (count > 0) {
        return res.status(200).json({
          data: {
            message: 'Gif successfully deleted'
          },
          status: 'success'
        });
      }
      return res.status(400).json({
        data: {
          message: 'Gif does not exist'
        },
        status: 'error'
      });
    })
    .catch(error => {
      return res.status(400).json({
        data: {
          message: 'Error deleting Gif'
        },
        status: 'error'
      });
    });
};

module.exports.commentOnGif = (req, res) => {
  const comment = {};
  comment.comment = req.body.comment;
  comment.content = parseInt(req.body.content);
  comment.contentId = parseInt(req.params.gifId);
  comment.userId = parseInt(req.body.userId);
  comment.commentDate = new Date().toLocaleString();
  comment.lastUpdated = new Date().toLocaleString();

  Gif.comment(comment)
    .then(newComment => {
      if (newComment) {
        return res.status(200).json({
          data: {
            message: 'Comment successfully created on gif',
            commentId: parseInt(newComment.comment_id),
            gifId: parseInt(newComment.content_id),
            createdOn: new Date(`${newComment.comment_date}`).toLocaleString(),
            updatedOn: new Date(`${newComment.last_updated}`).toLocaleString(),
            comment: newComment.comment
          },
          status: 'success'
        });
      }
      return res.status(400).json({
        data: {
          message: 'Error creating Comment'
        },
        status: 'error'
      });
    })
    .catch(error => {
      return res.status(400).json({
        data: {
          message: 'Error creating Comment'
        },
        status: 'error'
      });
    });
};
