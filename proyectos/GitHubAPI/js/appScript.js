async function fetchData () {
    const inputValue = document.getElementById('userGH').value;
    const data = await fetch(`https://api.github.com/users/${inputValue}`);
    const json = await data.json();
    const img = document.getElementById('imgProfile');
    const idArray = ['name', 'loc', 'bio', 'twProfile', 'user'];
    const jsonArray = [json.name, json.location, json.bio, json.twitter_username, json.login];

    if(data.status != 404){
        console.log(json);
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
        document.getElementById(idElement).innerText = '-';
    } else{
        document.getElementById(idElement).innerText = data;
    }
}