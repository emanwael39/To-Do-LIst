const inputText = document.getElementById("inputText");
const SubmitBtn = document.getElementById("SubmitBtn");
const UpdateBtn = document.getElementById("UpdateBtn");
const Parent = document.getElementsByClassName("content")[0]
var Data = []
if (localStorage.tasks) {
    Data = JSON.parse(localStorage.tasks)
    draw(Data)
}
//// Add to list function
SubmitBtn.onclick = function () {
    
        SubmitBtn.value="Submit"
        const text = inputText.value;
    var task = {
        id: Date.now(),
        title: text,
        completed: false
    }
    if (text) {
        Data.push(task)
    } else {
        alert("Please enter some text");
    }
    SaveData(Data);
    draw(Data)
    inputText.value = "";
   
}
UpdateBtn.onclick=function(){
    inputText.value=""
}
// Draw ELement Function
function draw(data) {
    Parent.innerHTML=""
    data.forEach(element => {
        Parent.innerHTML += `
            <div class="task ${localStorage.done}" id=${element.id}>
                <p id="task1">${element.title}</p>
                <i class="fa-solid fa-pen edit" style="margin-left: auto;"></i>
                <i class="fa-solid fa-x del"></i>
            </div>
    `
    });
}
// Delete Function
Parent.onclick=function(e){
    if (e.target.classList.contains("del")) {
        e.target.parentElement.remove();
        var id=e.target.parentElement.id
        console.log(id)
    }
 
  Data=Data.filter((item)=>item.id !=id )
//   console.log(Data)
  SaveData(Data)
// complete function
  var idCompleted
    if (e.target.classList.contains("task")) {
        idCompleted=e.target.parentElement.id
       = e.target.classList.toggle("done")
       
        console.log(idCompleted)
    }
  Data.filter((item)=>{
    if(item.id==idCompleted){
        item.completed==true?item.completed=false:item.completed=true
    }
  })

   if(e.target.classList.contains("edit")){
   var v=e.target.parentElement.id;
   var p=e.target.parentElement.childNodes[1]
//    p.innerHTML="ddd"
//    var t=p.querySelector('task1');
//    console.log(t)
   console.log(p)
//    console.log(Data)
    console.log(v)
    console.log(e.target.parentNode.childNodes[0].data)
    Data.filter((item)=>{
        if(item.id==v){
            item.completed==true?item.completed=false:item.completed=true
            inputText.value=item.title
            // const newTaskText = prompt('Edit task:', item.title);
        }
      })
      inputText.oninput=function(){
        p.innerHTML=inputText.value;
        // SubmitBtn.value="Update"
        // mood="update"
        Data.filter((item)=>{
            if(item.id==v){
                item.title=inputText.value
            }
        })
        SaveData(Data)
      }
    
     
   }
   
}


// Save to localstorage function
function SaveData(Data) {
    localStorage.setItem("tasks", JSON.stringify(Data))
}
