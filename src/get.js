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
  
  async function displayPosts(data){
    const postData = data;
    const divPost = document.querySelector('#posts')
  
    postData.forEach(post => {
        const name = document.createElement('h1');
        const profileImage = document.createElement('img');
        const image = document.createElement('img');
        const description = document.createElement('p');
        const mensageIcon = document.createElement('img');
        const heartIcon = document.createElement('img');
        const downloadIcon = document.createElement('img');
        const saveIcon = document.createElement('img');
        const divIcon = document.createElement('div');
        const divHeader = document.createElement('div');
        const footer = document.createElement('div');
  
        name.classList.add('nameUser');
        profileImage.classList.add('profileImage')
        image.classList.add('post');
        description.classList.add('description');
        footer.classList.add('footer');   
        divIcon.classList.add('icones'); 
  
        name.innerText = post.author.name;
        description.innerText = post.description
    
        // O ?? irá verificar se o valor post.img_data é igual a 'null'
        const verificationURL = post.img_data ?? ' ' ;
        // Decodificação da url
        const urlImage = String.fromCharCode.apply(null, verificationURL.data)

        image.setAttribute('src', urlImage);
        
        divHeader.appendChild(name);
        divHeader.appendChild(profileImage);
  
        mensageIcon.setAttribute('src', '../images/mensageIcon.svg');
        heartIcon.setAttribute('src', '../images/favoriteIcon.svg');
        saveIcon.setAttribute('src', '../images/saveIcon.svg');
        downloadIcon.setAttribute('src', '../images/downloadIcon.svg');
  
        divIcon.appendChild(mensageIcon);
        divIcon.appendChild(heartIcon);
        divIcon.appendChild(downloadIcon);
  
        footer.appendChild(divIcon);
        footer.appendChild(saveIcon);
  
        divPost.appendChild(divHeader);
        divPost.appendChild(image);
        divPost.appendChild(description);
        divPost.appendChild(footer);
    });
  } 
  
  
  window.onload = callPost;