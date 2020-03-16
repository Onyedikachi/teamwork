/* eslint-disable radix */
const Gif = require('../../models/Gif');

module.exports.createGif = (req, res) => {
  const image = {};
  image.gifUrl = req.file.url;
  image.gifStatus = req.body.gifStatus;
  image.userId = req.body.userId;
  image.gifName = req.body.gifName;
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