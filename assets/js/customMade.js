function toggleShowPass(x,a,b)
    {
    //   var x = document.getElementById("pass");
    //   var a = document.getElementById("hide1");
    //   var b = document.getElementById("hide2");
      if(x.type ===  'password')
      {
        x.type= 'text';
        a.style.display = "block";
        b.style.display = "none";
      }
      else
      {
        x.type= 'password';
        a.style.display = "none";
        b.style.display = "block";
      }
    }