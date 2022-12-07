const User = require("../models/user");

// Display User create form on GET.
exports.user_create_get = (req, res) => {
    res.send("NOT IMPLEMENTED: User create GET");
};

// Handle User create on POST.
exports.user_create_post = (req, res) => {
    res.send("NOT IMPLEMENTED: User create POST");
};

// Handle User membership code on GET.
exports.user_membership_update_get = (req, res) => {
    res.send("NOT IMPLEMENTED: Membership create GET")
}

// Handle User membership code on POST.
exports.user_membership_upate_post = (req, res) => {
    res.send("NOT IMPLEMENTED: Membership create POST")
}

// Handle User admin code on GET.
exports.user_admin_update_get = (req, res) => {
    res.send("NOT IMPLEMENTED: Admin create GET")
}

// Handle User admin code on POST.
exports.user_admin_update_post = (req, res) => {
    res.send("NOT IMPLEMENTED: Admin create POST")
}