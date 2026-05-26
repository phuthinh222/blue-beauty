/* MediaPipe FaceLandmarker 478-point landmark indices */

export const LIPS_OUTER = [
  61, 146, 91, 181, 84, 17, 314, 405, 321, 375,
  291, 409, 270, 269, 267, 0, 37, 39, 40, 185,
];

export const LEFT_EYEBROW  = [276, 283, 282, 295, 285, 336, 296, 334, 293, 300];
export const RIGHT_EYEBROW = [46,  53,  52,  65,  55, 107,  66, 105,  63,  70];

export const FACE_OVAL = [
  10, 338, 297, 332, 284, 251, 389, 356, 454, 323, 361, 288,
  397, 365, 379, 378, 400, 377, 152, 148, 176, 149, 150, 136,
  172, 58, 132, 93, 234, 127, 162, 21, 54, 103, 67, 109,
];

export const LM = {
  lipLeftCorner:  61,
  lipRightCorner: 291,

  leftEyeInner:  133,
  leftEyeOuter:   33,
  leftEyeTop:    159,
  leftBrow:       66,

  rightEyeInner: 362,
  rightEyeOuter: 263,
  rightEyeTop:   386,
  rightBrow:     296,

  /* Skin sampling points */
  foreheadTop:    10,
  foreheadMid:   151,
  leftForehead:  107,
  rightForehead: 336,
  leftCheekMid:  116,
  rightCheekMid: 345,
} as const;

export const SKIN_SAMPLE_INDICES = [
  LM.foreheadTop, LM.foreheadMid, LM.leftForehead, LM.rightForehead,
  LM.leftCheekMid, LM.rightCheekMid,
];
