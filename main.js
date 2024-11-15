(function(){
    const search = document.getElementById('Search');
    const profile = document.getElementById('profile');
    const url = 'https://api.github.com/users'; // end point
    const cliente_id = '9d71a8c4106f4ea74ef9';
    const client_secret = 'f9ff9a14fad8c26a809624c6bd2007690311b4af'; // esses dois itens são necessários para autenticação e acesso ao end point da API 
    const count = 7; // quantidade de repósitorio 
    const sort = 'created: ascs';
    // A API é uma interface de informações disponibilizadas para terceiros
    // é possível criar APIs sem autenticação, porém não é o correto, com a autenticação é possível controlar todos os usuarios que acessam essa API
    // através da criação de APIs é possível disponibilizar apenas as informações que quero compartilhar

    async function getUser (user){ // request é a requisição de algo, como a requisição de informações, enquanto a response é a resposta da request
        const profileResponse = await fetch(
            `${url}/${user}?client_id=${cliente_id}&client_secret=${client_secret}` // a chave é passada na query string, com isso pode-se dizer que o método é 
            // get. A url é complementada com as chaves de autenticação para criar a query string. Método => From [query]
        );

        const reposResponse = await fetch(
            `${url}/${user}/repos?per_page=${count}&sort=${sort}&client_id=${cliente_id}&client_secret=${client_secret}`
        );

        const profile = await profileResponse.json();
        const repos = await reposResponse.json();

        return {profile, repos};
    } // essa função busca os dados na API

    function showProfile(user){
        profile.innerHTML = `
        <div class="row">
            <div class="col-md-4">
                <div class="card mt-3" style="width: 18em;">
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">Repositórios: <span class="badge badge-success">${user.public_repos}</span></li>
                        <li class="list-group-item">Seguidores: <span class="badge badge-primary">${user.followers}</span></li>
                        <li class="list-group-item">Seguindo: <span class="badge badge-info">${user.following}</span></li>
                    </ul>
                    <div class="card-body">
                        <a href="${user.html_url}" target="_blank" class="btn btn-warning btn-block">Ver Perfil</a>
                    </div>
                    <div class="col-md-8">
                        <div class="repos"></div>
                </div>
            </div>
        `;
    }

    function showRepos(repos){
        let output = '';

        repos.forEach(r => {
            output += `
            <div class="card card-body mt-2">
                <div class="row">
                    <div class="col-md-6"><a href="${repo.html_url}" target="_blank">${repo.name}</a></div>
                    <div class="col-md-6">
                        <span class="badge badge-primary">Stars: ${repo.stargazers_count}</span>    
                        <span class="badge badge-primary">Watch: ${repo.watchers_count}</span>    
                        <span class="badge badge-primary">Forks: ${repo.forks_count}</span>    
                    </div>
                </div>
            </div>
            `
        })
    }

    search.addEventListener('keyup', e => {
        const user = e.target.value;

        if(user.length > 0){
            getUser(user).then(res => {
                showProfile(res.profile);
                showRepos(res.repos);
            })
        }
    });
}
)()