let hero = document.querySelector(".hero");
let slider = document.querySelector(".slider");
let animationWrapper = document.querySelector(".animation-wrapper");

const timeline = new TimelineMax();

//parameter1 是要控制的對象
//parameter2 是動畫持續時間
//parameter3 是控制的對象的原始狀態
//parameter4 是控制對象動畫結束後的狀態
//parameter5 是動畫的緩動效果
timeline
  .fromTo(hero, 1, { height: "0%" }, { height: "100%", ease: Power2.easeInOut })
  .fromTo(hero, 1, { width: "80%" }, { width: "100%", ease: Power2.easeInOut })
  .fromTo(slider, 1, { x: "-100%" }, { x: "0%", ease: Power2.easeInOut }, "-=1")
  .fromTo(animationWrapper, 0.3, { opacity: 1 }, { opacity: 0 });

window.setTimeout(() => {
  animationWrapper.style.pointerEvents = "none";
}, 3300);

// 防止按下 Enter 鍵時表單送出
window.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
  }
});

// 防止表單內部的按鈕送出表單
let allButtons = document.querySelectorAll("button");
allButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    e.preventDefault();
  });
});

//選擇select裡面的option，之後要改變相對應的顏色
let allSelect = document.querySelectorAll("select");
allSelect.forEach((select) => {
  select.addEventListener("change", (e) => {
    setGpa(); //計算GPA
    changeColor(e.target); //e.target代表目前被選擇的select
  });
});

//變更Creadi的時候計算GPA
let allCredit = document.querySelectorAll(".class-credit");
allCredit.forEach((credit) => {
  credit.addEventListener("change", (e) => {
    setGpa(); //計算GPA
  });
});

//變換顏色的方法
function changeColor(target) {
  if (target.value === "A" || target.value === "A-") {
    target.style.backgroundColor = "lightgreen";
    target.style.color = "black";
  } else if (
    target.value === "B+" ||
    target.value === "B" ||
    target.value === "B-"
  ) {
    target.style.backgroundColor = "yellow";
    target.style.color = "black";
  } else if (
    target.value === "C+" ||
    target.value === "C" ||
    target.value === "C-"
  ) {
    target.style.backgroundColor = "orange";
    target.style.color = "black";
  } else if (
    target.value === "D+" ||
    target.value === "D" ||
    target.value === "D-"
  ) {
    target.style.backgroundColor = "red";
    target.style.color = "black";
  } else {
    target.style.backgroundColor = "gray";
    target.style.color = "white";
  }
}

//成績轉換成數字的方法
function convertor(grade) {
  switch (grade) {
    case "A":
      return 4.0;
    case "A-":
      return 3.7;
    case "B+":
      return 3.4;
    case "B":
      return 3.0;
    case "B-":
      return 2.7;
    case "C+":
      return 2.4;
    case "C":
      return 2.0;
    case "C-":
      return 1.7;
    case "D+":
      return 1.4;
    case "D":
      return 1.0;
    case "D-":
      return 0.7;
    case "F":
      return 0.0;
    default:
      return 0;
  }
}

//計算GPA的方法
function setGpa() {
  let formLength = document.querySelectorAll("form").length;
  let credits = document.querySelectorAll(".class-credit");
  let selects = document.querySelectorAll("select");
  let gradeSum = 0; //gpa分子
  let creditSum = 0; //gpa分母
  let gpa = 0;

  for (let i = 0; i < credits.length; i++) {
    if (!isNaN(credits[i].valueAsNumber)) {
      creditSum += Number(credits[i].valueAsNumber); //把字串轉成數字
    }
  }

  for (let i = 0; i < formLength; i++) {
    if (!isNaN(credits[i].valueAsNumber)) {
      gradeSum +=
        convertor(selects[i].value) * Number(credits[i].valueAsNumber);
    }
  }

  if (creditSum === 0) {
    gpa = (0.0).toFixed(2);
  } else {
    gpa = (gradeSum / creditSum).toFixed(2);
  }

  document.getElementById("result-gpa").textContent = gpa;
}

