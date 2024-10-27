import signupRoute from './signup.js'
import signinRoute from './signin.js'
import adminRoute from './admin.js'
import patient from './patient.js'

const configureServer = (app) => {
    app.use('/signup', signupRoute);
    app.use('/signin', signinRoute);
    app.use('/admin', adminRoute);
    app.use('/patient', patient);
    app.use("*", (req, res) => {
        res.status(400).json({error: "Invalid URL"});
    })
}

export default configureServer;