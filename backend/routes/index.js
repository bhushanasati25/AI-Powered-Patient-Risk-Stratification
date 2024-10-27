import signupRoute from './signup.js'
import signinRoute from './signin.js'
import adminRoute from './admin.js'
import patientRoute from './patient.js'
import doctorRoute from './doctor.js'
import predictRoute from './predict.js'

const configureServer = (app) => {
    app.use('/signup', signupRoute);
    app.use('/signin', signinRoute);
    app.use('/admin', adminRoute);
    app.use('/patient', patientRoute);
    app.use('/doctor', doctorRoute)
    app.use('/predictrisk', predictRoute);
    app.use("*", (req, res) => {
        res.status(400).json({error: "Invalid URL"});
    })
}

export default configureServer;