async function getUser() {
    const idUser = localStorage.id;
    const nameUser = localStorage.name;
    console.log(idUser)

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

async function getPostUsers(data, name) {
    const userPost = data;
    const divPostUser = document.querySelector('#postsUser');
    const UserName = document.querySelector('#UserName')
    UserName.innerText = name

    userPost.forEach(user => {
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
    });
}

window.onload = getUser;