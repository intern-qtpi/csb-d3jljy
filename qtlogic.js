var state = "off";
var buzzer = document.getElementById("buzzer1");
// var ir = document.getElementById("apds1");

function gotData(data) {
  var apdsObj = JSON.parse(data);
  var distance = apdsObj.d;
  console.log(data, distance);
  var goal = false;
  if (distance > 0 && distance < 255 && goal === false) {
    console.log("buzzer turned on");
    state = "on";
    goal = true;
    Hit_goal();
    buzzer.buzz("on");
  } else {
    console.log("buzzer turned off");
    buzzer.buzz("off");
    state = "off";
  }
}
