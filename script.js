let listObj = JSON.parse(localStorage.getItem('tasksList'));
if (listObj == null) {
    listObj = [];
}
else {
    showTask();
}

let task="";
document.getElementById('newTask').addEventListener('click', function () {
    task = document.getElementById('task').value;
    listObj.push({ toDo: task, status: false });
    document.getElementById('task').value="";
    localStorage.setItem('tasksList', JSON.stringify(listObj));
    showTask();
})

function showTask() {
    listObj = JSON.parse(localStorage.getItem('tasksList'));
    let listItems="";
    listObj.forEach(function(element,index)
    {
      let listItem=`<li id="${index}" class="listItem"><i class="far fa-square" onclick="checkitem(this)"></i>${element.toDo}<i class="fas fa-trash" onclick="removeTask(this)"></i></li>`;
      listItems+=listItem;
    })
    document.getElementById('list').innerHTML=listItems;
    listObj.forEach(function(element,index)
    {
        if(`${element.status}`=="true")
        {
            let itemId=`${index}`;
            document.getElementById(itemId).firstChild.classList.add('fa-check-square');
            document.getElementById(itemId).firstChild.classList.remove('fa-square');
            document.getElementById(itemId).classList.add('strike');
            document.getElementById(itemId).style.opacity=0.3;
        }
    })
}

function removeTask(e){
 let deleteObj=e.parentNode.id;
 listObj.splice(deleteObj,1);
 localStorage.setItem('tasksList', JSON.stringify(listObj));
 showTask();
} 

function checkitem(e){
    let status=e.parentNode.id;
    if(e.classList.contains('fa-square'))
    {
        listObj[status].status="true";
        e.classList.remove("fa-square");
        e.classList.add("fa-check-square");
        e.parentNode.classList.add('strike');
        e.parentNode.style.opacity=0.3;
    }
    else
    {
       listObj[status].status="false";
       e.classList.remove("fa-check-square");
       e.classList.add("fa-square");
       e.parentNode.classList.remove('strike');
       e.parentNode.style.opacity=1;
    }
    localStorage.setItem('tasksList', JSON.stringify(listObj));
}