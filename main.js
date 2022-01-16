var SpeechRecognition = window.webkitSpeechRecognition;

var recognition = new SpeechRecognition();

function start() {
  document.getElementById("textbox").innerHTML = "";
  recognition.start();
}

recognition.onresult = function (event) {
  console.log(event);

  var Content = event.results[0][0].transcript;
  document.getElementById("textbox").innerHTML = Content;
  console.log(Content);

  if (Content == "take my selfie") {
    console.log("taking selfie ---");
    speak();
  }
};

function speak() {
  var synth = window.speechSynthesis;
  speak_data = "Taking your selfie in 5 seconds";
  var utterthis = new SpeechSynthesisUtterance(speak_data);
  synth.speak(utterthis);
  webcam.attach(camera);
  settimeout(function () {
    take_snapshot();
    save();
  }, 5000);
}

camera = document.getElementById("camera");
webcam.set({
  width: 360,
  height: 250,
  image_format: "jpeg",
  jpeg_quality: 90,
});

function take_snapshot() {
  webcam.snap(function (data_uri) {
    document.getElementById("result").innerHTML =
      '<img id="selfie_image" src=" ' + data_uri + ' " />';
  });
}

function save() {
  link = document.getElementById("link");
  image = document.getElementById("selfie_image").src;
  link.href = image;
  link.click();
}
