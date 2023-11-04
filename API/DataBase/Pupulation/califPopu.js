const {post} = require('./helper.js')
const data = [
  {
    recipe_name:'Churrasco con salsa',
    recipe_user_email:'silvia@gmail.com',
    recipe_user_name:'Silvia',
    user_email:'manulatorre@gmail.com',
    user_name:'ManuelL',
    calif:5,
    token:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NzA3OTI2MjR9.VblWtuQZSggtDlnKTponm8DvdPuFvbr49iFRdp4QOIc'
  },
  {
    recipe_name:'Hamburguesa',
    recipe_user_email:'silvia@gmail.com',
    recipe_user_name:'Silvia',
    user_email:'manulatorre@gmail.com',
    user_name:'ManuelL',
    calif:4,
    token:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NzA3OTI2MjR9.VblWtuQZSggtDlnKTponm8DvdPuFvbr49iFRdp4QOIc'
  },
  {
    recipe_name:'Churrasco con salsa',
    recipe_user_email:'adolfo@gmail.com',
    recipe_user_name:'Adolfo',
    user_email:'manulatorre@gmail.com',
    user_name:'ManuelL',
    calif:5,
    token:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NzA3OTI2MjR9.VblWtuQZSggtDlnKTponm8DvdPuFvbr49iFRdp4QOIc'
  },
  //User SILVIA
  {
    recipe_name:'Carne al horno',
    recipe_user_email:'manulatorre@gmail.com',
    recipe_user_name:'ManuelL',
    user_email:'silvia@gmail.com',
    user_name:'Silvia',
    calif:4,
    token:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NzA3OTI2MjR9.VblWtuQZSggtDlnKTponm8DvdPuFvbr49iFRdp4QOIc'
  },
  //Adolfo
  {
    recipe_name:'Berenjenas rellenas',
    recipe_user_email:'silvia@gmail.com',
    recipe_user_name:'Silvia',
    user_email:'adolfo@gmail.com',
    user_name:'Adolfo',
    calif:3,
    token:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NzA3OTI2MjR9.VblWtuQZSggtDlnKTponm8DvdPuFvbr49iFRdp4QOIc'
  },
]

async function califPopulate(){
  await new Promise(resolve => setTimeout(resolve, 500)) //Aprox time to actualice db
  data.forEach(calif => {
    post("http://localhost:3000/api/user/calif", calif)
    .then((res) => {
      //console.log(res); 
    })
  }) 
}

module.exports = {
  califPopulate
}