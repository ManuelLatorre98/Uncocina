const {post} = require('./helper.js')
const data = [
  {
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NzEwMjQ4MDJ9.EgGciRZLEfKvHERFFTqghULuhfpBAnKGlRCa08k4ndw',
    category_name: 'Fruta'
  },
  {
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NzEwMjQ4MDJ9.EgGciRZLEfKvHERFFTqghULuhfpBAnKGlRCa08k4ndw',
    category_name: 'Carne'
  },
  {
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NzEwMjQ4MDJ9.EgGciRZLEfKvHERFFTqghULuhfpBAnKGlRCa08k4ndw',
    category_name: 'Verdura'
  },
  {
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NzEwMjQ4MDJ9.EgGciRZLEfKvHERFFTqghULuhfpBAnKGlRCa08k4ndw',
    category_name: 'Postre'
  },
]

async function categoryPopulate(){
  data.forEach(category => {
    post("http://localhost:3000/api/category/create", category)
    .then((res) => {
      //console.log(res); 
    })
  }) 
}

module.exports ={
  categoryPopulate
}