const RegLogin = /^[a-zA-z]{4,16}$/;
const RegPass = /^[\w-.]{4,16}$/;
const RegEmail = /^\w+@\w+.\w+$/;
const LOGIN = document.querySelector('.input_login');
const PASSWORD = document.querySelector('.input_password');
const EMAIL = document.querySelector('.input_email');
const BTN_ADD = document.querySelector('.add_user');
const BTN_EDIT = document.querySelector('.edit_user');
const BTN_DELETE = document.querySelector('.btn_delete');
let testPassword;
let testEmail;
let testLogin;
let userIndex;
let arr = [
    {
        login: 'bohdan',
        password: 'bohdan123',
        email: 'bohdan@gmail.com'
    },
    {
        login: 'petro',
        password: 'petro123',
        email: 'petro@gmail.com'
    }
];
render();
LOGIN.addEventListener('input', () => {
    testLogin = RegLogin.test(event.target.value);
    if (testLogin) {
        LOGIN.style.border = '2px solid green';
    }
    else {
        LOGIN.style.border = '2px solid red';
    }
});
PASSWORD.addEventListener('input', () => {
    testPassword = RegPass.test(event.target.value);
    if (testPassword) {
        PASSWORD.style.border = '2px solid green';
    }
    else {
        PASSWORD.style.border = '2px solid red';
    }
});
EMAIL.addEventListener('input', () => {
    testEmail = RegEmail.test(event.target.value);
    if (testEmail) {
        EMAIL.style.border = '2px solid green';
    }
    else {
        EMAIL.style.border = '2px solid red';
    }
});
function addUser() {
    if (testLogin && testPassword && testEmail) {
        let newObj = {
            login: LOGIN.value,
            password: PASSWORD.value,
            email: EMAIL.value
        };
        arr.push(newObj);
        LOGIN.value = "";
        PASSWORD.value = "";
        EMAIL.value = "";
        render();
        LOGIN.style.border = '2px solid grey';
        PASSWORD.style.border = '2px solid grey';
        EMAIL.style.border = '2px solid grey';
    }
}
BTN_ADD.addEventListener('click', addUser);
function render() {
    document.querySelector('.table').innerHTML = `
    <thead class="head">
                <th class="th_item">#</th>
                <th class="th_item">Login</th>
                <th class="th_item">Password</th>
                <th class="th_item">Email</th>
                <th class="th_item">Edit</th>
                <th class="th_item">Delete</th>
            </thead>
            <br>
    `;
    for (let i = 0; i < arr.length; i++) {
        document.querySelector('.table').innerHTML += `
        <tr>
                    <td>${i + 1}</td>
                    <td>${arr[i].login}</td>
                    <td>${arr[i].password}</td>
                    <td>${arr[i].email}</td>
                    <td <button class ="btn_edit">Edit</button></td>
                    <td <button class ="btn_delete">Delete</button></td>
                    <br>
        </tr>`;
    }
}
function editUser() {
    let nObj = {
        login: LOGIN.value,
        password: PASSWORD.value,
        email: EMAIL.value
    };
    arr[userIndex] = nObj;
    LOGIN.value = "";
    PASSWORD.value = "";
    EMAIL.value = "";
    BTN_EDIT.classList.add('hide');
    BTN_ADD.classList.remove('hide');
    render();
}
document.querySelector('.right').addEventListener('click', () => {
    if (event.target.classList.contains('btn_delete')) {
        userIndex = +event.target.parentElement.parentElement.firstElementChild.textContent - 1;
        arr.splice(userIndex, 1);
        render();
    }
    else if (event.target.classList.contains('btn_edit')) {
        let index = +event.target.parentElement.firstElementChild.textContent - 1;
        LOGIN.value = arr[index].login;
        PASSWORD.value = arr[index].password;
        EMAIL.value = arr[index].email;
        userIndex = index;
        BTN_EDIT.classList.remove('hide');
        BTN_ADD.classList.add('hide');
    }
});
BTN_EDIT.addEventListener('click', editUser);
