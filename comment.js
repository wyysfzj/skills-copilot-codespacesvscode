// Create web server
// 1. Require express
const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')

// 2. Require express-handlebars here
const exphbs = require('express-handlebars')
const generateTrashTalk = require('./generate_trash_talk')
const trashTalkData = require('./trash_talk.json')

// 3. Setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
// 4. Setting static files
app.use(express.static('public'))

// 5. Setting body-parser
app.use(bodyParser.urlencoded({ extended: true }))

// 6. Setting routes
app.get('/', (req, res) => {
  res.render('index', { trashTalkData: trashTalkData.trashTalkData })
})

app.post('/', (req, res) => {
  const { job } = req.body
  const trashTalk = generateTrashTalk(job)
  res.render('index', { trashTalk, job, trashTalkData: trashTalkData.trashTalkData })
})

// 7. Start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})
