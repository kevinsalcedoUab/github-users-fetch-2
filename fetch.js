function fetchFunction(){
    //console.log(document.forms['form']['githubuser'].value);
    var value = document.forms['form']['githubuser'].value;

    if (value == "") {
        alert("Name must be filled out");
    }else{
        if(!/^[\w-_.]*$/.test(value)){
            alert("Name must contains only characters and numbers");
        }else{
            fetch(`https://api.github.com/users/`+ value).then((response) => {
            if (response.status==404) {
                throw new Error("Username not found!")
            }
            return response.json();

            })
            .then((responseJson) => {
                console.log(responseJson);
                injectInfo(responseJson);
            })
            .catch(error => {
                alert("No se encontró el usuario");
                console.error('Error:', error)
            });
        }
    }
}

function injectInfo(responseJson) {

    var table = document.getElementById('myTable');
    
    for(var r = 1; r < 3; r++){
        var row = table.insertRow(r);
    }
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    
    var avatar = document.createElement('img');
    avatar.src = responseJson.avatar_url;

    cell1.innerHTML = responseJson.login;
    cell2.appendChild(avatar);
    cell3.innerHTML = responseJson.bio;
    cell4.innerHTML = responseJson.html_url;
}