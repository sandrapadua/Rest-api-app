const express =require('express')
const Sequelize = require('sequelize')
const bodyParser = require('body-parser')

const app =  express()

const connectionString = process.env.DATABASE_URL || 'postgres://postgres:secret@localhost:5432/postgres'
const sequelize = new Sequelize(connectionString, {define: { timestamps: false }})

const House = sequelize.define('house', {
    title: Sequelize.STRING,
    description: Sequelize.TEXT,
    size: Sequelize.INTEGER,
    price: Sequelize.INTEGER
  }, {
    tableName: 'houses'
  })
  
  House.sync()

  //***********1****GET******/

  app.get('/houses', function (req, res, next) {
    House.findAll().then(houses => {
      res.json({ houses: houses })
    })
    .catch(err =>{
        res.status(500).json({
        message :'Something went wrong',
    })
  })
})

//***************2********GETID********* */

app.get('/houses/:id',function(req,res,next){
    const id = req.params.id
    console.log('id test:', id)
    House.findById(id).then(houses => {
        res.json({ message: `Read house ${id}` })
    })
})



//**************3*******POST*********** */


app.use(bodyParser.json())
// House.create({
//     title: 'cindu Mansion',
//     description: 'This was build by a super-duper rich programmer',
//     size: 2500,
//     price: 150000
//   }).then(house => console.log(`The house is now created. The ID = ${house.id}`))

  app.post('/houses', function (req, res) {
    House
      .create(req.body)
      .then(house => res.status(201).json(house))
      .catch(err =>{
                res.status(500).json({
                message :'Something went wrong',
            })
          })
  })
  
//********************4*****UPDATE******************** */

app.put('/houses/:id', function (req, res) {
    const id = req.params.id

    House
        .findById(id)
        .then(house => { 
            house
            .update({
                 title: 'Super Duper Million Dollar Mainson'})
            .then(house => console.log(`The house with ID ${house.id} is now updated`, house))
              .then(house => res.json({ message: `Update house ${id}` }))   

        })
        .catch(err =>{
             res.status(500).json({
             message :'Something went wrong',
                        })
                      })
})

//********************5*****DELETE******************** */

app.delete('/houses/:id', function (req, res) {
        const id = req.params.id
    
        House
            .findById(id)
            .then(house => { 
                house
                .destroy(house => res.json({ message: `Deleted house ${id}` }))   
    
            })
            .catch(err =>{
                 res.status(500).json({
                 message :'Something went wrong',
                            })
                          })
    })
 
  
const port = 4000
app .listen(port,()=>`Listening port ${port}` )
