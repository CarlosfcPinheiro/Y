// Checks if the token is still valid
const isTokenActive = (token) => {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const currentTime = Math.floor(Date.now() / 1000);
    // Returns true or false
    return currentTime < payload.exp;
};

// OBS: TROCAR DE DEFER PARA ASYNC
  
const tokenActive = isTokenActive(localStorage.getItem('authToken'));
// Hide login and register links
if (tokenActive){
    const link_login = document.getElementById('login-link');
    const link_register = document.getElementById('register-link');

    link_login.style.display = 'none';
    link_register.style.display = 'none';
}

async function getUser() {
    const idUser = localStorage.id;
    const nameUser = localStorage.name;

    try {
        const response = await fetch(`https://prog-webii-projeto.onrender.com/api/v1/posts/${idUser}`,
            {
                method : 'GET',
                headers : {
                     'Content-Type': 'application/json'
                }
            }
        )
        if(!response.ok){
            throw new Error(`Erro no servidor ${response.status}`);
        }
        const data = await response.json();
        console.log(data)
        getPostUsers(data, nameUser);
    } catch (error) {
        console.log(`Erro no servidor: ${error}`);
    }
}

async function updateUser() {
    const idUser = localStorage.id;
    try {
        const response = await fetch(`https://prog-webii-projeto.onrender.com/api/v1/users/${idUser}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedData)
        });
        
        if (!response.ok) {
            throw new Error(`Erro ao atualizar usuário: ${response.status}`);
        }

        const result = await response.json();
        console.log(`Usuário atualizado com sucesso:`, result);
        return result;
    } catch (error) {
        console.error(`Erro ao atualizar usuário: ${error.message}`);
        return null;
    }
}

async function deletePost( post) {
    try {
        const token = localStorage.authToken;

        const response = await fetch(`https://prog-webii-projeto.onrender.com/api/v1/posts/${post.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error(`Erro ao deletar post: ${response.status}`);
        }

        console.log(`Post deletado com sucesso`);

        window.onload = getUser;

    } catch (error) {
        console.error(`Erro ao deletar post: ${error.message}`);
        return false;
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

async function getPostUsers(data, name) {
    const userPost = data;
    const divPostUser = document.querySelector('#postsUser');
    const UserName = document.querySelector('#UserName')
    UserName.innerText = name;

    const urlProfileImage = await imageProfileGenerator();
    profileImage.style.backgroundImage = `url(${urlProfileImage.url})`;

    userPost.forEach(async (user) => {
        const image = document.createElement('img');
        const description = document.createElement('p');
        const deleteButton = document.createElement('button');
        const attButton = document.createElement('button');
        const divButton = document.createElement('div');
        const divPost = document.createElement('div');
        
 

        image.classList.add('postUser');
        description.classList.add('descriptionUser');
        deleteButton.classList.add('deletePost');
        attButton.classList.add('attButton');
        divButton.classList.add('buttons')
        divPost.classList.add('divPost');
        
        image.setAttribute('src', user.img_data);
        description.innerText = user.description;

        deleteButton.innerText = 'Deletar';
        attButton.innerText = 'Atualizar';

        divButton.appendChild(attButton);
        divButton.appendChild(deleteButton);

        divPost.appendChild(image);
        divPost.appendChild(description);
        divPost.appendChild(divButton);

        divPostUser.appendChild(divPost);

        deleteButton.addEventListener('click', () => deletePost(user));
    });
}

window.onload = getUser;