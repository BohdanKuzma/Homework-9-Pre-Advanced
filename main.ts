const RegLogin = /^[a-zA-z]{4,16}$/;
const RegPass = /^[\w-.]{4,16}$/;
const RegEmail = /^\w+@\w+.\w+$/;

const LOGIN: any = document.querySelector('.input_login');
const PASSWORD: any = document.querySelector('.input_password');
const EMAIL: any = document.querySelector('.input_email');

const BTN_ADD: any = document.querySelector('.add_user');
const BTN_EDIT: any = document.querySelector('.edit_user');
const BTN_DELETE: any = document.querySelector('.btn_delete');

let testPassword: boolean;
let testEmail: boolean;
let testLogin: boolean;
let userIndex: number;

interface IPerson {
    login: string;
    password: string;
    email: string;
}

let arr: Array<IPerson> = [
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
render()

LOGIN.addEventListener('input', () => {
    testLogin = RegLogin.test((event.target as HTMLInputElement).value);
    if (testLogin) {
        LOGIN.style.border = '2px solid green';

    } else {
        LOGIN.style.border = '2px solid red';
    }
})

PASSWORD.addEventListener('input', () => {
    testPassword = RegPass.test((event.target as HTMLInputElement).value);
    if (testPassword) {
        PASSWORD.style.border = '2px solid green';

    } else {
        PASSWORD.style.border = '2px solid red';
    }
})

EMAIL.addEventListener('input', () => {
    testEmail = RegEmail.test((event.target as HTMLInputElement).value);
    if (testEmail) {
        EMAIL.style.border = '2px solid green';

    } else {
        EMAIL.style.border = '2px solid red';
    }
})

function addUser(): void {
    if (testLogin && testPassword && testEmail) {
        let newObj = {
            login: LOGIN.value,
            password: PASSWORD.value,
            email: EMAIL.value
        }
        arr.push(newObj);
        LOGIN.value = "";
        PASSWORD.value = "";
        EMAIL.value = "";
        render()
        LOGIN.style.border = '2px solid grey';
        PASSWORD.style.border = '2px solid grey';
        EMAIL.style.border = '2px solid grey';
    }
}
BTN_ADD.addEventListener('click', addUser)

function render(): void {
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
    `
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
        </tr>`
    }

}

function editUser(): void {
    let nObj = {
        login: LOGIN.value,
        password: PASSWORD.value,
        email: EMAIL.value
    }
    arr[userIndex] = nObj;
    LOGIN.value = "";
    PASSWORD.value = "";
    EMAIL.value = "";
    BTN_EDIT.classList.add('hide');
    BTN_ADD.classList.remove('hide');
    render();
}

document.querySelector('.right').addEventListener('click', () => {
    if ((event.target as HTMLInputElement).classList.contains('btn_delete')) {
        userIndex = +(event.target as HTMLInputElement).parentElement.parentElement.firstElementChild.textContent - 1;
        arr.splice(userIndex, 1);
        render()
    } else if ((event.target as HTMLInputElement).classList.contains('btn_edit')) {
        let index: number = +(event.target as HTMLButtonElement).parentElement.firstElementChild.textContent - 1;
        LOGIN.value = arr[index].login;
        PASSWORD.value = arr[index].password;
        EMAIL.value = arr[index].email;
        userIndex = index;
        BTN_EDIT.classList.remove('hide');
        BTN_ADD.classList.add('hide');
    }
})

BTN_EDIT.addEventListener('click', editUser)