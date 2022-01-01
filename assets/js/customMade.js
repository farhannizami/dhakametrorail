function toggleShowPass(x, a, b) {
  //   var x = document.getElementById("pass");
  //   var a = document.getElementById("hide1");
  //   var b = document.getElementById("hide2");
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

  //var ppfare = parseInt(person) * 4;

  //if(time==="") console.log("nnnn")
  //console.log(date+" "+time);

  if (stl === "Choose start location" || dtl === "Choose destination" || person === "Choose number" || time === "" || date === "") {
    alert("Please fill all the forms");
  }
  else {

    cn.style.display = "none";
    sch.style.display = "block";

    const dist = [-1,0,2.3, 3.7, 5.7, 6.7, 8.2, 9.5, 10.5, 12, 14, 17.8, 18.8, 20.2, 21.2, 22.6, 24.1];
    //console.log(dtselectind.selectedIndex);
    //console.log(dtselectind.selectedIndex.value);
    //console.log(dist[dtselectind.selectedIndex]);

    var distance  = Math.abs(dist[stselectind.selectedIndex] - dist[dtselectind.selectedIndex]);
    var ppfare = Math.max(5,Math.round(distance*2.4));

    var totfare = ppfare* parseInt(person);

    //alert(stl);
    document.getElementById("train-name").value = "MR-11";
    document.getElementById("stl").value = stl;
    document.getElementById("dtl").value = dtl;
    document.getElementById("ppfare").value = ppfare;
    document.getElementById("tfare").value = totfare;
  }

}

function confirmMsg()
{
  alert("Ticket Booked Successfully");
}