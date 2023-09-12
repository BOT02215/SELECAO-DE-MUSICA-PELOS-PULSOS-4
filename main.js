rightWristX = 0
leftWristX = 0
rightWristY = 0
leftWristY = 0
rightWristScore = 0
leftWristScore = 0
songStatus1 = ""
songStatus2 = ""

function setup() {
    canvas = createCanvas(600, 450);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded)
    poseNet.on("pose", gotPoses)
}

function modelLoaded() {
    console.log("Modelo Carregado")
}

function preload() {
    song1 = loadSound("music.mp3");
    song2 = loadSound("music2.mp3");
}

function gotPoses(result) {
    if (result.length > 0) {
        console.log(result)
        rightWristX = result[0].pose.rightWrist.x
        leftWristX = result[0].pose.leftWrist.x
        rightWristY = result[0].pose.rightWrist.y
        leftWristY = result[0].pose.leftWrist.y
        rightWristScore = result[0].pose.rightWrist.confidence
        leftWristScore = result[0].pose.leftWrist.confidence
        console.log(rightWristScore)
        console.log(leftWristScore)
    }
}

function draw() {
    image(video, 0, 0, 600, 450)
    songStatus1 = song1.isPlaying()
    fill("red")
    stroke("red")
    if(leftWristScore > 0.2) {
        circle(leftWristX, leftWristY, 40, 40)
        song2.stop()

        if(songStatus1 == false) {
            song1.play()
            document.getElementById("nome_da_musica").innerHTML = "Nome da Música: Harry Potter - Remix"
        }
    }
}

