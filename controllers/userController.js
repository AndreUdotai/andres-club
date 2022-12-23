const passport = require('passport');
const { body, validationResult } = require('express-validator');
const { ResultWithContext } = require('express-validator/src/chain');
const User = require('../models/user');
const bcrypt = require('bcryptjs');

// Display User create form on GET.
exports.user_create_get = (req, res) => {
    res.render('user_form', { user: req.user, error: 'No error' });
};

// Handle User create on POST.
exports.user_create_post = [
    // validate and sanitize fields.
    body('firstName')
        .trim()
        .isLength({ min: 1 })
        .escape()
        .withMessage('First name must be specified.'),
    body('lastName')
        .trim()
        .isLength({ min: 1 })
        .escape()
        .withMessage('Last name must be specified.'),
    body('username')
        .trim()
        .isLength({ min: 1 })
        .escape()
        .withMessage('Username must be specified.'),
    body('password')
        .trim()
        .isLength({ min: 4 })
        .withMessage('Password must be specified'),
    body('confirmPassword')
        .exists()
        .custom((value, { req }) => value === req.body.password),

    // Process request after validation and sanitation.
    (req, res, next) => {
        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // Create a User object with escaped and trimmed data.
        const user = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            username: req.body.username,
            password: req.body.password,
        });

        if (!errors.isEmpty()) {
            // There are errors. Render form again with sanitized values/errors messages.
            res.render('user_form', {
                error: 'There are errors',
                user: req.body,
                errors: errors.array(),
            });
            return;
        } else {
            // Data from form is valid.
            // Check if a User with the same username already exists.
            User.findOne({ username: req.body.username }).exec(
                (err, found_username) => {
                    if (err) {
                        return next(err);
                    }

                    if (found_username) {
                        // User with same username already exist,  Render form again with sanitized values/errors messages.
                        res.render('user_form', {
                            error: 'Username exists already',
                            user: req.body,
                            errors: errors.array(),
                        });
                        return;
                    } else {
                        bcrypt.hash(
                            user.password,
                            10,
                            (err, hashedPassword) => {
                                if (err) {
                                    return next(err);
                                }
                                user.password = hashedPassword;
                                user.save((err) => {
                                    if (err) {
                                        return next(err);
                                    }
                                    // Successful - redirect to index page (for now)
                                    // res.redirect('/');
                                    passport.authenticate('local', {
                                        successRedirect: '/',
                                        failureRedirect: '/user/create',
                                        // failureFlash: true,
                                    })(req, res);
                                });
                            },
                        );
                    }
                },
            );
        }
    },
];

// Handle User membership code on GET.
exports.user_membership_update_get = (req, res) => {
    res.render('membership_form', { user: req.user, errors: '' });
};

// Handle User membership code on POST.
exports.user_membership_update_post = [
    // Validate and sanitize fields.
    body('membershipCode')
        .trim()
        .isLength({ min: 1 })
        .withMessage('Insert something ke afo udoho idad')
        .equals('kumbaya')
        .withMessage('Wrong membership code.'),

    // Process request after validation and sanitization.
    (req, res, next) => {
        // Extract the validation errors from a request.
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            // There are errors. Render form again with sanitized values/errors messages.
            res.render('membership_form', {
                user: req.user,
                errors: errors,
                enteredCode: req.body,
            });
            return;
        }
        // Data from form is valid.

        // Save validated and sanitized data to a variable
        User.updateOne(
            { _id: req.params.id },
            { $set: { membershipStatus: true } },
            (err) => {
                if (err) {
                    return next(err);
                }
                // Successful - redirect user to home page
                res.redirect('/');
            },
        );
    },
];

// Handle User admin code on GET.
exports.user_admin_update_get = (req, res) => {
    res.render('admin_form', { user: req.user, errors: '' , enteredCode: ''});
};

// Handle User admin code on POST.
exports.user_admin_update_post = [
    // Validate and sanitize fields.
    body('adminCode')
        .trim()
        .isLength({ min: 1 })
        .withMessage('Insert the admin code')
        .equals('kumbayaya')
        .withMessage('Wrong admin code.'),

    // Process request after validation and sanitization
    (req, res, next) => {
        // Extract the validation errors from a request.
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            // There are errors. Render form again with sanitized values/errors messages.
            res.render('admin_form', {
                user: req.user,
                errors: errors,
                enteredCode: req.body.adminCode,
            });
            return;
        }     
        // Data from form is valid.

        // Save validated and sanitized data to a variable 
        User.updateOne(
            { _id: req.params.id },
            { $set: { adminStatus: true } },
            (err) => {
                if (err) {
                    return next(err);
                }
                // Successful - redirect user to home page
                res.redirect('/');
            },
        );         
    }
];

// Handle User login on GET
exports.user_login_get = (req, res) => {
    res.render('user_login', { user: req.user });
};

// Handle User login on POST
exports.user_login_post = (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        console.log('Please fill in all the fields');
        res.render('login_form', {
            username,
            password,
        });
    } else {
        passport.authenticate('local', {
            successRedirect: '/',
            failureRedirect: '/user/login',
            // failureFlash: true,
        })(req, res);
    }
};

// Handle User logout on GET
exports.user_logout = (req, res, next) => {
    req.logout(function (err) {
        if (err) {
            console.log('I got here!!!!!!');
            return next(err);
        }
        res.redirect('/');
    });
};
