import "dotenv/config.js";
import router from './routes/index.js'
import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import startInsertin from './dbInsertValuer.js'
import fileUpload from "express-fileupload";
import * as models from './dataBaseMoedls.js'
import sequelize  from'./db.js'
import * as path from 'path';
import { fileURLToPath } from 'url';

const PORT = process.env.PORT;
const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // 
const publcPath=path.resolve(__dirname,'../client/src/')
const ssrverpath=path.resolve(__dirname,'static')

const app=express()

app.use(cookieParser())
app.use(cors())
app.use(express.json())
app.use(fileUpload({}));
app.use(express.urlencoded({
    extended: true
}))

app.use(express.static(publcPath))
app.use(express.static(ssrverpath))

app.use('/', router)

const start = async function (){
    try {
        await sequelize.authenticate()
        await sequelize.sync()

        app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
    } catch (error) {
        console.log(error) 
    }
}
start()






// app.set('view engine', 'ejs');
// app.set('views', path.join(__dirname, 'views'));


// app.get('/tutor/:id', (req, res) => {
//     console.log("wwww")
//   const tutorId = req.params.id;
//   const tutor = tutors.find(t => t.id === tutorId);

//   if (tutor) {
//     res.render('tutor', { tutor });
//   } else {
//     res.status(404).send('Tutor not found');
//   }
// });