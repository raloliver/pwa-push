console.log('FB listening push...');

const messaging = firebase.messaging();

//request permission on browser
messaging.requestPermission()
    .then(() => {
        console.log('Permisson granted.');

        return messaging.getToken()
            .then((currentToken) => {
                if (currentToken) {
                    console.log(currentToken);
                    return currentToken;
                } else {
                    console.warn('FB no identify ID! Please, give us a permission.');
                }
            });
    });

//update token
messaging.getToken()
    .then((currentToken) => {
        if (currentToken) {
            console.log(currentToken);
            return currentToken;
        } else {
            console.warn('FB no identify ID! Please, give us a permission.');
        }
    })
    .catch((err) => {
        console.error('Error: ' + err);
    })