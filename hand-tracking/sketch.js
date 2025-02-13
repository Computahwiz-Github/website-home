// Hand Pose Drawing with Color Selection 
// https://youtu.be/vfNHdVbE-l4
// https://thecodingtrain.com/tracks/ml5js-beginners-guide/ml5/hand-pose

let video;
let handPose;
let hands = [];
let painting;
let px = 0;
let py = 0;
let h = 8;
let colors = [];
let selectedColor;
let clearCounter = 0;
let selectionCounter = 0;
let canClear = false;
let yellow = 255;
let strokeBlack = `rgb(255, 0, 0)`;
let strokeYellow = `rgb(255, 255, 0)`;
let strokeFlash = true;
let previousX, previousY;
let toolSquare;
let grabSquare;
let squareSelected = false;
let pinchedSquare = false;
let droppedSquare = false;
let grabSquareX, grabSquareY, droppedSquareX, droppedSquareY;
let grabMode, drawMode, morbinTime = false;
let toolSquares = [];
let grabSquares = [];

// TODO: Make 2D, maybe 3D or 4D array/dictionary of clickable/draggable circles/squares with their names, position/location, etc...

function preload() {
  // Initialize HandPose model with flipped video input
  handPose = ml5.handPose({ flipped: true, runtime: "mediapipe" });
}

function mousePressed() {
  // Log detected hand data to the console
  /* console.log(hands); */
  /* console.log(painting.toString()); */
}

function gotHands(results) {
  hands = results;
}

function setup() {
  createCanvas(1920, 1080);
  colorMode(HSB);

  // Create an off-screen graphics buffer for painting
  painting = createGraphics(1920, 1080);
  painting.colorMode(HSB);
  /* painting.show(); */
  painting.clear();

  // Define colors for each finger
  colors = [
    color(197, 82, 95), // Index finger - #2DC5F4
    color(283, 69, 63), // Middle finger - #9253A1
    color(344, 100, 93), // Ring finger - #EC015A
    color(32, 68, 97) // Pinky finger - #F89E4F
  ];
  selectedColor = colors[0];

  video = createCapture(VIDEO, { flipped: true });
  video.size(1920, 1080);
  /* frameRate(30); */
  /* video.style.setProperty("transform", "scale(.5)"); */
  /* video.elt.setAttribute('playsinline', ''); */
  video.hide();
  
  
  // Start detecting hands
  handPose.detectStart(video, gotHands, 1920, 1080);
}