//增加新的一欄form
let addButton = document.querySelector(".plus-button");
addButton.addEventListener("click", () => {
  let newForm = document.createElement("form");
  let newDiv = document.createElement("div");
  newDiv.classList.add("grader");

  //製作Div裡面的五樣元素
  let newInput1 = document.createElement("input");
  newInput1.setAttribute("type", "text");
  newInput1.setAttribute("list", "opt");
  newInput1.setAttribute("placeholder", "class category");
  newInput1.classList.add("class-type");

  let newInput2 = document.createElement("input");
  newInput2.setAttribute("type", "text");
  newInput2.setAttribute("placeholder", "class number");
  newInput2.classList.add("class-nuber");

  let newInput3 = document.createElement("input");
  newInput3.setAttribute("type", "number");
  newInput3.setAttribute("min", "0");
  newInput3.setAttribute("max", "6");
  newInput3.setAttribute("placeholder", "credit");
  newInput3.classList.add("class-credit");
  newInput3.addEventListener("change", (e) => {
    setGpa();
    console.log("change!!");
  });

  let newSelect = document.createElement("select");
  newSelect.setAttribute("name", "select");
  newSelect.classList.add("select");
  var opt1 = document.createElement("option");
  opt1.setAttribute("value", "");
  let textNode1 = document.createTextNode("");
  opt1.appendChild(textNode1);
  var opt2 = document.createElement("option");
  opt2.setAttribute("value", "A");
  let textNode2 = document.createTextNode("A");
  opt2.appendChild(textNode2);
  var opt3 = document.createElement("option");
  opt3.setAttribute("value", "A-");
  let textNode3 = document.createTextNode("A-");
  opt3.appendChild(textNode3);
  var opt4 = document.createElement("option");
  opt4.setAttribute("value", "B+");
  let textNode4 = document.createTextNode("B+");
  opt4.appendChild(textNode4);
  var opt5 = document.createElement("option");
  opt5.setAttribute("value", "B");
  let textNode5 = document.createTextNode("B");
  opt5.appendChild(textNode5);
  var opt6 = document.createElement("option");
  opt6.setAttribute("value", "B-");
  let textNode6 = document.createTextNode("B-");
  opt6.appendChild(textNode6);
  var opt7 = document.createElement("option");
  opt7.setAttribute("value", "C+");
  let textNode7 = document.createTextNode("C+");
  opt7.appendChild(textNode7);
  var opt8 = document.createElement("option");
  opt8.setAttribute("value", "C");
  let textNode8 = document.createTextNode("C");
  opt8.appendChild(textNode8);
  var opt9 = document.createElement("option");
  opt9.setAttribute("value", "C-");
  let textNode9 = document.createTextNode("C-");
  opt9.appendChild(textNode9);
  var opt10 = document.createElement("option");
  opt10.setAttribute("value", "D+");
  let textNode10 = document.createTextNode("D+");
  opt10.appendChild(textNode10);
  var opt11 = document.createElement("option");
  opt11.setAttribute("value", "D");
  let textNode11 = document.createTextNode("D");
  opt11.appendChild(textNode11);
  var opt12 = document.createElement("option");
  opt12.setAttribute("value", "D-");
  let textNode12 = document.createTextNode("D-");
  opt12.appendChild(textNode12);
  var opt13 = document.createElement("option");
  opt13.setAttribute("value", "F");
  let textNode13 = document.createTextNode("F");
  opt13.appendChild(textNode13);

  newSelect.appendChild(opt1);
  newSelect.appendChild(opt2);
  newSelect.appendChild(opt3);
  newSelect.appendChild(opt4);
  newSelect.appendChild(opt5);
  newSelect.appendChild(opt6);
  newSelect.appendChild(opt7);
  newSelect.appendChild(opt8);
  newSelect.appendChild(opt9);
  newSelect.appendChild(opt10);
  newSelect.appendChild(opt11);
  newSelect.appendChild(opt12);
  newSelect.appendChild(opt13);

  newSelect.addEventListener("change", (e) => {
    setGpa();
    changeColor(e.target);
  });

  let newButton = document.createElement("button");
  newButton.classList.add("trash-button");
  let newItag = document.createElement("i");
  newItag.classList.add("fas");
  newItag.classList.add("fa-trash");
  newButton.appendChild(newItag);
  newButton.addEventListener("click", (e) => {
    e.preventDefault();

    e.target.parentElement.parentElement.classList.add("scaleDown");
    newButton.parentElement.parentElement.addEventListener(
      "transitionend",
      (e) => {
        e.target.remove();
        setGpa();
      }
    );
  });

  newForm.appendChild(newDiv);

  newDiv.appendChild(newInput1);
  newDiv.appendChild(newInput2);
  newDiv.appendChild(newInput3);
  newDiv.appendChild(newSelect);
  newDiv.appendChild(newButton);
  document.querySelector(".all-inputs").appendChild(newForm);
  newForm.style.animation = "scaleUp 0.25s forwards";

  //如果動畫結束後沒有刪除，會影響到之後刪除按鈕縮小的動畫，
  //因為這裡是用style去控制，縮小則是用class控制，style的屬性優先於class。
  newForm.addEventListener("animationend", (e) => {
    e.target.style.removeProperty("animation");
  });
});

//垃圾桶trash button 刪除功能
let AllTrash = document.querySelectorAll(".trash-button");
//按下刪除 縮小表格
AllTrash.forEach((trash) => {
  trash.addEventListener("click", (e) => {
    e.target.parentElement.parentElement.classList.add("scaleDown");
  });
});
//監聽縮小事件，然後刪除表格
AllTrash.forEach((trash) => {
  let form = trash.parentElement.parentElement;
  form.addEventListener("transitionend", (e) => {
    e.target.remove();
    setGpa();
  });
});

//排序演算法
let btn1 = document.querySelector(".sort-descending");
let btn2 = document.querySelector(".sort-ascending");

