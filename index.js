//Add todo

document.getElementById("submit").addEventListener("click", (e) => {
  e.preventDefault();
  let todo = document.getElementById("input").value;
  let desc = document.getElementById("desc").value;
  let date = new Date();
  let createdDate = `${date.getDate()}-${date.getDay()}-${date.getFullYear()}`;
  let alarmDate = document.getElementById("date").value;
  localStorage.setItem(todo, JSON.stringify([desc, createdDate, alarmDate]));
  console.log(todo, desc);
  location.reload();
  document.getElementById("input").value = "";
  document.getElementById("desc").value = "";
  document.getElementById("date").value = "";
});

//Clear All todo

document.getElementById("delete").addEventListener("click", (e) => {
  e.preventDefault();
  localStorage.clear();
  document.getElementById("display").innerHTML = "";
});

//display todo

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
    <button class="alarm" id="alarm" onclick="alarm(event)">Set Alarm</button>
</div>`;
  }
}
// delete individual todo

const del = (e) => {
  e.preventDefault();
  let id = e.target.nextElementSibling.innerHTML;
  console.log(id);
  localStorage.removeItem(id);
  location.reload();
};

//alarm functionality

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
  console.log(isNaN(alarmTime))

  if (alarmTime > 0 && !isNaN(alarmTime)) {
    alert("Alarm set for " + userDate.toString().substring(16, 24) + " IST");
    e.target.style.background = "green";
    e.target.innerHTML = "Alarm Set";
    setTimeout(() => {
      console.log("ringing alarm");
      ringAlarm(id, idDesc, idTime);
    }, alarmTime);
  } else {
    alert("You can only set alarm for future events");
  }
};
const ringAlarm = (id, idDesc, idTime) => {
  console.log("Audio ringing");
  let audio = new Audio("clock-alarm-8761.mp3");
  audio.play();
  document.getElementById("container").innerHTML = `<div class="todoeachAlarm">
    <h3 class="todo" id="todo">${id}</h3>
<span id="descr">${idDesc}</span></br>
<span id="descr">${idTime}</span></br>
</div>`;
  localStorage.removeItem(id);
  setTimeout(() => {
    location.reload();
  }, 10000);
};
