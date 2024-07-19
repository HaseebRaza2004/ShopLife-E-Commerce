import {
    app,
    auth,
    db,
    storage,
    onAuthStateChanged,
} from "./utils/utils.js";

console.log("app =>", app);
console.log("auth =>", auth);
console.log("db =>", db);
console.log("storage =>", storage);

onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.uid;
        // ...
    } else {
        window.location.href = './authentication/login/login.html';
    }
});