function toggleShowPass(x, a, b) {

  if (x.type === 'password') {
    x.type = 'text';
    a.style.display = "block";
    b.style.display = "none";
  }
  else {
    x.type = 'password';
    a.style.display = "none";
    b.style.display = "block";
  }
}


function searchRoute() {


  let cn = document.getElementById("selectdata");
  let sch = document.getElementById("searchtrain");


  let stselectind = document.getElementById("start-select");
  let stl = stselectind.options[stselectind.selectedIndex].text;

  let dtselectind = document.getElementById("dest-select");
  let dtl = dtselectind.options[dtselectind.selectedIndex].text;

  let time = document.getElementById("timepicker").value;
  let date = document.getElementById("datepicker").value;

  let personind = document.getElementById("person-select");
  let person = personind.options[personind.selectedIndex].text;


  if (stl === "Choose start location" || dtl === "Choose destination" || person === "Choose number" || time === "" || date === "") {
    alert("Please fill all the forms");
  }
  else {

    cn.style.display = "none";
    sch.style.display = "block";
    alert("Route Found");

    const minute = []

    for (let i = 0; i < 60; i += 5) {
      minute.push(i);
    }

    let hr = time.slice(0, 2);
    let min = time.slice(3, 5);
    let minInt = parseInt(min);
    let hrint = parseInt(hr);

    let dptime = "";


    if (minInt > 55) {
      hrint = (hrint + 1) % 24;
      hrstr = hrint.toString();
      if (hrint < 10) hrstr = '0' + hrstr;
      hrstr += ":00";
      dptime = hrstr;
    }
    else {

      dptime += hr + ":";
      for (let i = 0; i < minute.length; i++) {
        if (minute[i] >= minInt) {
          let minstr = minute[i].toString();
          if (minute[i] < 10) minstr = '0' + minstr;
          dptime += minstr;
          console.log(dptime + " " + minInt + " " + minute[i]);
          break;
        }
      }
    }

    const dist = [-1, 0, 2.3, 3.7, 5.7, 6.7, 8.2, 9.5, 10.5, 12, 14, 17.8, 18.8, 20.2, 21.2, 22.6, 24.1];

    let distance = Math.abs(dist[stselectind.selectedIndex] - dist[dtselectind.selectedIndex]);
    let ppfare = Math.max(5, Math.round(distance * 2.4));

    let totfare = ppfare * parseInt(person);

    //random number between 1 to 14
    let rnd = Math.floor(Math.random() * 14 + 1);

    document.getElementById("train-name").value = "MR-" + rnd.toString();
    document.getElementById("stl").value = stl;
    document.getElementById("dtl").value = dtl;
    document.getElementById("dp-date").value = date;
    document.getElementById("dp-time").value = dptime;
    document.getElementById("ppfare").value = ppfare;
    document.getElementById("tfare").value = totfare;
  }

}

function confirmMsg() {
  alert("Ticket Booked Successfully");
  location.replace("../index.html");
}


function farecalc() {
  let cn = document.getElementById("selectdata");
  let sch = document.getElementById("showprice");
  let stselectind = document.getElementById("start-select");
  let dtselectind = document.getElementById("dest-select");
  let personind = document.getElementById("person-select");
  let person = personind.options[personind.selectedIndex].text;

  let btnag = document.getElementById("btnag");
  let btnfnd = document.getElementById("btnfnd");

  if (stl === "Choose start location" || dtl === "Choose destination" || person === "Choose number") {
    alert("Please fill all the forms");
  }
  else {

    sch.style.display = "block";
    btnfnd.style.display = "none";
    btnag.style.display = "block";


    document.getElementById("footer").classList.remove("fixed-bottom");
    const dist = [-1, 0, 2.3, 3.7, 5.7, 6.7, 8.2, 9.5, 10.5, 12, 14, 17.8, 18.8, 20.2, 21.2, 22.6, 24.1];

    let distance = Math.abs(dist[stselectind.selectedIndex] - dist[dtselectind.selectedIndex]);
    let ppfare = Math.max(5, Math.round(distance * 2.4));

    let totfare = ppfare * parseInt(person);
    document.getElementById("ppfare").value = ppfare;
    document.getElementById("tfare").value = totfare;

  }

}


function showComment() {


  // feedback part
  let count = 0;
  firebase.database().ref('userAccount/feedback/').once('value').then(function (snapshot) {
    snapshot.forEach(function (child) {
      let dc = document.getElementById("demo-comment").cloneNode(true);
      dc.children[0].children[0].innerHTML = child.val().username;
      dc.children[0].children[1].innerHTML = child.val().dateTime;
      dc.children[1].innerHTML = child.val().email;
      dc.children[2].innerHTML = child.val().comment;
      document.getElementById('feedback-section').appendChild(dc);
      dc.style.display = "block";
      count++;
    });
    if(count==0)
    {
      document.getElementById("no-comment").style.display = "block";
    }
  }, function (error) {
    if (error) {
    } else {
      
    }
  });
  
  let demo_disappear = document.getElementById("feedback-section");
  demo_disappear.children[1].style.display = "none";


  // missing item part
  count = 0;
  firebase.database().ref('userAccount/missing/').once('value').then(function (snapshot) {
    snapshot.forEach(function (child) {
      let dc = document.getElementById("demo-missing").cloneNode(true);
      dc.children[0].children[0].innerHTML = child.val().email;
      dc.children[0].children[1].innerHTML = child.val().dateTime;
      dc.children[1].children[0].innerHTML = child.val().location;
      dc.children[2].children[0].innerHTML = child.val().time;
      dc.children[3].innerHTML = child.val().description;
      document.getElementById('missing-section').appendChild(dc);
      dc.style.display = "block";
      count++;
    });
    if(count==0)
    {
      document.getElementById("no-report").style.display = "block";
    }
  }, function (error) {
    if (error) {
    } else {
      
    }
  });
  
  demo_disappear = document.getElementById("missing-section");
  demo_disappear.children[1].style.display = "none";

}