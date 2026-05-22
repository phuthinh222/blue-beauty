/* MediaPipe FaceLandmarker 478-point landmark indices */

export const LIPS_OUTER = [
  61, 146, 91, 181, 84, 17, 314, 405, 321, 375,
  291, 409, 270, 269, 267, 0, 37, 39, 40, 185,
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
