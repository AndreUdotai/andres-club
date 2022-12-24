const Post = require("../models/post");
const { body, validationResult } = require('express-validator');
const User = require("../models/user");
const dayjs = require('dayjs');
const relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)


// Display Post create form on GET.
// exports.post_create_get = (req, res) => {
//     res.send("NOT IMPLEMENTED: Post create GET");
// };

// Handle Post create on POST
exports.post_create_post = [
    // Validate and sanitize fields.
    body('post')
        .trim()
        .isLength({ min: 1 })
        .withMessage('You did not type anything!'),

    // Process request after validation and sanitization
    (req, res, next) => {
        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // Creata a Post object with escaped and trimmed data
        const post = new Post({
            post: req.body.post,
            user: req.user._id,
        });

        if (!errors.isEmpty()) {
            // There are errors. Render form again with error message
            res.render('post_list', {
                user: req.user,
                errors: errors,
                post: req.body.post,
            });
            return;
        }
        // Data from form is valid.

        // Save validated and sanitized data to a variable
        post.save((err) => {
            if (err) {
                return next(err);
            }
            // Successful: it stays on the home page
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
            //Successful, so render
            // for (let post of posts) {
            //     console.log(dayjs(post.timeStamp).from(dayjs))
            // }
            res.render('post_list', {
                user: req.user,
                posts: posts,
            });
        });
};

// Display Post delete form on GET.
exports.post_delete_get = (req, res) => {
    res.send("NOT IMPLEMENTED: Post delete GET");
};
  
// Handle Post delete on POST.
exports.post_delete_post = (req, res) => {
    res.send("NOT IMPLEMENTED: Post delete POST");
};

