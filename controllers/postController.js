const Post = require("../models/post");
const { body, validationResult } = require('express-validator');
const User = require("../models/user");
const dayjs = require('dayjs');
const relativeTime = require('dayjs/plugin/relativeTime');
const post = require("../models/post");
const { forEach } = require("async");
dayjs.extend(relativeTime)


// Handle Post create on POST
exports.post_create_post = [
    (req, res, next) => {
        const post = new Post({
            post: req.body.post,
            user: req.user._id,
        });

        post.save((err) => {
            if (err) {
                return next(err);
            }
            // Successful
            res.redirect("/");
        })
    }
]

// Display list of all POST.
exports.post_list = (req, res, next) => {
    Post.find({})
        .populate('user')
        .exec((err, posts) => {
            if (err) {
                return next(err);
            }
            posts.reverse();
            console.log(req.user)
            res.render('post_list', {
                user: req.user,
                posts: posts,
                dayjs: dayjs,
            });
        });
};
  
// Handle Post delete on POST.
exports.post_delete_post = (req, res) => {
    Post.findByIdAndRemove(req.body.postid, (err) => {
        if (err) {
            return next(err);
        }
        // Success - redirect back to home page
        res.redirect('/');
    })
};

