document.getElementById("submit").addEventListener("click", (e) => {
  e.preventDefault();
  let todo = document.getElementById("input").value;
  let desc = document.getElementById("desc").value;
  localStorage.setItem(todo, JSON.stringify([desc]));
  console.log(todo, desc);
  document.getElementById("display").innerHTML += `<div class="todoeach">
    <h3 class="todo" id="todo">${todo}</h3>
<span id="descr">${desc}</span>
<button class="del" id=${todo} onclick="del(event)">X</button> 
</div>`;
  document.getElementById("input").value = "";
  document.getElementById("desc").value = "";
});
document.getElementById("delete").addEventListener("click", (e) => {
  e.preventDefault();
  localStorage.clear();
  console.log(todo, desc);
  document.getElementById("display").innerHTML = "";
});
if (localStorage.length > 0) {
  for (let i = 0; i < localStorage.length; i++) {
    document.getElementById("display").innerHTML += `<div class="todoeach">
    <h3 class="todo" id="todo">${localStorage.key(i)}</h3>
<span id="descr">${JSON.parse(localStorage.getItem(localStorage.key(i)))}</span>
<button class="del" id=${localStorage.key(i)} onclick="del(event)">X</button>
</div>`;
  }
}
const del=(e)=>{
  e.preventDefault();
  let id=e.target.id;
  console.log(id);
  localStorage.removeItem(id);
  location.reload();
}
