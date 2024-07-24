import {
  auth,
  createUserWithEmailAndPassword,
  doc,
  setDoc,
  db,
  storage,
  ref,
  uploadBytes,
  getDownloadURL,
} from "../../utils/utils.js";

const signin_form = document.getElementById("signin_form");
const submit_btn = document.getElementById("submit_btn");

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

  // console.log("email=>", userInfo.email);
  // console.log("password=>", userInfo.password);

  submit_btn.disabled = true;
  submit_btn.innerText = "Loading";

  createUserWithEmailAndPassword(auth, email, password)
    .then((user) => {

      console.log('user=>', user);
      console.log('user=>', user.user.uid);

      const userRef = ref(storage, `user/${user.user.uid}`)

      uploadBytes(userRef, image).then(() => {

        console.log("User image uploaded");

        getDownloadURL(userRef).then((url) => {
          console.log("url=>", url);

          userInfo.image = url;

          const userDbRef = doc(db, "users", user.user.uid);

          setDoc(userDbRef, userInfo).then(() => {
            console.log("User added in db");
            window.location.href = "/";

            submit_btn.disabled = false;
            submit_btn.innerText = "submit";
          })
            .catch((error) => {
              alert("Error in adding user to db");
              submit_btn.disabled = false;
              submit_btn.innerText = "submit";
            });
        })
          .catch((error) => {
            alert("Error in getting url");
            submit_btn.disabled = false;
            submit_btn.innerText = "submit";
          });

      })
        .catch((error) => {
          alert("User image isn't upload");
          submit_btn.disabled = false;
          submit_btn.innerText = "submit";
        });
    })
    .catch((error) => {
      alert("Error =>", error);
      submit_btn.disabled = false;
      submit_btn.innerText = "submit";
    });

  // console.log("user info =>", userInfo);

});
