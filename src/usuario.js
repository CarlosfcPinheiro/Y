async function updateUser(userId, updatedData) {
    try {
        const response = await fetch(`https://prog-webii-projeto.onrender.com/api/v1/users/${userId}`, {
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

async function deleteUser(userId) {
    try {
        const response = await fetch(`https://prog-webii-projeto.onrender.com/api/v1/users/${userId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        if (!response.ok) {
            throw new Error(`Erro ao deletar usuário: ${response.status}`);
        }

        console.log(`Usuário deletado com sucesso (ID: ${userId})`);
        return true;
    } catch (error) {
        console.error(`Erro ao deletar usuário: ${error.message}`);
        return false;
    }
}