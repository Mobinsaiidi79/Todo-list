let $ = document;
let users=[
    {id:1, name:"mobin", pas:'123456'}
]
let TodoArray = [];
let month = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let userBox=$.querySelector('.user')
let UserInput=$.querySelector('.UserinputElem')
let pasInput=$.querySelector('.pasinputElem')
let loginBtn=$.querySelector('.loginBtn')
let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let boxShowModal = $.querySelector(".AddTodoBox");
let addTodoElem = $.querySelector(".btn");
let closeBtnElem = $.querySelector(".close-modal");
let modalBoxElem = $.querySelector(".modalBox");
let titleModal = $.querySelector(".titleModal");
let inputElem = $.querySelector(".inputElem");
let textareaElem = $.querySelector(".textarea");
let TodoCardElem = $.querySelector(".cordBox");
let UpdateID = null;
let isUpdate = false;

// function

function generateTodos(TodoArray, index) {
  $.querySelectorAll(".cordBoxTodo").forEach((todo) => {
    todo.remove();
  });
  TodoArray.forEach((todo) => {
    TodoCardElem.insertAdjacentHTML(
      "afterend",
      `<div class=" col-md-4 mt-5 shadow cordBox  cordBoxTodo">
        <div class="card TodoCard">
            <div class="card-body">
                <h5 class="card-title">${todo.title} </h5>
                <p class="card-text">${todo.description}</p>
               
                <div class="footerBox">
                    <div class="date">
                        <p class="month">${todo.month} </p>
                    <p class="day px-1">${todo.day} </p>
                    <p class="year">${todo.year}</p>
                    </div>
                        <div class="icons">
                            <i class="far fa-edit" onclick="editTodo(${todo.id}, '${todo.title}' , '${todo.description}')"></i>
                            <i class="far fa-trash-alt" onclick="removeTodo(${index})"></i>
                        </div>
                </div>
            </div>
        </div>`
    );
  });

  inputElem.focus();
}

function setTodosInLocalStorageTodos(TodoArray) {
  localStorage.setItem("todos", JSON.stringify(TodoArray));
}

function getLocalStorageTodos() {
  let LocalStorageTodos = localStorage.getItem("todos");

  if (LocalStorageTodos) {
    TodoArray = JSON.parse(LocalStorageTodos);
  } else {
    TodoArray = [];
  }
  return TodoArray;
}

function editTodo(todoId, todoTitle, todoDesc) {
  isUpdate = true;
  UpdateID = todoId;

  showModal(todoTitle, todoDesc);

  console.log(UpdateID, todoTitle, todoDesc);
}

function showModal(todoTitle, todoDesc) {
  modalBoxElem.style.top = "40%";
  if (isUpdate) {
    titleModal.innerHTML = "Update main Todo";
    addTodoElem.innerHTML = "Update";
    inputElem.value = todoTitle;
    textareaElem.value = todoDesc;
  } else {
    titleModal.innerHTML = "Add new Todo";
    addTodoElem.innerHTML = "Add Todo";
  }
}

function removeTodo(todoIndex) {
  let deleted = confirm("Are you sure you want to delete");

  if (deleted) {
    let removeTodo = getLocalStorageTodos();

    removeTodo.splice(todoIndex, 1);

    setTodosInLocalStorageTodos(removeTodo);
    generateTodos(TodoArray);
  } else {
  }
}

// addEventListener


boxShowModal.addEventListener("click", showModal);

closeBtnElem.addEventListener("click", () => {
  modalBoxElem.style.top = "-90%";
  inputElem.value = "";
  textareaElem.value = "";
});
loginBtn.addEventListener("click", () => {
    let UserInputValue=UserInput.value
 
    let indexUser=users.find(user => user.name === UserInputValue)
     
    if(indexUser){
        $.querySelector('.nameUser').innerHTML=indexUser.name
        userBox.style.display="block"
        $.querySelector('.login').style.top="-50%"
        $.querySelector('.Elements').style.display="block"
     }else{
       alert('User not found:(')
     }
     UserInput.value=""

})
addTodoElem.addEventListener("click", () => {
    if (isUpdate) {
        showModal(todoTitle, todoDesc)
      let allTodos = getLocalStorageTodos();
      let indexToUpdate = allTodos.findIndex(todo => todo.id === UpdateID);
      if (indexToUpdate !== -1) {
        allTodos[indexToUpdate].title = inputElem.value;
        allTodos[indexToUpdate].description = textareaElem.value;
        setTodosInLocalStorageTodos(allTodos);
        generateTodos(allTodos);
      }
    } else {
      let newDate = new Date();
      let newTodo = {
        id: TodoArray.length + 1,
        title: inputElem.value,
        description: textareaElem.value,
        month: month[newDate.getMonth()],
        day: days[newDate.getDay()],
        year: newDate.getFullYear(),
      };
      TodoArray.push(newTodo);
  
      setTodosInLocalStorageTodos(TodoArray);
      generateTodos(TodoArray);
    }
  
    inputElem.value = "";
    textareaElem.value = "";
    isUpdate = false;
    UpdateID = null;
  });
  
window.addEventListener("load", () => {
  let TodoArray = getLocalStorageTodos();
  generateTodos(TodoArray);
});
