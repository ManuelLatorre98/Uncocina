const { post } = require("./helper");

const data1 = [
  {
    recipe_name: 'Tacos',
    user_email: 'manulatorre@gmail.com',
    user_name: 'ManuelL',
    steps: '["Paso1","Paso2"]',
    imageURL: 'https://firebasestorage.googleapis.com/v0/b/uncocina.appspot.com/o/recipes%2Ftacos_asxsmn.jpg?alt=media&token=2dc61c1b-1ce8-461d-b5c4-7571aa1af07a',
    estimatedTime: 50,
    difficulty: 'Media',
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NzA3OTI2MjR9.VblWtuQZSggtDlnKTponm8DvdPuFvbr49iFRdp4QOIc',//Checkear que sea valido si no usar uno que retorne el metodo register en userPopu
    ingredients: '[{"nombre": "ingrediente1", "cantidad": "1"},{"nombre": "ingrediente2","cantidad": "2"}]',
    categories: 'Carne'
  },
  {
    recipe_name: 'Carne al horno',
    user_email: 'manulatorre@gmail.com',
    user_name: 'ManuelL',
    steps: '["Paso1","Paso2"]',
    imageURL: 'https://firebasestorage.googleapis.com/v0/b/uncocina.appspot.com/o/recipes%2FcarneHorno_gjgual.jpg?alt=media&token=8a783f9b-89bf-44d1-89cb-8789e784acb1',
    estimatedTime: 60,
    difficulty: 'Dificil',
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NzA3OTI2MjR9.VblWtuQZSggtDlnKTponm8DvdPuFvbr49iFRdp4QOIc',
    ingredients: '[{"nombre": "ingrediente1", "cantidad": "1"},{"nombre": "ingrediente2","cantidad": "2"},{"nombre": "ingrediente3","cantidad": "3"},{"nombre": "ingrediente4","cantidad": "4"}]',
    categories: 'Carne'
  },
  {
    recipe_name: 'Hamburgesa vegana',
    user_email: 'manulatorre@gmail.com',
    user_name: 'ManuelL',
    steps: '["Paso1","Paso2","Paso2","Paso3 con un texto mas largo para ver como se ve en la pantalla del telefono"]',
    imageURL: 'https://firebasestorage.googleapis.com/v0/b/uncocina.appspot.com/o/recipes%2FHamburguesaVegana_rzeuff.jpg?alt=media&token=f4aebac4-1382-4596-9e3d-9e91a6290143',
    estimatedTime: 30,
    difficulty: 'Facil',
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NzA3OTI2MjR9.VblWtuQZSggtDlnKTponm8DvdPuFvbr49iFRdp4QOIc',
    ingredients: '[{"nombre": "ingrediente1", "cantidad": "1"},{"nombre": "ingrediente2","cantidad": "2"},{"nombre": "ingrediente3","cantidad": "3"}]',
    categories: 'Verdura'
  },
  {
    recipe_name: 'Milhojas de berenjena',
    user_email: 'manulatorre@gmail.com',
    user_name: 'ManuelL',
    steps: '["Paso1","Paso2","Paso2","Paso3 con un texto mas largo para ver como se ve en la pantalla del telefono"]',
    imageURL: 'https://firebasestorage.googleapis.com/v0/b/uncocina.appspot.com/o/recipes%2Fmilhojas_berenjena_fiui5n.jpg?alt=media&token=d62e3f2e-71dc-4438-a292-5146c3fe12a8',
    estimatedTime: 120,
    difficulty: 'Media',
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NzA3OTI2MjR9.VblWtuQZSggtDlnKTponm8DvdPuFvbr49iFRdp4QOIc',
    ingredients: '[{"nombre": "ingrediente1", "cantidad": "1"},{"nombre": "ingrediente2","cantidad": "2"},{"nombre": "ingrediente3","cantidad": "3"}]',
    categories: 'Verdura'
  },
  {
    recipe_name: 'Tiramisu',
    user_email: 'manulatorre@gmail.com',
    user_name: 'ManuelL',
    steps: '["Paso1","Paso2","Paso2","Paso3 con un texto mas largo para ver como se ve en la pantalla del telefono"]',
    imageURL: 'https://firebasestorage.googleapis.com/v0/b/uncocina.appspot.com/o/recipes%2FTiramisu_ywvhfl.jpg?alt=media&token=ed46f1a1-3c6d-4379-a1eb-3f4d0dcacffb',
    estimatedTime: 160,
    difficulty: 'Dificil',
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NzA3OTI2MjR9.VblWtuQZSggtDlnKTponm8DvdPuFvbr49iFRdp4QOIc',
    ingredients: '[{"nombre": "ingrediente1", "cantidad": "1"},{"nombre": "ingrediente2","cantidad": "2"},{"nombre": "ingrediente3","cantidad": "3"}]',
    categories: 'Postre'
  },
  //Usuario Silvia
  {
    recipe_name: 'Churrasco con salsa',
    user_email: 'silvia@gmail.com',
    user_name: 'Silvia',
    steps: '["Paso1","Paso2"]',
    imageURL: 'https://firebasestorage.googleapis.com/v0/b/uncocina.appspot.com/o/recipes%2FchurrascoConSalsa_jsbmlg.jpg?alt=media&token=2c7b6793-94dd-41b8-a85b-dd7c89f5cbf9',
    estimatedTime: 50,
    difficulty: 'Media',
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NzA3OTI2MjR9.VblWtuQZSggtDlnKTponm8DvdPuFvbr49iFRdp4QOIc',
    ingredients: '[{"nombre": "ingrediente1", "cantidad": "1"},{"nombre": "ingrediente2","cantidad": "2"}]',
    categories: 'Carne'
  },
  {
    recipe_name: 'Hamburguesa',
    user_email: 'silvia@gmail.com',
    user_name: 'Silvia',
    steps: '["Paso1","Paso2"]',
    imageURL: 'https://firebasestorage.googleapis.com/v0/b/uncocina.appspot.com/o/recipes%2FhamburguesaG_zmrwra.jpg?alt=media&token=414143ac-e3cd-4c6b-9be3-3bc640519217',
    estimatedTime: 20,
    difficulty: 'Facil',
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NzA3OTI2MjR9.VblWtuQZSggtDlnKTponm8DvdPuFvbr49iFRdp4QOIc',
    ingredients: '[{"nombre": "ingrediente1", "cantidad": "1"},{"nombre": "ingrediente2","cantidad": "2"},{"nombre": "ingrediente3","cantidad": "3"},{"nombre": "ingrediente4","cantidad": "4"}]',
    categories: 'Carne'
  },
  {
    recipe_name: 'Crema de espinacas con queso',
    user_email: 'silvia@gmail.com',
    user_name: 'Silvia',
    steps: '["Paso1","Paso2","Paso2","Paso3 con un texto mas largo para ver como se ve en la pantalla del telefono"]',
    imageURL: 'https://firebasestorage.googleapis.com/v0/b/uncocina.appspot.com/o/recipes%2Fcreme-espinacas-queso-960x540_mpuh0u.jpg?alt=media&token=0d20dcd3-fcce-46c0-b1ba-1571b493d36f',
    estimatedTime: 180,
    difficulty: 'Media',
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NzA3OTI2MjR9.VblWtuQZSggtDlnKTponm8DvdPuFvbr49iFRdp4QOIc',
    ingredients: '[{"nombre": "ingrediente1", "cantidad": "1"},{"nombre": "ingrediente2","cantidad": "2"},{"nombre": "ingrediente3","cantidad": "3"}]',
    categories: 'Verdura'
  },
  {
    recipe_name: 'Berenjenas rellenas',
    user_email: 'silvia@gmail.com',
    user_name: 'Silvia',
    steps: '["Paso1","Paso2","Paso2","Paso3 con un texto mas largo para ver como se ve en la pantalla del telefono"]',
    imageURL: 'https://firebasestorage.googleapis.com/v0/b/uncocina.appspot.com/o/recipes%2Fberenjenas-rellenas-seitan-receta_joivpu.jpg?alt=media&token=f7c125c2-2ce8-44c8-a9d1-1f36f7fa7a6f',
    estimatedTime: 120,
    difficulty: 'Dificil',
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NzA3OTI2MjR9.VblWtuQZSggtDlnKTponm8DvdPuFvbr49iFRdp4QOIc',
    ingredients: '[{"nombre": "ingrediente1", "cantidad": "1"},{"nombre": "ingrediente2","cantidad": "2"},{"nombre": "ingrediente3","cantidad": "3"}]',
    categories: 'Verdura'
  },
  {
    recipe_name: 'Cupcake',
    user_email: 'silvia@gmail.com',
    user_name: 'Silvia',
    steps: '["Paso1","Paso2","Paso2","Paso3 con un texto mas largo para ver como se ve en la pantalla del telefono"]',
    imageURL: 'https://firebasestorage.googleapis.com/v0/b/uncocina.appspot.com/o/recipes%2Fcupcake_qlw7a8.jpg?alt=media&token=73ab9877-2fc6-4ddb-a8ca-cace236f1dcd',
    estimatedTime: 160,
    difficulty: 'Media',
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NzA3OTI2MjR9.VblWtuQZSggtDlnKTponm8DvdPuFvbr49iFRdp4QOIc',
    ingredients: '[{"nombre": "ingrediente1", "cantidad": "1"},{"nombre": "ingrediente2","cantidad": "2"},{"nombre": "ingrediente3","cantidad": "3"}]',
    categories: 'Postre'
  },
  //User Adolfo
  {
    recipe_name: 'Churrasco con salsa',
    user_email: 'adolfo@gmail.com',
    user_name: 'Adolfo',
    steps: '["Paso1","Paso2"]',
    imageURL: 'https://firebasestorage.googleapis.com/v0/b/uncocina.appspot.com/o/recipes%2FchurrascoConSalsa_jsbmlg.jpg?alt=media&token=2c7b6793-94dd-41b8-a85b-dd7c89f5cbf9',
    estimatedTime: 50,
    difficulty: 'Media',
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NzA3OTI2MjR9.VblWtuQZSggtDlnKTponm8DvdPuFvbr49iFRdp4QOIc',
    ingredients: '[{"nombre": "ingrediente1", "cantidad": "1"},{"nombre": "ingrediente2","cantidad": "2"}]',
    categories: 'Carne'
  },
  {
    recipe_name: 'Hamburguesa',
    user_email: 'adolfo@gmail.com',
    user_name: 'Adolfo',
    steps: '["Paso1","Paso2"]',
    imageURL: 'https://firebasestorage.googleapis.com/v0/b/uncocina.appspot.com/o/recipes%2FhamburguesaG_zmrwra.jpg?alt=media&token=414143ac-e3cd-4c6b-9be3-3bc640519217',
    estimatedTime: 20,
    difficulty: 'Facil',
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NzA3OTI2MjR9.VblWtuQZSggtDlnKTponm8DvdPuFvbr49iFRdp4QOIc',
    ingredients: '[{"nombre": "ingrediente1", "cantidad": "1"},{"nombre": "ingrediente2","cantidad": "2"},{"nombre": "ingrediente3","cantidad": "3"},{"nombre": "ingrediente4","cantidad": "4"}]',
    categories: 'Carne'
  },
  {
    recipe_name: 'Crema de espinacas con queso',
    user_email: 'adolfo@gmail.com',
    user_name: 'Adolfo',
    steps: '["Paso1","Paso2","Paso2","Paso3 con un texto mas largo para ver como se ve en la pantalla del telefono"]',
    imageURL: 'https://firebasestorage.googleapis.com/v0/b/uncocina.appspot.com/o/recipes%2Fcreme-espinacas-queso-960x540_mpuh0u.jpg?alt=media&token=0d20dcd3-fcce-46c0-b1ba-1571b493d36f',
    estimatedTime: 180,
    difficulty: 'Media',
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NzA3OTI2MjR9.VblWtuQZSggtDlnKTponm8DvdPuFvbr49iFRdp4QOIc',
    ingredients: '[{"nombre": "ingrediente1", "cantidad": "1"},{"nombre": "ingrediente2","cantidad": "2"},{"nombre": "ingrediente3","cantidad": "3"}]',
    categories: 'Verdura'
  },
  {
    recipe_name: 'Berenjenas rellenas',
    user_email: 'adolfo@gmail.com',
    user_name: 'Adolfo',
    steps: '["Paso1","Paso2","Paso2","Paso3 con un texto mas largo para ver como se ve en la pantalla del telefono"]',
    imageURL: 'https://firebasestorage.googleapis.com/v0/b/uncocina.appspot.com/o/recipes%2Fberenjenas-rellenas-seitan-receta_joivpu.jpg?alt=media&token=f7c125c2-2ce8-44c8-a9d1-1f36f7fa7a6f',
    estimatedTime: 120,
    difficulty: 'Dificil',
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NzA3OTI2MjR9.VblWtuQZSggtDlnKTponm8DvdPuFvbr49iFRdp4QOIc',
    ingredients: '[{"nombre": "ingrediente1", "cantidad": "1"},{"nombre": "ingrediente2","cantidad": "2"},{"nombre": "ingrediente3","cantidad": "3"}]',
    categories: 'Verdura'
  },
  {
    recipe_name: 'Cupcake',
    user_email: 'adolfo@gmail.com',
    user_name: 'Adolfo',
    steps: '["Paso1","Paso2","Paso2","Paso3 con un texto mas largo para ver como se ve en la pantalla del telefono"]',
    imageURL: 'https://firebasestorage.googleapis.com/v0/b/uncocina.appspot.com/o/recipes%2Fcupcake_qlw7a8.jpg?alt=media&token=73ab9877-2fc6-4ddb-a8ca-cace236f1dcd',
    estimatedTime: 160,
    difficulty: 'Media',
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NzA3OTI2MjR9.VblWtuQZSggtDlnKTponm8DvdPuFvbr49iFRdp4QOIc',
    ingredients: '[{"nombre": "ingrediente1", "cantidad": "1"},{"nombre": "ingrediente2","cantidad": "2"},{"nombre": "ingrediente3","cantidad": "3"}]',
    categories: 'Postre'
  },
]

async function recipePopulate(){
  await new Promise(resolve => setTimeout(resolve, 500)) //Aprox time to actualice db
  data1.forEach(recipe => {
    post("http://localhost:3000/api/recipe/create", recipe)
    .then((res) => {
      //console.log(res); 
    })
  });
}

module.exports ={
  recipePopulate
}