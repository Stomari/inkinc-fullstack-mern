const express = require('express');
const passport = require('passport');

const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/User');

// Bcrypt to encrypt passwords
const bcryptSalt = 10;

// Sign up
router.post('/signup', (req, res) => {
  // ---------------------------------------> Sign up if it is an User
  if (req.body.role === 'User') {
    const { email, password, name, role } = req.body;

    if (!email || !password || !name) {
      res.status(400).json({ message: 'Provide email, password and your name' });
      return;
    }

    if (password.length < 7) {
      res.status(400).json({ message: 'Please make your password at least 8 characters long for security purposes.' });
      return;
    }

    User.findOne({ email }, 'email', (err, user) => {
      if (err) {
        res.status(500).json({ message: 'Email check went bad.' });
        return;
      }

      if (user) {
        res.status(400).json({ message: 'Email already in use.' });
        return;
      }

      const salt = bcrypt.genSaltSync(bcryptSalt);
      const hashPass = bcrypt.hashSync(password, salt);

      const newUser = new User({
        email,
        password: hashPass,
        name,
        role,
        profileImg: 'https://icon-library.net/images/default-profile-icon/default-profile-icon-24.jpg',
        folder: [],
        favoriteArtist: [],
      });

      newUser.save((error) => {
        if (error) {
          res.status(400).json({ message: 'Saving user to database went wrong.' });
          return;
        }

        // Automatically log in user after sign up
        // .login() here is actually predefined passport method
        req.login(newUser, (error) => {
          if (error) {
            res.status(500).json({ message: 'Login after signup went bad.' });
            return;
          }

          // Send the user's information to the frontend
          // We can use also: res.status(200).json(req.user);
          res.status(200).json(newUser);
        });
      });
    });
  }

  // ---------------------------------------> Sign up if it is an Artist
  if (req.body.role === 'Artist') {
    const { email, password, name, role, category, workplace } = req.body;

    if (!email || !password || !name) {
      res.status(400).json({ message: 'Provide email, password and your name' });
      return;
    }

    if (password.length < 7) {
      res.status(400).json({ message: 'Please make your password at least 8 characters long for security purposes.' });
      return;
    }

    User.findOne({ email }, 'email', (err, user) => {
      if (err) {
        res.status(500).json({ message: 'Email check went bad.' });
        return;
      }

      if (user) {
        res.status(400).json({ message: 'Email already in use.' });
        return;
      }

      const salt = bcrypt.genSaltSync(bcryptSalt);
      const hashPass = bcrypt.hashSync(password, salt);

      const newUser = new User({
        email,
        password: hashPass,
        name,
        role,
        profileImg: 'https://icon-library.net/images/default-profile-icon/default-profile-icon-24.jpg',
        about: '',
        workplace,
        flash: [],
        artistTattoo: [],
        category,
      });

      newUser.save((error) => {
        if (error) {
          res.status(400).json({ message: 'Saving user to database went wrong.' });
          return;
        }

        // Automatically log in user after sign up
        // .login() here is actually predefined passport method
        req.login(newUser, (error) => {
          if (error) {
            res.status(500).json({ message: 'Login after signup went bad.' });
            return;
          }

          // Send the user's information to the frontend
          // We can use also: res.status(200).json(req.user);
          res.status(200).json(newUser);
        });
      });
    });
  }
});

// Login
router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, theUser, failureDetails) => {
    if (err) {
      res.status(500).json({ message: 'Something went wrong when authenticating user' });
      return;
    }

    if (!theUser) {
      // "failureDetails" contains the error messages
      // from our logic in "LocalStrategy" { message: '...' }.
      res.status(401).json(failureDetails);
      return;
    }

    // save user in session
    req.login(theUser, (err) => {
      if (err) {
        res.status(500).json({ message: 'Session save went bad.' });
        return;
      }

      // We are now logged in (that's why we can also send req.user)
      res.status(200).json(theUser);
    });
  })(req, res, next);
});

// Logout
router.post('/logout', (req, res) => {
  // req.logout() is defined by passport
  req.logout();
  res.status(200).json({ message: 'Log out success!' });
});

// Check logged user
router.get('/loggedin', (req, res) => {
  if (req.isAuthenticated()) {
    res.status(200).json(req.user);
    return;
  }
  res.status(403).json({ message: 'Unauthorized' });
});

module.exports = router;
