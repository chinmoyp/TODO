//Problem: User interaction doesn't provide desired results.
//Solution: Add interactivity so the user can manage daily tasks.

var taskInput = document.getElementById("new-task");//new task
var addButton = document.getElementsByTagName("button")[0];//first button
var incompleteTaskHolder = document.getElementById("incomplete-tasks");//incomplete tasks
var completedTaskHolder = document.getElementById("completed-tasks");//completed tasks

//New Task List Item
var createNewTaskElement = function(taskString){
  var listItem = document.createElement("li");
  
   //input (checkbox)
  var checkbox = document.createElement("input");//checkbox
        //label
  var label = document.createElement("label");
        //input (text)
    var editInput = document.createElement("input");
        //button.edit
    var editButton = document.createElement("button");
        //button.delete
    var deleteButton = document.createElement("button");
        //Each elements, needs modifying
  checkbox.type = "checkbox";
  editInput.type = "text";
  editButton.innerText = "Edit";
  editButton.className = "edit";
  deleteButton.innerText = "Delete";
  deleteButton.className = "delete";
  label.innerText = taskString;
        //Each elements needs appending
   listItem.appendChild(checkbox);
   listItem.appendChild(label);
   listItem.appendChild(editInput);
   listItem.appendChild(editButton);
   listItem.appendChild(deleteButton);
   
  return listItem;
  
}

//Add a new task
var addTask = function(){
  console.log("Add task...");
    //When the button is pressed
    //Create a new list item with the text from #new-task:
    var listItem = createNewTaskElement(taskInput.value);
    
    //Append listItem to incompleteTaskHolder
    incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem,taskCompleted);
  taskInput.value = " ";
}

//Edit an existing task
var editTask = function(){
    console.log("Edit task...");
  
  var listItem = this.parentNode;
  var editInput = listItem.querySelector("input[type=text]");
  var label = listItem.querySelector("label");
     //when the Edit button is pressed
        //if the class of the parent is .editMode
  if(listItem.classList.contains("editMode")){
            //Switch from .editMode
            //label text become the imput's value
     label.innerText = editInput.value;
     } else {
            //Switch to .editMode
            //input value becomes the label's text
     editInput.value = label.innerText;
     }
             //Toggle .editMode on the parent
     listItem.classList.toggle("editMode");
}

//Delete an existing task
var deleteTask = function(){
    console.log("Delete task...");
  //When the Delete button is pressed
  var listItem = this.parentNode;
  var ul = listItem.parentNode;
        //Remove parent list item from the ul
ul.removeChild(listItem);
}


//Mark a task as complete
var taskCompleted = function(){
    console.log("task completed...");
//When the checkbox is checked
  //Append the task list item to the #completed-task
  var listItem = this.parentNode;
  completedTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem,taskIncomplete);
}
//Mark a task as incomplete
var taskIncomplete = function(){
    console.log("task incomplete...");
  //When the checkbox is unchecked
    //Append the task item to the #incomplete-task
  var listItem = this.parentNode;
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem,taskCompleted);
  
  
}
var bindTaskEvents = function(taskListItem, checkBoxEventHandler){
  console.log("Bind list events");
  //select taskListItem's children
  var checkBox = taskListItem.querySelector("input[type = checkbox]")
  var editButton = taskListItem.querySelector("button.edit");
  var deleteButton = taskListItem.querySelector("button.delete");
  //bind editTask to edit button
  editButton.onclick = editTask;
      //bind deleteTask to delete button
  deleteButton.onclick = deleteTask;
      //bind checkBoxEventHandler to checkbox
  checkBox.onchange = checkBoxEventHandler;

  
}
var ajaxRequest = function(){
 console.log("AJAX") 
}

//Set the click handler to the addTask function
addButton.addEventListener("click",addTask);
addButton.addEventListener("click",ajaxRequest);




//cycle over incompleteTaskHolder ul list items
for(var i=0; i< incompleteTaskHolder.children.length; i++){
  bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);
    //for each list item
      //select its children
      //bind events to list item's children (taskCompleted)
      
}

//cycle over completeTaskHolder ul list items
for(var i=0; i< completedTaskHolder.children.length; i++){
  bindTaskEvents(completedTaskHolder.children[i], taskIncomplete);
      //for each list item
        //select its children
        //bind events to list item's children (taskInCompleted)
}

