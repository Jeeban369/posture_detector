let capture;
let posenet;
let noseX,noseY;
let leyeX, leyeY;
let reyeX, reyeY;
let singlePose, skeleton;
let actor_img;

/** This function sets up our sketch. */
function setup() {
    createCanvas(630, 470);
    capture = createCapture(VIDEO);
    capture.hide();
    // frameRate(60);

    posenet = ml5.poseNet(capture, modelLoaded);
    posenet.on('pose',receivedPoses);

    actor_img= loadImage('images/frog.png');
    // specs = loadImage('images/spects.png')
}

function receivedPoses(poses){
    console.log(poses);

    if(poses.length > 0){
        singlePose = poses[0].pose;
        // noseX = singlePose.nose.x;
        // noseY = singlePose.nose.y;

        // reyeX = singlePose.rightEye.x;
        // reyeY = singlePose.rightEye.y;

        // leyeX = singlePose.leftEye.x;
        // leyeY = singlePose.leftEye.y;
        skeleton = poses[0].skeleton;

    }
    console.log(noseX + " " + noseY);
}
function modelLoaded(){
    console.log('Model has loaded');
}

/** This function redraws the sketch multiple times a second. */
function draw() {
    image(capture, 0, 0);
    fill(255, 0, 0);
    // ellipse(noseX, noseY, 20);
    // ellipse(leyeX, leyeY, 20);
    // ellipse(reyeX, reyeY, 20);
    if(singlePose){
        for(let i=0; i<singlePose.keypoints.length; i++){
            ellipse(singlePose.keypoints[i].position.x,
                 singlePose.keypoints[i].position.y, 20);
        }  
        
        stroke(0,255,255);
        strokeWeight(3);
        for(let j=0; j<skeleton.length; j++){
            line(skeleton[j][0].position.x, skeleton[j][0].position.y, 
                skeleton[j][1].position.x, skeleton[j][1].position.y);
        }

        image(actor_img, singlePose.leftAnkle
            .x-45, singlePose.leftAnkle
            .y-60, 100, 100);
    }
}
