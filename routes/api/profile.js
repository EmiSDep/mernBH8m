const express = require("express");
const router = express.Router();
const Profile = require("../../models/Profile");
const { check, validationResult } = require("express-validator");
const isEmpty = require("../../utils/isEmpty");
const auth = require("../../middleware/auth");

router.get("/", auth, (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id }).populate(
            'user',
            ['name', 'avatar']
        );

        if (!profile) {
            return res.status(400).json({msg: 'there is no profile for this user' });
        }

        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('server error');
    }
})


  //Basic post route. Expects an entire profile in JSON.
  // @route		GET api/profiles
  // @desc		get user profiles
  // @access	private
  router.post(
    "/",
    auth,
    [
      check("firstName", "First name is required").not().isEmpty(),
      check("lastName", "Last name is required").not().isEmpty(),
    ],
    async (req, res) => {
      console.log("POST request received:");
      console.log(req.body);
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      try {
        const {
          fName,
          lName,
          name,
          occupation,
          educationLevel,
          certifications,
          city,
          state,
          githubUrl,
          twitterUrl,
          bio,
        } = req.body;
        const userId = req.user.id;
  
        // Build profile object
        const profileFields = {};
        profileFields.user = userId;
        if (occupation) profileFields.occupation = occupation;
        if (educationLevel) profileFields.educationLevel = educationLevel;
        if (certifications) profileFields.certifications = certifications;
        if (bio) profileFields.bio = bio;
        if (city) profileFields.city = city;
        if (state) profileFields.state = state;
  
        //Build Social Object
        profileFields.social = {};
        if (githubUrl) profileFields.social.githubUrl = githubUrl;
        if (twitterUrl) profileFields.social.twitterUrl = twitterUrl;
  
        try {
          let profile = await Profile.findById(userId);
  
          if (!isEmpty(profile)) {
            //Update
            profile = await Profile.findByIdAndUpdate(
              userId,
              { $set: profileFields },
              { new: true }
            );
            return res.json(profile);
          }
  
          //Create
  
          profile = await Profile.create(profileFields);
          res.json(profile);
        } catch (error) {
          console.error(error.message);
          res.status(500).send("Server Error");
        }
      } catch (err) {
        res.status(400).json({ message: err.message });
      }
    }
  );

  module.exports = router;