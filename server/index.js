const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors({ origin: true }));

const admin = require("firebase-admin");

const serviceAccount = require("./firebase/gt-transfer-tool-firebase-adminsdk-amge6-0e114a629d.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://gt-transfer-tool-default-rtdb.firebaseio.com"
});

const db = admin.database()
const ref = db.ref("transfers/")

app.listen(3001, () => {
    console.log(`Server listening on 3001`);
});

app.get("/api/read/:type/:target", (req, res) => {
    (async () => {
        const { type, target } = req.params
        try {
            await ref.orderByChild(type).equalTo(target).once("value", (snapshot) => {
                return res.status(200).send(snapshot.val())
            })
        }
        catch (error) {
            return res.status(500).send(error)
        }
    })()
});