function draw() {
  /* imageMode(CENTER); */
  video.size(1920, 1080);
  image(video, 0, 0);
  
  if (hands.length > 0) {
    let rightHand, leftHand;

    // Separate detected hands into left and right
    for (let hand of hands) {
      if (hand.handedness === "Right") {
        let indexFinger = hand.index_finger_tip;
        let middleFinger = hand.middle_finger_tip;
        let thumb = hand.thumb_tip;
        rightHand = { indexFinger, middleFinger, thumb };
      }
      /* if (hand.handedness === "Left") {
        let thumb = hand.thumb_tip;
        let indexFinger = hand.index_finger_tip;
        let middle = hand.middle_finger_tip;
        let ring = hand.ring_finger_tip;
        let pinky = hand.pinky_finger_tip;
        let fingers = [indexFinger, middle, ring, pinky];

        // Select color based on which finger is near the thumb
        for (let i = 0; i < fingers.length; i++) {
          let finger = fingers[i];
          let pinchDistance = dist(finger.x, finger.y, thumb.x, thumb.y);

          if (pinchDistance < 30) {
            fill(colors[i]);
            noStroke();
            circle(finger.x, finger.y, 36);
            selectedColor = colors[i];
          }
        }
      } */
    }

    /////////////////////////////
    // Draw with right-hand pinch
    if (rightHand) {
      let { indexFinger, middleFinger, thumb } = rightHand;
      let midToThumbCenterX =  ((middleFinger.x * 2 + thumb.x * 2) / 2);
      let midToThumbCenterY = ((middleFinger.y * 2 + thumb.y * 2) / 2);
      let indexToThumbCenterX =  ((indexFinger.x * 2 + thumb.x * 2) / 2);
      let indexToThumbCenterY = ((indexFinger.y * 2 + thumb.y * 2) / 2);

      let indexMidThumbCenterX = (midToThumbCenterX + indexToThumbCenterX) / 2;
      let indexMidThumbCenterY = (midToThumbCenterY + indexToThumbCenterY) / 2;

      ///////////////////////////////////////////
      // Distance between index and thumb fingers
      let indexToThumbPinchDistance = dist(indexFinger.x * 2, indexFinger.y * 2, thumb.x * 2, thumb.y * 2);
      let midToThumbPinchDistance = dist(middleFinger.x * 2, middleFinger.y * 2, thumb.x * 2, thumb.y * 2);
      let indexToMidDistance = dist(indexFinger.x * 2, indexFinger.y * 2, middleFinger.x * 2, middleFinger.y * 2);
      /* let indexMidThumbDistance = dist(indexFinger.x * 2, indexFinger.y * 2, middleFinger.x * 2, middleFinger.y * 2, thumb.x * 2, thumb.y * 2); */

      /////////////////////////////////////////////////////////////////////////////////
      // Showing Tool Change Mode when index and middle fingers are not close to thumb <- OLD MIGHT STILL WANT
      // Currently erasing the dropped grabSquare when hand is open
      if (midToThumbPinchDistance <= 275 && indexToThumbPinchDistance >= 225 && indexToMidDistance >= 225) {
        if (droppedSquare) {
          droppedSquare = false;
          droppedSquareX, droppedSquareY = null;
          console.log("droppedSquare: " + droppedSquare);
          console.log("pinchedSquare: " + pinchedSquare);
          console.log("squareSelected: " + squareSelected);

          if (squareSelected) {
            squareSelected = false;
          }

          if (pinchedSquare) {
            pinchedSquare = false;
          }
        }

        /* console.log("midPinch: " + midToThumbPinchDistance);
        console.log("indexPinch: " + indexToThumbPinchDistance);
        console.log("indexToMidPinch: " + indexToMidPinchDistance); */
      }

      ////////////////////////////////////////////////////
      // Draw circles at center of index and thumb fingers
      circle(indexFinger.x * 2, indexFinger.y * 2, indexToThumbPinchDistance / 4);
      circle(thumb.x * 2, thumb.y * 2, indexToThumbPinchDistance / 4);
      circle(middleFinger.x * 2, middleFinger.y * 2, midToThumbPinchDistance / 4);

      ////////////
      // GUI START
      fill(colors[1]);
      toolSquare = square(1860, 40, 55);
      toolSquare.text("Grab", 1885, 20);
      toolSquare.textAlign(CENTER, CENTER);
      toolSquare.textSize(32);

      // This is what I actually am going to implement for toolbar
      fill(colors[1]);
      toolSquares[0] = square(1775, 40, 55);
      toolSquares[0].text("Draw", 1800, 20);
      toolSquares[0].textAlign(CENTER, CENTER);
      toolSquares[0].textSize(32);

      toolSquares[1] = square(1675, 40, 55);
      toolSquares[1].text("Morb", 1700, 20);
      toolSquares[1].textAlign(CENTER, CENTER);
      toolSquares[1].textSize(32);

      //////////////////////////////////////////////////////////////////////////////
      // Logic for drawing top right toolSquare and time function to draw grabSquare
      if (!squareSelected && indexToThumbPinchDistance > 150) {
        stroke(0);
        /////////////////////////////////////
        // Checks for finger over Grab Square
        if (indexFinger.x * 2 >= 1850 && indexFinger.x * 2 < 1900 && indexFinger.y * 2 >= 40 && indexFinger.y * 2 < 125 
          && !pinchedSquare) {
          // Disable other modes if over grab square
          if (drawMode) {
            drawMode = false;
            if (selectionCounter > 0) {
              selectionCounter = 0;
            }
          }
          else if (morbinTime) {
            morbinTime = false;
            if (selectionCounter > 0) {
              selectionCounter = 0;
            }
          }

          selectionCounter++;
          console.log("Grab Mode Countdown: ", (selectionCounter));

          // Selects Grab Mode after count is 25
          if (selectionCounter >= 25) {
            grabMode = true;
            grabSquareX = 540;
            grabSquareY = 320;
            grabSquare = square(grabSquareX, grabSquareY, 55);
            squareSelected = true;
          }
        }
        /////////////////////////////////////
        // Checks for finger over Draw Square
        else if (indexFinger.x * 2 >= 1755 && indexFinger.x * 2 < 1830 && indexFinger.y * 2 >= 40 && indexFinger.y * 2 < 125 
          && !pinchedSquare) {
          // Disable other modes if over Draw Square
          if (grabMode) {
            grabMode = false;
          }
          else if (morbinTime) {
            morbinTime = false;
          }

          selectionCounter++;
          console.log("Draw Mode Countdown: ", (selectionCounter));

          // Selects Draw Mode after count is 25
          if (selectionCounter >= 25) {
            drawMode = true;
            squareSelected = true;
          }
        }
        ///////////////////////////////////////////
        //Checks for finger over Morbin Time Square
        else if (indexFinger.x * 2 >= 1655 && indexFinger.x * 2 < 1730 && indexFinger.y * 2 >= 40 && indexFinger.y * 2 < 125 
          && !pinchedSquare) {
          // Disable other modes if over Draw Square
          if (drawMode) {
            drawMode = false;
            if (selectionCounter > 0) {
              selectionCounter = 0;
            }
          }
          else if (grabMode) {
            grabMode = false;
            if (selectionCounter > 0) {
              selectionCounter = 0;
            }
          }

          selectionCounter++;
          console.log("Morbin' Time Countdown: ", (selectionCounter));

          // Selects Draw Mode after count is 25
          if (selectionCounter >= 25) {
            morbinTime = true;
            squareSelected = true;
          }
        }
      }
      else if (squareSelected && !pinchedSquare && grabMode) {
        grabSquareX = 540;
        grabSquareY = 320;
        grabSquare = square(grabSquareX, grabSquareY, 55);
      }
      //////////////////////////////////////////////////////////////////////////////////
      // Resets square buttons when square is selected and finger is no longer on square
      else if (squareSelected && !pinchedSquare && !(indexFinger.x * 2 >= 1850 && indexFinger.x * 2 < 1900 && indexFinger.y * 2 >= 40 && indexFinger.y * 2 < 125) 
        && !(indexFinger.x * 2 >= 1755 && indexFinger.x * 2 < 1830 && indexFinger.y * 2 >= 40 && indexFinger.y * 2 < 125) 
        && !(indexFinger.x * 2 >= 1655 && indexFinger.x * 2 < 1730 && indexFinger.y * 2 >= 40 && indexFinger.y * 2 < 125)) {
        selectionCounter = 0;
        console.log("selectionCounter", (selectionCounter));
        console.log("squareSelected", (squareSelected));
        squareSelected = false;
      }

      if (morbinTime) {

      }
      ////////////////////////////////////////////////
      // Draw on the screen with index and thumb pinch
      if (indexToThumbPinchDistance <= 60) {
        if (drawMode) {
          painting.stroke(selectedColor);
          painting.strokeWeight(12);
          painting.line(previousX, previousY, indexToThumbCenterX, indexToThumbCenterY);
          canClear = true;
        }
        else if (grabMode) {
          //////////////////////////////////////////////////////////
          // Grab and move toolSquare by pinching at square location
          if (indexToThumbCenterX >= 480 && indexToThumbCenterX < 720 && indexToThumbCenterY < 540 && !pinchedSquare) {
            stroke(255);
            text('Picking Tool Area', indexToThumbCenterX, indexToThumbCenterY - 50);
            textSize(48);
            textAlign(CENTER, CENTER);
            /* console.log(grabSquare); */
            grabSquare = null;
            grabSquareX = indexToThumbCenterX;
            grabSquareY = indexToThumbCenterY;
            grabSquare = square(grabSquareX, grabSquareY, 55);
            /* console.log(grabSquare); */
            pinchedSquare = true;
          }
          ///////////////////////////////////////////////////////
          // Continue dragging toolSquare outside of initial zone
          else if (pinchedSquare) { 
            grabSquareX = indexToThumbCenterX;
            grabSquareY = indexToThumbCenterY;
            grabSquare = square(grabSquareX, grabSquareY, 55);
          } 
        }
      }

      ///////////////////////////////////////////////////////////
      // Drops square at pinched location if not pinching anymore
      else if (indexToThumbPinchDistance > 200 && midToThumbPinchDistance > 200 && grabMode) {
        if (pinchedSquare && !droppedSquare) {
          droppedSquare = true;
          droppedSquareX = grabSquareX;
          droppedSquareY = grabSquareY;
        }
        if (droppedSquare) {
          /* console.log("droppedSquare: " + droppedSquare); */
          grabSquare = square(droppedSquareX, droppedSquareY, 55);
        }
        pinchedSquare = false;
      }

      /////////////////////////////////////////////////////////////////////////
      // Reset ability to clear painting/screen when not doing open hand method
      else if (indexToThumbPinchDistance < 100 * 2) {
        clearCounter = 0;
        yellow = 255;
      }

      ///////////////////////////////////////////////////////////////////////////////////////////////////////////
      // Clear the painting/screen with open hand if something has been drawn a.k.a. index and thumb were pinched
      else if (indexToThumbPinchDistance >= 100 * 3.5) {
        console.log(clearCounter);
        if (clearCounter === 65 && painting.line != null) {
          fill('rgb(0, 255, 0)');
          stroke(colors[1]);
          strokeWeight(2);
          //circle(centerX, centerY + 140, pinchDistance / 2);
          if (canClear) {
            painting.clear();
            /* background(200); */
            canClear = false;
            yellow = 255;
          }
        }
        // TODO: Make this only activate when all five fingers are open like the left handed conditional statement above
        // Displays text at centerpoint of index and thumb fingers to announce the painting/screen is about to be erased
        else if (canClear) {
          fill(`rgb(${yellow}, 255, 0)`);
          yellow -= 5;
          if (strokeFlash && yellow % 15 === 0) {
            strokeFlash = !strokeFlash;
            stroke(strokeBlack);
          }
          else if (!strokeFlash && yellow % 15 === 0){
            strokeFlash = !strokeFlash;
            stroke(strokeYellow);
          }
          /* strokeWeight(4); */
          //circle(centerX, centerY + 140, pinchDistance / 2);
          text('ERASING', indexToThumbCenterX, indexToThumbCenterY);
          textAlign(CENTER, CENTER);
          clearCounter++;
        }
      }

      /* ///////////////////////////////////////////////////////////////
      // Draw circle at centerpoint between index and thumb positions
      else if (indexToThumbPinchDistance > 35 * 2 && indexToThumbPinchDistance < 90 * 2) {
        fill(colors[1]);
        stroke(0);
        strokeWeight(2);
        circle(indexToThumbCenterX, indexToThumbCenterY, indexToThumbPinchDistance / 4);
      } */

      previousX = indexToThumbCenterX;
      previousY = indexToThumbCenterY;
    }
    else {
      clearCounter = 0;
    }
    /* else if (leftHand) {
      let [indexFinger, middle, ring, pinky] = leftHand;

    } */
  }

  // Overlay painting on top of the video
  /* imageMode(CENTER); */
  image(painting, 0, 0);
}