const bg_loading_posts = document.getElementById('loading-posts');
const bg_loading_users = document.getElementById('loading-users');

function callFunctions() {
  callPost()
  callUsers()
}

async function callPost() {
  try {
    const response = await fetch('http://localhost:3000/api/v1/posts',
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
    if (response.status === 500) {
      throw new Error(`Erro ao acessar o servidor ${response.status}`)
    } else {
      const data = await response.json();
      displayPosts(data);
    }
        bg_loading_posts.classList.add('hidden');
  } catch (error) {
    console.log(`Erro ao acessar o servidor :${error}`);
  }
}

async function callUsers() {

  try {
    const response = await fetch('http://localhost:3000/api/v1/users',
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
    if (response.status === 500) {
      throw new Error(`Erro ao acessar o servidor ${response.status}`)
    } else {
      const data = await response.json();
      displayUsers(data);
      console.log(data)
    }
        bg_loading_users.classList.add('hidden');
  } catch (error) {
    console.log(`Erro ao acessar o servidor :${error}`);
  }

}


async function imageProfileGenerator() {
  try {
    const response = await fetch('https://cataas.com/cat')
    return response;
  } catch (error) {
    console.log(`Erro ao acessar o servidor: ${error}`);
  }
}

async function displayPosts(data) {
  const postData = data;
  const divPost = document.querySelector('#posts')

  postData.forEach(async (post) => {
    const urlProfileImage = await imageProfileGenerator();

    const name = document.createElement('h1');
    const profileImage = document.createElement('img');
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
    profileImage.setAttribute('src', urlProfileImage.url)

    image.setAttribute('src', post.img_data);

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
  const usersData = data;

  usersData.forEach(async (user) => {
    const urlProfileImage = await imageProfileGenerator();
    console.log(user)

    // Criando elementos
    const profileImage = document.createElement('img');
    const nameUser = document.createElement('h1');
    const amountPosts = document.createElement('h2');
    const divUsers = document.createElement('div');
    const divNamePosts = document.createElement('div');

    // Configurando classes
    nameUser.classList.add('nameUser');
    amountPosts.classList.add('amountPosts');
    profileImage.classList.add('profileImage');
    divUsers.classList.add('divCurrentUsers');
    divNamePosts.classList.add('divNamePosts');

    // Configurando conteúdo
    profileImage.setAttribute('src', urlProfileImage.url);
    nameUser.innerText = user.name;
    amountPosts.innerText = `Quantidade de posts: ${user.posts_qnt}`;

    // Montando a estrutura
    divNamePosts.appendChild(nameUser);
    divNamePosts.appendChild(amountPosts);

    divUsers.appendChild(profileImage);
    divUsers.appendChild(divNamePosts);

    // Adicionando ao container principal
    divCurrentUsers.appendChild(divUsers);
  });
}

window.onload = callFunctions;
