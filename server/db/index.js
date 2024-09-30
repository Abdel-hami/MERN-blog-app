const mongoose = require("mongoose");
mongoose.set('strictQuery', false);
mongoose.connect("mongodb+srv://elbouni2003:mongo12db34@cluster0.bbe3w.mongodb.net/")
    .then(() => console.log("conected"))
    .catch((e) => console.log(e))
    