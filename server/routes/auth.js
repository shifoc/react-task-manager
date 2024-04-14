const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const express = require('express');

const router = express.Router();

const User = require('../db/userModel');

// register endpoint
router.post('/register', (request, response) => {
    // hash the password
    bcrypt
        .hash(request.body.password, 10)
        .then((hashedPassword) => {
            // create a new user instance and collect the data
            const user = new User({
                email: request.body.email,
                password: hashedPassword
            });

            // save the new user
            user
                .save()
                // return success if the new user is added to the database successfully
                .then((result) => {
                    //   create JWT token
                    const token = jwt.sign(
                        {
                            userId: user._id,
                            userEmail: user.email
                        },
                        process.env.JWT_KEY,
                        { expiresIn: '24h' }
                    );

                    response.status(201).send({
                        message: 'User Created Successfully',
                        email: user.email,
                        token
                    });
                })
                // catch error if the new user wasn't added successfully to the database
                .catch((_error) => {
                    response.status(500).send({
                        message: 'Error creating user'
                    });
                });
        })
        // catch error if the password hash isn't successful
        .catch((e) => {
            response.status(500).send({
                message: 'Password was not hashed successfully',
                e
            });
        });
});

// login endpoint
router.post('/login', (request, response) => {
    // check if email exists
    User.findOne({ email: request.body.email })

        // if email exists
        .then((user) => {
            // compare the password entered and the hashed password found
            bcrypt
                .compare(request.body.password, user.password)

                // if the passwords match
                .then((passwordCheck) => {
                    // check if password matches
                    if (!passwordCheck) {
                        return response.status(400).send({
                            message: 'Passwords does not match'
                        });
                    }

                    //   create JWT token
                    const token = jwt.sign(
                        {
                            userId: user._id,
                            userEmail: user.email
                        },
                        process.env.JWT_KEY,
                        { expiresIn: '24h' }
                    );

                    //   return success response
                    response.status(200).send({
                        message: 'Login Successful',
                        email: user.email,
                        token
                    });
                })
                // catch error if password do not match
                .catch((_error) => {
                    response.status(400).send({
                        message: 'Passwords does not match'
                    });
                });
        })
        // catch error if email does not exist
        .catch((_e) => {
            response.status(404).send({
                message: 'Email not found'
            });
        });
});

module.exports = router;
