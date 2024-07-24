import {
    app,
    auth,
    db,
    storage,
    onAuthStateChanged,
    signOut,
    doc,
    getDoc ,
} from "./utils/utils.js";

// console.log("app =>", app);
// console.log("auth =>", auth);
// console.log("db =>", db);
// console.log("storage =>", storage);

const logout_btn = document.getElementById('logout_btn');
const login_link = document.getElementById('login_link');
const user_image = document.getElementById('user_image');
const avatar = document.getElementById('avatar');
const user_contact = document.getElementById('user_contact');

onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.uid;
        login_link.style.display = "none";
        avatar.style.display = "inline-block";
        getUserInfo(uid);
        // console.log(uid);
        // ...
    } else {
        window.location.href = './authentication/login/login.html';
        login_link.style.display = "inline-block";
        avatar.style.display = "none";
    }
});

logout_btn.addEventListener('click', () => {
    signOut(auth);
});

function getUserInfo(uid) {

    const userRef = doc(db, "users", uid);

    getDoc(userRef).then((data) => {
       console.log(data.id);
       console.log(data.data());

       user_image.src = data.data().image;
       user_contact.innerText = data.data().number;

}).catch((error)=>{
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorMessage);
});
};