btn1.addEventListener("click", () => {
  handleSorting("descending"); //大到小
});
btn2.addEventListener("click", () => {
  handleSorting("ascending"); //小到大
});

function handleSorting(direction) {
  let graders = document.querySelectorAll("div.grader");

  // 先檢查有沒有至少兩筆成績可比較
  let filledGradeCount = 0;
  graders.forEach((g) => {
    const grade = g.children[3].value?.trim();
    if (grade) filledGradeCount++;
  });
  if (filledGradeCount < 2) {
    alert("請至少填寫兩筆成績再排序。");
    return; // 不排序，直接離開
  }

  let objectArray = [];

  for (let i = 0; i < graders.length; i++) {
    let class_name = graders[i].children[0].value; //class category
    let class_number = graders[i].children[1].value; //class number
    let class_credit = graders[i].children[2].value; //class credit
    let class_grade = graders[i].children[3].value; //class grade

    if (
      !(
        class_name == "" &&
        class_number == "" &&
        class_credit == "" &&
        class_grade == ""
      )
    ) {
      let class_object = {
        class_name: class_name,
        class_number: class_number,
        class_credit: class_credit,
        class_grade: class_grade,
        class_grade_number: convertor(class_grade),
      };
      objectArray.push(class_object);
    }
  }

  //   //取得objectArry後，把成績換成數字
  //   for (i = 0; i < objectArry.length; i++) {
  //     console.log(objectArry[i].class_grade_number);
  //   }
  objectArray = mergeSort(objectArray);
  if (direction == "descending") {
    objectArray = objectArray.reverse();
  }

  //根據objectArray來更新表單內容
  let allInputs = document.querySelector(".all-inputs");
  allInputs.innerHTML = ""; //清空表單內容

  for (let i = 0; i < objectArray.length; i++) {
    allInputs.innerHTML += `<form>
    <div class="grader">
    <input
    type="text"
    class="class-type"
    placeholder="class category"
    list="opt"
    value="${objectArray[i].class_name !== "" ? objectArray[i].class_name : ""}"
    />
    <input
    type="text"
    class="class-number"
    placeholder="class number"
    value="${objectArray[i].class_number !== "" ? objectArray[i].class_number: ""}"
    />
    <input
    type="number"
    class="class-credit"
    placeholder="credits"
    min="0"
    max="6"
    value=${objectArray[i].class_credit}
    />
    <select name="select" class="select">
    <option value=""></option>
    <option value="A">A</option>
    <option value="A-">A-</option>
    <option value="B+">B+</option>
    <option value="B">B</option>
    <option value="B-">B-</option>
    <option value="C+">C+</option>
    <option value="C">C</option>
    <option value="C-">C-</option>
    <option value="D+">D+</option>
    <option value="D">D</option>
    <option value="D-">D-</option>
    <option value="F">F</option>
    </select>
    <button class="trash-button">
    <i class="fas fa-trash"></i>
    </button>
</div>
</form>`;
  }

  //Select 可以直接用JS更改
  graders = document.querySelectorAll("div.grader");
  for (let i = 0; i < graders.length; i++) {
    graders[i].children[3].value = objectArray[i].class_grade;
  }

  //重新綁定select事件監聽
  let allSelects = document.querySelectorAll(".select");
  allSelects.forEach((select) => {
    changeColor(select);
    select.addEventListener("change", (e) => {
      setGpa();
      changeColor(e.target);
    });
  });

  //重新綁定credit事件監聽
  let AllCredits = document.querySelectorAll(".class-credit");
  AllCredits.forEach((credit) => {
    credit.addEventListener("change", (e) => {
      setGpa();
    });
  });

  //重新綁定垃圾桶事件監聽
  let AllTrash = document.querySelectorAll(".trash-button");
  AllTrash.forEach((trash) => {
    trash.addEventListener("click", (e) => {
      e.preventDefault();
      e.target.parentElement.parentElement.classList.add("scaleDown");

      //監聽縮小事件，然後刪除表格
      let form = trash.parentElement.parentElement;
      form.addEventListener("transitionend", (e) => {
        e.target.remove();
        setGpa();
      });
    });
  });
}

function merge(a1, a2) {
  let result = [];
  let i = 0;
  let j = 0;
  while (i < a1.length && j < a2.length) {
    if (a1[i].class_grade_number > a2[j].class_grade_number) {
      result.push(a2[j]);
      j++;
    } else {
      result.push(a1[i]);
      i++;
    }
  }

  while (i < a1.length) {
    result.push(a1[i]);
    i++;
  }
  while (j < a2.length) {
    result.push(a2[j]);
    j++;
  }

  return result;
}

function mergeSort(arr) {
  if (arr.length == 0) {
    return [];
  }

  if (arr.length == 1) {
    return arr;
  } else {
    let middle = Math.floor(arr.length / 2);
    let left = arr.slice(0, middle);
    let right = arr.slice(middle, arr.length);
    return merge(mergeSort(left), mergeSort(right));
  }
}
