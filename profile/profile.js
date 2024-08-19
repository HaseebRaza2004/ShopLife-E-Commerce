import {
    auth,
    onAuthStateChanged,
    db,
    doc,
    getDoc,
    signOut,
    getDocs,
    collection, 
    query, 
    where,
    deleteDoc 
} from "../utils/utils.js";

//  console.log(auth);

const user_image = document.getElementById("user_image");
const user_email = document.getElementById("user_email");
const logout_btn = document.getElementById("logout_btn");
const dealerItemContainer = document.getElementById("dealerItemContainer");


onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.uid;
        gettingUserInfo(uid);
        getAllDealerItems(user.uid);
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


async function getAllDealerItems(uid) {
    try {
        const q = query(collection(db, "items"), where("createdBy", "==", uid));
        const querySnapshot = await getDocs(q);
        dealerItemContainer.innerHTML = '';
        querySnapshot.forEach((doc) => {
            console.log(`${doc.id} => ${doc.data()}`);

            const item = doc.data();

            const { img, description, title, category, price, createdBy } = item;

            const card = ` <div class="p-4 md:w-1/3">
                    <div class="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
                        <img class="lg:h-48 md:h-36 w-full object-cover object-center"
                            src="${img}" alt="blog"/>
                        <div class="p-6">
                            <h2 class="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">${category}</h2>
                            <h1 class="title-font text-lg font-medium text-gray-900 mb-3">${title}</h1>
                            <p class="leading-relaxed mb-3">${description}</p>
                            <div class="flex items-center flex-wrap ">
                                <button onclick="deleteitem(this)" class="text-indigo-500 inline-flex items-center md:mb-2 lg:mb-0">Delete
                                    <svg class="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"
                                        fill="none" stroke-linecap="round" stroke-linejoin="round">
                                        <path d="M5 12h14"></path>
                                        <path d="M12 5l7 7-7 7"></path>
                                    </svg>
                                </button id=${doc.id}>
                                <span
                                    class="text-gray-400 mr-3 inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm pr-3 py-1 border-r-2 border-gray-200">
                                    PKR
                                </span>
                                <span class="text-gray-400 inline-flex items-center leading-none text-sm">
                                    ${price}
                                </span>
                            </div>
                        </div>
                    </div>
                </div> `

                window.deleteitem = deleteitem;

                dealerItemContainer.innerHTML += card;

            console.log("data=>", item);
            console.log("doc.id=>", doc.id);
        });
    } catch (error) {
        alert(error);
    };
};

async function deleteitem(e) {
    console.log(e);
    console.log(e.id);
   const docRef = doc(db, "items", e.id);
   await deleteDoc(docRef); 
   getAllDealerItems(auth.currentUser.uid);
};