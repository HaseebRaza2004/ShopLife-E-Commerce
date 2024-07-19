import {
    auth,
    createUserWithEmailAndPassword,
    doc,
    setDoc,
    storage,
    ref,
    uploadBytes,
    getDownloadURL,
} from "../../utils/utils.js";

const signin_form = document.getElementById("signin_form");

signin_form.addEventListener('submit', function (e) {
    e.preventDefault();
    console.log("e=>", e);

    const image = e.target[0].files[0];
    const email = e.target[1].value;
    const password = e.target[2].value;
    const first_name = e.target[4].value;
    const last_name = e.target[5].value;
    const number = e.target[6].value;
    const company = e.target[7].value;

    const userInfo = {
        image,
        email,
        password,
        first_name,
        last_name,
        number,
        company,
    };

    createUserWithEmailAndPassword(auth, email, password)
  .then((user) => {
    console.log('user=>',user);
  })
  .catch((error) => {
    console.log(error);
  });

    console.log("user info =>", userInfo);

    console.log(auth);

});