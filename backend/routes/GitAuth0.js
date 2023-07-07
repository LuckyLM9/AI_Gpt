const express = require('express')

const passport = require('passport')
const GithubStrategy = require('passport-github2').Strategy
const session = require('express-session')
const jwt = require('jsonwebtoken');

require("dotenv").config()

const router = express.Router();

router.use(
    session({
        secret: process.env.GITHUB_CLIENT_SECRET,
        resave: false,
        saveUninitialized: false
    })
);



router.use(passport.initialize());
router.use(passport.session());


passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
})

passport.use(
    new GithubStrategy({
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: process.env.GITHUB_REDIRECT_URI
    }, (accessToken, refreshToken, profile, done) => {
        return done(null, profile);
    })
);
console.log(process.env.GITHUB_REDIRECT_URI)

router.get('/auth/github', passport.authenticate('github', {scope: ['user:email']}),(req,res)=>{
    const redirectUrl=`http://localhost:3000/Home?user=${encodeURIComponent(JSON.stringify(req.user))}`
res.redirect(redirectUrl)
})
router.get('/auth/github/callback', passport.authenticate('github', {failureRedirect: '/'}), (req, res) => {
    const user=req.user
    const token= jwt.sign(user,process.env.SECRET_KEY)
    const redirectUrl=`http://localhost:3000/Home?token=${encodeURIComponent(token)}`
    res.redirect(redirectUrl);
});

router.get('/success', (req, res) => {
    if (req.user){
        const username=req.user.username
        return res.status(200).send("login effettuato correttamente")
        
    }
    res.status(400).send("login non corretto");
});

router.get('/github/connectedUser', (req, res) => {
    if (req.user) {
        const token = jwt.sign({
            id: req.user.id,
            username: req.user.username,
            email: req.user._json.email,
            role: "role",
            authType: "github"
        }, process.env.SECRET_KEY, {
            expiresIn: '4h'
        });
        return res.send({
            statusCode: 200,
            token
        });
    }
    res.statusCode(404).send({
        message: "User not found",
        statusCode: 404
    });
})

module.exports=router;
