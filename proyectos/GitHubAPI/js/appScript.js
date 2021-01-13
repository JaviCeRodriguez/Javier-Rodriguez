const idArray = ['name', 'loc', 'bio', 'ghLink', 'twLink'];
const socialArray = [idArray[idArray.length-2], idArray[idArray.length-1]];
const urls = ['https://github.com/', 'https://twitter.com/']

console.log(`Hola! Bienvenido a la consola. Este es un mensaje para solo agradecer a CourseIt.io por los cursos, aprendí un montón y logré hacer esta página.`)

async function fetchData () {
    const inputValue = document.getElementById('userGH').value;
    const data = await fetch(`https://api.github.com/users/${inputValue}`);
    const json = await data.json();
    const img = document.getElementById('imgProfile');
    const jsonArray = [json.name, json.location, json.bio, json.login, json.twitter_username];

    if(data.status != 404){
        document.getElementById('dataProfile').style.display = 'flex';
        document.getElementById('state').style.display = 'none';
        img.setAttribute('src', json.avatar_url);
        for (let i = 0; i < idArray.length; i++){
            validData(idArray[i], jsonArray[i]);
        }
    } else{
        document.getElementById('dataProfile').style.display = 'none';
        document.getElementById('state').style.display = 'inline';
        const error = `${data.status} Error! 😿
        Try another valid user`;
        document.getElementById('stateHTTP').innerText = error;
    }
    document.getElementById('userGH').value = '';
}

function validData(idElement, data){
    if (data === null || data === ''){
        if (socialArray.includes(idElement)){
            socialData(idElement, urls[socialArray.indexOf(idElement)] + '#');
        } else{
            document.getElementById(idElement).innerText = '-';
        }
    } else{
        if (socialArray.includes(idElement)){
            socialData(idElement, urls[socialArray.indexOf(idElement)] + data);
        } else{
            document.getElementById(idElement).innerText = data;
        }
    }
}

function socialData(idLink, path){
    const aElement = document.getElementById(idLink);
    aElement.setAttribute('href', path);
}