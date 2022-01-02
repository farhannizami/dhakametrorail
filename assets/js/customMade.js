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


  var cn = document.getElementById("selectdata");
  var sch = document.getElementById("searchtrain");


  var stselectind = document.getElementById("start-select");
  var stl = stselectind.options[stselectind.selectedIndex].text;

  var dtselectind = document.getElementById("dest-select");
  var dtl = dtselectind.options[dtselectind.selectedIndex].text;

  var time = document.getElementById("timepicker").value;
  var date = document.getElementById("datepicker").value;

  var personind = document.getElementById("person-select");
  var person = personind.options[personind.selectedIndex].text;


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


    if (minInt > 50) {
      hrint = (hrint + 1) % 24;
      hrstr = hrint.toString();
      if (hrint < 10) hrstr = '0' + hrstr;
      hrstr += ":00";
      dptime = hrstr;
    }
    else {

      dptime += hr+":";
      for (let i = 0; i < minute.length; i++) {
        if (minute[i] >= minInt) {
          dptime += minute[i].toString();
          break;
        }
      }
    }

    const dist = [-1, 0, 2.3, 3.7, 5.7, 6.7, 8.2, 9.5, 10.5, 12, 14, 17.8, 18.8, 20.2, 21.2, 22.6, 24.1];

    var distance = Math.abs(dist[stselectind.selectedIndex] - dist[dtselectind.selectedIndex]);
    var ppfare = Math.max(5, Math.round(distance * 2.4));

    var totfare = ppfare * parseInt(person);

    document.getElementById("train-name").value = "MR-11";
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
  location.replace("../../index.html");
}


function farecalc() {
  var cn = document.getElementById("selectdata");
  var sch = document.getElementById("showprice");
  var stselectind = document.getElementById("start-select");
  var dtselectind = document.getElementById("dest-select");
  var personind = document.getElementById("person-select");
  var person = personind.options[personind.selectedIndex].text;

  if (stl === "Choose start location" || dtl === "Choose destination" || person === "Choose number") {
    alert("Please fill all the forms");
  }
  else {

    sch.style.display = "block";
    document.getElementById("footer").classList.remove("fixed-bottom");
    const dist = [-1, 0, 2.3, 3.7, 5.7, 6.7, 8.2, 9.5, 10.5, 12, 14, 17.8, 18.8, 20.2, 21.2, 22.6, 24.1];
  
    var distance = Math.abs(dist[stselectind.selectedIndex] - dist[dtselectind.selectedIndex]);
    var ppfare = Math.max(5, Math.round(distance * 2.4));

    var totfare = ppfare * parseInt(person);
    document.getElementById("ppfare").value = ppfare;
    document.getElementById("tfare").value = totfare;

  }

}