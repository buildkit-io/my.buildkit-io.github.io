// Initialize Firebase
var config = {
    apiKey: "AIzaSyCneEqoP1F_srbWuUvGOnXVARzu0LCDoV4",
    authDomain: "my.buildkit.io",
    databaseURL: "https://buildkit-7c60d.firebaseio.com",
    storageBucket: "buildkit-7c60d.appspot.com",
    messagingSenderId: "1046318263987"
};
firebase.initializeApp(config);

// Instantiate the lock and auth0 libraries
var lock = new Auth0Lock('nfjX9kv2qs1f9TVB22SuDnPiFA6ieY6M', 'buildkit.eu.auth0.com');
var auth0 = new Auth0({
    domain: 'buildkit.eu.auth0.com',
    clientID: 'nfjX9kv2qs1f9TVB22SuDnPiFA6ieY6M'
})

// listen to when the user gets authenticated and then save the profile
lock.on("authenticated", function(authResult) {
    lock.getProfile(authResult.idToken, function(error, profile) {

        if (error) {
            // handle error
            console.log(error);
            return;
        }

        localStorage.setItem('idToken', authResult.idToken);
        localStorage.setItem('profile', JSON.stringify(profile))

        // Set the options to retreive a firebase delegation token
        var options = {
            id_token: authResult.idToken,
            api: 'firebase',
            scope: 'openid name email displayName',
            target: 'nfjX9kv2qs1f9TVB22SuDnPiFA6ieY6M'
        };

        // Make a call to the Auth0 '/delegate'
        auth0.getDelegationToken(options, function(err, result) {
            if (!err) {
                // Exchange the delegate token for a Firebase auth token
                firebase.auth().signInWithCustomToken(result.id_token).catch(function(error) {
                    console.log(error);
                });
            }
            else {
                console.log(err);
            }
        });
    });
});

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        var profile = localStorage.getItem('profile');
        profile = JSON.parse(profile);
        console.log(profile);
        console.log('Welcome: ' + profile.email);
    }
    else {
        // Display the default lock widget
        lock.show();
    }
});

// Finally, we'll implement a logout function to allow the user
// to logout once they are done creating stories
function logout() {
    localStorage.removeItem('idToken');
    localStorage.removeItem('profile');
    firebase.auth().signOut().then(function() {
        console.log("Signout Successful")
    }, function(error) {
        console.log(error);
    });
}
