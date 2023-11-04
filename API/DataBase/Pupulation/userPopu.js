const {post} = require('./helper.js')
const data = [
  {
    'user_email': 'manulatorre@gmail.com',
    'user_name': 'ManuelL',
    'password': '12345678a'
  },
  {
    'user_email': 'adolfo@gmail.com',
    'user_name': 'Adolfo',
    'password': '12345678a'
  },
  {
    'user_email': 'silvia@gmail.com',
    'user_name': 'Silvia',
    'password': '12345678a'
  },
]

async function userPopulate(){
  data.forEach(user => {
    post("http://localhost:3000/api/auth/register", user)
    .then((res) => {
      //console.log(res); 
    })
  }) 
}

module.exports ={
  userPopulate
}

