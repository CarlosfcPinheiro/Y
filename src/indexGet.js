function callFunctions(){
    callPost() 
    callUsers()
}

async function callPost(){
    try {
        const response = await fetch('https://prog-webii-projeto.onrender.com/api/v1/posts', 
            {
                method : 'GET',
                headers : {
                     'Content-Type': 'application/json'
                }
            }
        )
        if(response.status === 500){
            throw new Error(`Erro ao acessar o servidor ${response.status}`)
        }else{
            const data = await response.json();
            displayPosts(data);
        }
    } catch (error) {
        console.log(`Erro ao acessar o servidor :${error}`);
    }
}

async function callUsers() {

    try {
        const response = await fetch('https://prog-webii-projeto.onrender.com/api/v1/users',
            {
                method : 'GET',
                headers : {
                     'Content-Type': 'application/json'
                }
            }
        )
        if(response.status === 500){
            throw new Error(`Erro ao acessar o servidor ${response.status}`)
        }else{
            const data = await response.json();
            displayUsers(data);
            console.log(data)
        }
    } catch (error) {
        console.log(`Erro ao acessar o servidor :${error}`);
    }

}

  
//    async function imageProfileGenerator() {
//     try {
//         const response = await fetch('https://cataas.com/cat')
//         return response;
//     } catch (error) {
        
//     }
//   }

async function displayPosts(data){
const postData = data;
const divPost = document.querySelector('#posts')
// const img = await imageProfileGenerator();

postData.forEach(async (post) => {
    const name = document.createElement('h1');
    const profileImage = document.createElement('div');
    const image = document.createElement('img');
    const description = document.createElement('p');
    const mensageIcon = document.createElement('img');
    const heartIcon = document.createElement('img');
    const downloadIcon = document.createElement('img');
    const saveIcon = document.createElement('img');
    const divAll = document.createElement('div')
    const divIcon = document.createElement('div');
    const divHeader = document.createElement('div');
    const footer = document.createElement('div');

    name.classList.add('nameUser');
    profileImage.classList.add('profileImage')
    image.classList.add('post');
    description.classList.add('description');
    footer.classList.add('footerPost');   
    divIcon.classList.add('icones'); 
    divAll.classList.add('divAll');
    divHeader.classList.add('headerPost')

    name.innerText = post.author.name;
    description.innerText = post.description
    // profileImage.setAttribute('src', img.url)

    // O ?? irá verificar se o valor post.img_data é igual a 'null'
    const verificationURL = post.img_data ?? ' ' ;
    // Decodificação da url
    const urlImage = String.fromCharCode.apply(null, verificationURL.data);

    image.setAttribute('src', urlImage);
    
    divHeader.appendChild(profileImage);
    divHeader.appendChild(name);

    mensageIcon.setAttribute('src', '../images/mensageIcon.svg');
    heartIcon.setAttribute('src', '../images/favoriteIcon.svg');
    saveIcon.setAttribute('src', '../images/saveIcon.svg');
    downloadIcon.setAttribute('src', '../images/downloadIcon.svg');

    divIcon.appendChild(mensageIcon);
    divIcon.appendChild(heartIcon);
    divIcon.appendChild(downloadIcon);

    footer.appendChild(divIcon);
    footer.appendChild(saveIcon);

    divAll.appendChild(divHeader);
    divAll.appendChild(image);
    divAll.appendChild(description);
    divAll.appendChild(footer);

    divPost.appendChild(divAll);
});
} 

async function displayUsers(data) {
const divCurrentUsers = document.querySelector('#currentUsers');
const usesrData = data;
// const img = await imageProfileGenerator();
usesrData.forEach(async (users) =>{
    // trocar para img
    const profileImage = document.createElement('div');
    const nameUser = document.createElement('h1');
    const amountPosts = document.createElement('h2')
    const divUsers = document.createElement('div');
    const divNamePosts = document.createElement('div');

    nameUser.classList.add('nameUser');
    amountPosts.classList.add('amountPosts');
    profileImage.classList.add('profileImage');
    divUsers.classList.add('divCurrentUsers');
    divNamePosts.classList.add('divNamePosts');
//    profileImage.setAttribute('src', img.url)
    nameUser.innerText = users.name;
    amountPosts.innerText = `Quantidade de posts: ${users.posts_qnt}`;

    divNamePosts.appendChild(nameUser)
    divNamePosts.appendChild(amountPosts)

    divUsers.appendChild(profileImage);
    divUsers.appendChild(divNamePosts);

    divCurrentUsers.appendChild(divUsers);
})
}

window.onload = callFunctions;