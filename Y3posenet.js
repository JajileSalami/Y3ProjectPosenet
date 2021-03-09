// Copyright (c) 2019 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
PoseNet example using p5.js
=== */

let video;
let poseNet;
let poses = [];

function setup() {
  createCanvas(640, 480);
  //x,y = 640, 480 ^
  video = createCapture(VIDEO);
  video.size(width, height);
  video.position(500,500);

  // Create a new poseNet method with a single detection
  poseNet = ml5.poseNet(video, modelReady);
  // This sets up an event that fills the global variable "poses"
  // with an array every time new poses are detected
  poseNet.on("pose", function(results) {
    poses = results;
  });
  // Hide the video element, and just show the canvas
  video.hide();
}

function modelReady() {
  select("#status").html("Model Loaded");
}


function preload() {

  img = loadImage('./faces/lmaoemoji.png');
  img2 = loadImage('./faces/mrkamthemancropped.jpg');
  img3 = loadImage('./faces/cookie.png');
  imageState = img;
}
let img;
let img2;
let img3;
let imageState;
function draw() {
  image(video, 0, 0, width, height);
  if (poses.length) {
    let noseX = poses[0].pose.nose.x;
    let noseY = poses[0].pose.nose.y;

    let leftEyeX = poses[0].pose.leftEye.x;
    let leftEyeY = poses[0].pose.leftEye.y;

    let rightEyeX = poses[0].pose.rightEye.x;
    let rightEyeY = poses[0].pose.rightEye.y;
    /*
    let rightEarX = poses[0].pose.rightEar.x;
    let rightEarY = poses[0].pose.rightEar.y;

    let leftEarX = poses[0].pose.leftEar.x;
    let leftEarY = poses[0].pose.leftEar.x;
    */

    let faceAngle = Math.atan((leftEyeY-rightEyeY)/(leftEyeX-rightEyeX));
    let picWidth = Math.sqrt((leftEyeX-rightEyeX)**2+(leftEyeY-rightEyeY)**2) *4;


    translate(noseX,noseY);
    //moves onto my face
    
    rotate(faceAngle);

    translate(-picWidth/2,-picWidth/2);
    
    image(imageState,0,0,picWidth,picWidth);
  
    
  }
  
  // We can call both functions to draw all keypoints and the skeletons
  drawKeypoints();
 // drawSkeleton();
  
  //Puts image of mr kam on canvas
}
function mrKam() {
  //img = image(imageState,0,0,picWidth,picWidth);
  imageState = img2;
}
function lmao() {
  imageState = img;
}
function ami() {
  imageState = img3;
}

// A function to draw ellipses over the detected keypoints
function drawKeypoints() {
  // Loop through all the poses detected
  for (let i = 0; i < poses.length; i += 1) {
    // For each pose detected, loop through all the keypoints
    const pose = poses[i].pose;
    for (let j = 0; j < pose.keypoints.length - 12; j += 1) {
      // A keypoint is an object describing a body part (like rightArm or leftShoulder)
      const keypoint = pose.keypoints[j];
      // Only draw an ellipse is the pose probability is bigger than 0.2
      if (keypoint.score > 0.2) {
        fill(255, 99, 71, 1);
        noStroke();
        ellipse(keypoint.position.x, keypoint.position.y, 10, 10);
      }
    }
  }
}
/*
// A function to draw the skeletons
function drawSkeleton() {
  // Loop through all the skeletons detected
  for (let i = 0; i < poses.length; i += 1) {
    const skeleton = poses[i].skeleton;
    // For every skeleton, loop through all body connections
    for (let j = 0; j < skeleton.length; j += 1) {
      const partA = skeleton[j][0];
      const partB = skeleton[j][1];
      stroke(25, 50, 50);
      line(partA.position.x, partA.position.y, partB.position.x, partB.position.y);
    }
  }
}
*/