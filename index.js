document.getElementById("submit").addEventListener("click", (e) => {
  e.preventDefault();
  let todo = document.getElementById("input").value;
  let desc = document.getElementById("desc").value;
  let date = new Date();
  let createdDate = `${date.getDate()}-${date.getDay()}-${date.getFullYear()}`;
  let alarmDate = document.getElementById("date").value;
  localStorage.setItem(todo, JSON.stringify([desc, createdDate, alarmDate]));
  console.log(todo, desc);
  document.getElementById("display").innerHTML += `<div class="todoeach">
  <button class="del" onclick="del(event)">X</button> 
    <h3 class="todo" id="todo">${todo}</h3>
<span id="descr">${desc}</span></br>
<span id="descr">${createdDate}</span></br>
<button class="alarm" onclick="alarm(event)">Set Alarm</button>
</div>`;
  document.getElementById("input").value = "";
  document.getElementById("desc").value = "";
  document.getElementById("date").value = "";
});
document.getElementById("delete").addEventListener("click", (e) => {
  e.preventDefault();
  localStorage.clear();
  document.getElementById("display").innerHTML = "";
});
if (localStorage.length > 0) {
  for (let i = 0; i < localStorage.length; i++) {
    document.getElementById("display").innerHTML += `<div class="todoeach">
    <button class="del" onclick="del(event)">X</button>
    <h3 class="todo" id="todo">${localStorage.key(i)}</h3>
<span id="descr">${
      JSON.parse(localStorage.getItem(localStorage.key(i)))[0]
    }</span></br>
<span id="descr">${
      JSON.parse(localStorage.getItem(localStorage.key(i)))[1]
    }</span></br>
    <button class="alarm" onclick="alarm(event)">Set Alarm</button>
</div>`;
  }
}
const del = (e) => {
  e.preventDefault();
  let id = e.target.nextElementSibling.innerHTML;
  console.log(id);
  localStorage.removeItem(id);
  location.reload();
};

const alarm = (e) => {
  e.preventDefault();
  let id =
    e.target.parentElement.firstElementChild.nextElementSibling.innerHTML;
  let idDesc =
    e.target.parentElement.firstElementChild.nextElementSibling
      .nextElementSibling.innerHTML;
  let idTime =
    e.target.parentElement.firstElementChild.nextElementSibling
      .nextElementSibling.nextElementSibling.nextElementSibling.innerHTML;
  let userDate = new Date(JSON.parse(localStorage.getItem(id))[2]);
  console.log(userDate, idDesc, idTime);
  let presentDate = new Date();
  console.log(presentDate);
  let alarmTime = userDate - presentDate;
  console.log(alarmTime);

  if (alarmTime > 0) {
    setTimeout(() => {
      console.log("ringing alarm");
      ringAlarm(id, idDesc, idTime);
    }, alarmTime);
  } else {
    alert("You can only set alarm for future events");
  }
};
const ringAlarm = (id, idDesc, idTime) => {
  console.log("Inside Audio ring method");
  let audio = new Audio("clock-alarm-8761.mp3");
  audio.play();
  document.getElementById("display").innerHTML = `<div class="todoeachAlarm">
    <h3 class="todo" id="todo">${id}</h3>
<span id="descr">${idDesc}</span></br>
<span id="descr">${idTime}</span></br>
</div>`;
  setTimeout(() => {
    location.reload();
  }, 3000);
};
