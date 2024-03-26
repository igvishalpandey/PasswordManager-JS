const copyText = (txt) => {
    navigator.clipboard.writeText(txt);
}

const maskPwd = (pass) => {
    let str = "";
    for (let i in pass) {
        str = str + "*";
    }
    return str;
}

const deletepwd = (username) => {
    let data = localStorage.getItem("passwords");
    let arr = JSON.parse(data);
    arrUpdated = arr.filter((e) => {
        return e.username != username;
    });
    localStorage.setItem("passwords", JSON.stringify(arrUpdated));
    showPassword();
};

const showPassword = () => {
    let tb = document.querySelector("table");
    let data = localStorage.getItem("passwords");
    if (data == null || JSON.parse(data).length == 0) {
        tb.innerHTML = `<pre> 404! 0 Passwords Saved :( </pre>`;
    }
    else {
        tb.innerHTML = `<tr>
        <th>Website</th>
        <th>Username</th>
        <th>Password</th>
        <th>Delete</th>
        </tr> `
        let arr = JSON.parse(data);
        let str = "";
        for (let index = 0; index < arr.length; index++) {
            const element = arr[index];
            str +=
                `<tr>
                    <td>${element.website} <img onclick="copyText('${element.website}')" src="./copy.svg" alt="Copy Button" width="10" width="10" height="10"></td>
                    <td>${element.username} <img onclick="copyText('${element.username}')" src="./copy.svg" alt="Copy Button" width="10" width="10" height="10"></td>
                    <td>${maskPwd(element.password)} <img onclick="copyText('${element.password}')" src="./copy.svg" alt="Copy Button" width="10" width="10" height="10"></td>
                    <td><utton  class= "btnsm" onclick="deletepwd('${element.username}')">Delete</button></td>
                </tr>`;
        }
        tb.innerHTML = tb.innerHTML + str;
    }
    website.value = "";
    username.value = "";
    password.value = "";
}

showPassword();

document.querySelector(".btn").addEventListener('click', (e) => {
    e.preventDefault();
    let passwords = localStorage.getItem("passwords");
    if (website.value == "" || username.value == "" || password.value == "") {
        alert("Provide a valid input!");
    } 
    else {
        if (passwords == null) {
            let json = [];
            json.push({ website: website.value, username: username.value, password: password.value });
            localStorage.setItem("passwords", JSON.stringify(json));
        }
        else {
            let json = JSON.parse(localStorage.getItem("passwords"));
            json.push({ website: website.value, username: username.value, password: password.value });
            localStorage.setItem("passwords", JSON.stringify(json));
        }
    }
    showPassword();

})