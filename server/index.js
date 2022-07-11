const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const mongoose = require('mongoose')
const path = require('path')
const fileUpload = require('express-fileupload')
const { errorHandler } = require('./middlewares/errorMiddleware')

const authRoutes = require('./routes/authRoutes')
const userRoutes = require('./routes/userRoutes')
const imageRoutes = require('./routes/imageRoutes')
const collectionRoutes = require('./routes/collectionRoutes')
const itemRoutes = require('./routes/itemRoutes')
const commentRoutes = require('./routes/commentRoutes')
const tagRoutes = require('./routes/tagRoutes')

dotenv.config()
const app = express()
app.use(cors())
app.use(express.json({ extended: true }))
app.use(fileUpload({
    useTempFiles: true
}))

app.use('/api/auth', authRoutes)
app.use('/api/user', userRoutes)
app.use('/api/image', imageRoutes)
app.use('/api/collection', collectionRoutes)
app.use('/api/item', itemRoutes)
app.use('/api/comment', commentRoutes)
app.use('/api/tag', tagRoutes)

app.use(errorHandler)

const __dirname1 = path.resolve()
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname1, 'client/build')))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname1, "client", "build", "index.html"))
    })
}

const PORT = process.env.PORT || 5000
const server = require('http').createServer(app)
async function start() {
    try {
        mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })

        server.listen(PORT, () => {
            console.log(`Server started on port ${PORT}`);
        })
    } catch (error) {
        console.error(error)
    }
}

start()





