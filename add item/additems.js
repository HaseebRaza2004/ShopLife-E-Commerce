import {
    ref,
    storage,
    uploadBytes,
    getDownloadURL,
    db,
    collection,
    addDoc,
} from "../utils/utils.js";

const additems_form = document.getElementById("additems_form");

additems_form.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log("e =>", e);

    const itemInfo = {
        img: e.target[0].files[0],
        title: e.target[1].value,
        category: e.target[2].value,
        description: e.target[3].value,
        price: e.target[4].value,
    };

    console.log("itemInfo =>", itemInfo);

    const imgRef = ref(storage, itemInfo.img.name);

    uploadBytes(imgRef, itemInfo.img).then(() => {
        console.log('file sucsesfully uploaded');

        getDownloadURL(imgRef).then((url) => {

            console.log("url =>", url);
            itemInfo.img = url;

            const addItemCollection = collection(db, "items");

            addDoc(addItemCollection, itemInfo).then(() => {

                console.log("document added");
                window.location.href = "/";

            })
                .catch(() => { alert("Error In Adding Url") });

        })
            .catch(() => { alert('Error In Getting Url') });

    })
        .catch(() => { alert('Error In Uploading Image') });

});