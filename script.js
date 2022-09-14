let currentRecordId = 0;
let fieldsMap = new Map([
    ["user-mail", /^\w+[|\.]\w+@\w+\.\w+$/g],
    ["user-firstname", /^\w{1,}$/g],
    ["user-lastname", /^\w{1,}$/g],
    ["user-phonenumber", /^\d{10}$/g]
]);
let validate = (form, ...fields) => {
    let acceptable = true;
    for (let field of fields) {
        if (field == "DOB") {
            acceptable = acceptable && ((new Date() - new Date(form[field].value)) / 31536000000) >= 18;
        } else {
            acceptable = acceptable && (new RegExp(fieldsMap.get(field)).test(form[field].value));
        }
    }
    return acceptable;
};

let editRecord = (id)=>{
    let form = document.forms[0];
    let data = JSON.parse(localStorage.getItem('myform'));
    
    form["user-mail"].value = data[id]["Email"];
    form["user-firstname"].value = data[id]["First Name"];
    form["user-lastname"].value = data[id]["Last Name"];
    form["user-phonenumber"].value = data[id]["Phone number"];
    form["usergender"].value = data[id]["Gender"];
    form["DOB"].value = data[id]["D.O.B"];
};

let deleteRecord = (id)=>{
    
};

let fill = () => {
    let data = JSON.parse(localStorage.getItem('myform'));
    let tableBody = document.getElementById("data-table-body");
    tableBody.innerHTML = "";
    for (let i in data) {
        if (i > 2) {
            tableBody.innerHTML += `<tr>
    <td>${i}</td>
    <td>${data[i]["Email"]}</td>
    <td>${data[i]["First Name"]}</td>
    <td>${data[i]["Last Name"]}</td>
    <td>${data[i]["Phone number"]}</td>
    <td>${data[i]["Gender"]}</td>
    <td>${data[i]["D.O.B"]}</td>
    <td><div class="edit" id="edit${i}" onclick="editRecord(parseInt(this.id.substr(4)))">Edit</div><div class="delete" id="delete${i}" onclick="deleteRecord(parseInt(this.id.substr(6)))">Delete</div></td></tr>`;
        }
    }
};


let show = () => {
    let form = document.forms[0];
    if (!validate(form, "user-mail", "user-firstname", "user-lastname", "user-phonenumber", "DOB")) {
        alert("wrong!");
        return false;
    }
    const values = {
        "Email": form["user-mail"].value,
        "First Name": form["user-firstname"].value,
        "Last Name": form["user-lastname"].value,
        "Phone number": parseInt(form["user-phonenumber"].value),
        "Gender": form["usergender"].value,
        "D.O.B": form["DOB"].value
    };
    let jsonString = localStorage.getItem('myform');
    if(jsonString==""){
        jsonString = JSON.stringify({ 1: { "Email": "mail 1", "First Name": "name 1", "Last Name": "name 1", "Phone number": 9999999999, "Gender": "gender 1", "D.O.B": "2004-01-01" }, 2: { "Email": "mail 2", "First Name": "name 2", "Last Name": "name 2", "Phone number": 9999999999, "Gender": "gender 2", "D.O.B": "2004-01-01" } });
    }
    let data = JSON.parse(jsonString);
    if (data == null || data == undefined) {
        data = { 1: { "Email": "mail 1", "First Name": "name 1", "Last Name": "name 1", "Phone number": 9999999999, "Gender": "gender 1", "D.O.B": "2004-01-01" }, 2: { "Email": "mail 2", "First Name": "name 2", "Last Name": "name 2", "Phone number": 9999999999, "Gender": "gender 2", "D.O.B": "2004-01-01" } };
    }
    //if(data[])
    data[Object.keys(data).length + 1] = values;
    localStorage.setItem('myform', JSON.stringify(data));
    fill();
    return false;
}
