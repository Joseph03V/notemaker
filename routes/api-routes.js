const router = require('express').Router()
const fs = require ('fs')


router.get('/api/notes',async (req,res) => {
    const notesJson = await JSON.parse(fs.readFileSync('db/db.json','utf8'))
    res.json(notesJson)
})


router.post('/api/notes', (req,res) => {
    const notesJson = JSON.parse(fs.readFileSync('db/db.json','utf8'))
    const newNote = {
        title: req.body.title,
        text: req.body.text,
        id: req.body.id,
    }
    notesJson.push(newNote)
    fs.writeFileSync('db/db.json',JSON.stringify(notesJson))
    res.json(notesJson);
})


router.delete('/api/notes/:id',(req,res) => {
    let data = fs.readFileSync('db/db.json','utf8')
    const dataJson = JSON.parse(data);
    const newNotes = dataJson.filter((note) => {
        return note.id !== req.params.id
    })
    fs.writeFileSync('db/db.json',JSON.stringify(newNotes))
    res.json('Note Deleted!')
})


module.exports = router