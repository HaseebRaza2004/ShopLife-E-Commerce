import {
    auth,
    onAuthStateChanged,
    db,
    doc,
    getDoc,
    signOut,
} from "../utils/utils.js";

//  console.log(auth);

const user_image = document.getElementById("user_image");
const user_email = document.getElementById("user_email");
const logout_btn = document.getElementById("logout_btn");


onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.uid;
        gettingUserInfo(uid)
        // console.log(uid);
        // ...
    } else {
        window.location.href = '../authentication/login/login.html';
    }
});

function gettingUserInfo(uid) {

    const userRef = doc(db, "users", uid);

    getDoc(userRef).then((data) => {
        console.log(data.id);
        console.log(data.data());

        user_image.src = data.data().image;
        user_email.innerText = data.data().email;

    }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
    });
};

logout_btn.addEventListener('click' , ()=>{
    signOut(auth);
});