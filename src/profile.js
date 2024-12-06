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
        
        // O ?? irá verificar se o valor post.img_data é igual a 'null'
        const verificationURL = user.img_data ?? ' ';
        // Decodificação da url
        const urlImage = String.fromCharCode.apply(null, verificationURL.data);

        image.classList.add('postUser');
        description.classList.add('descriptionUser');
        deleteButton.classList.add('deletePost');
        attButton.classList.add('attButton');
        divButton.classList.add('buttons')
        divPost.classList.add('divPost');
        
        image.setAttribute('src', urlImage);
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

async function handleAtualizar(userId) {
    const name = document.querySelector('#updateName').value;
    const email = document.querySelector('#updateEmail').value;
    const postsQnt = document.querySelector('#updatePostsQnt').value;

    const updatedData = {
        name: name || undefined,
        email: email || undefined,
        posts_qnt: postsQnt || undefined
    };

    const result = await updateUser(userId, updatedData);
    if (result) {
        alert('Usuário atualizado com sucesso!');
        location.reload(); // Recarrega a página para refletir mudanças
    } else {
        alert('Erro ao atualizar usuário.');
    }
}

let selectedUserId = null; // ID do usuário selecionado

// Abre o modal com dados do usuário
function openModal(userId, name, email, postsQnt) {
    selectedUserId = userId;

    document.querySelector('#updateName').value = name || '';
    document.querySelector('#updateEmail').value = email || '';
    document.querySelector('#updatePostsQnt').value = postsQnt || '';

    document.getElementById('modal').style.display = 'block';
}

function closeModal() {
    document.getElementById('modal').style.display = 'none';
    selectedUserId = null;
}


window.onload = getUser;