import * as posenet from '@tensorflow-models/posenet';
// import * as tf from '@tensorflow/tfjs';
import * as tf from '@tensorflow/tfjs-core';
import '@tensorflow/tfjs-backend-wasm';
import {setWasmPaths} from '@tensorflow/tfjs-backend-wasm';
// import '@tensorflow/tfjs-backend-webgl';
import React from 'react';
import Webcam from 'react-webcam';
import Script from 'next/script';
import { drawKeypoints, drawSkeleton } from './../components/tsUtils';

export default function App(props) {
  const webcamRef = React.useRef(null);
  const canvasRef = React.useRef(null);

  function updateCounter(counter) {
    fetch('/api/counter', {
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify({
        count: counter,
      }),
    })
      .then((res) => res.json())
    // .then((res) => console.log(res))
  }

  const detectWebcamFeed = async () => {
    tf.engine().startScope()
    const posenet_model = await posenet.load({
      inputResolution: { width: 640, height: 480 },
      scale: 0.9,
    });
    if (
      typeof webcamRef.current !== 'undefined' &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
      && tf.memory().numTensors < 100
    ) {
      // Get Video Properties
      let video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;
      // Set video width
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;
      // Make Estimation
      posenet_model.estimateMultiplePoses(video, {
        flipHorizontal: false,
        maxDetections: 5,
        maxPoses: 2,
        scoreThreshold: 0.9,
        nmsRadius: 20
      })
        .then((res) => drawResult(res, video, videoWidth, videoHeight, canvasRef))
        .then(tf.dispose(posenet_model))
    } else tf.dispose(posenet_model)
    tf.dispose(posenet_model)
    tf.disposeVariables()
    tf.engine().endScope()
    // console.log('Tensors afters:', tf.memory().numTensors)
    // console.log('Memory:', window.performance.memory.totalJSHeapSize)
  };

  const runPosenet = async () => {
    const usePlatformFetch = true;
    setWasmPaths('/wasm/', usePlatformFetch)
    await tf.setBackend('wasm')
    setInterval(() => {
      detectWebcamFeed();
    }, 5000);
  };
  runPosenet();

  const drawResult = async (pose, video, videoWidth, videoHeight, canvas) => {
    const ctx = canvas.current.getContext('2d');
    canvas.current.width = videoWidth;
    canvas.current.height = videoHeight;
    for (let i = 0; i < pose.length; i++) {
      drawKeypoints(pose[i]['keypoints'], 0.6, ctx);
      drawSkeleton(pose[i]['keypoints'], 0.7, ctx);
    }
    updateCounter(pose.length)
    props.updateCounterget(pose.length)
    tf.dispose(pose)
    pose = null,
      video = null,
      videoWidth = null,
      videoHeight = null
    canvas = null
    // ctx.clearRect(0, 0, canvas.width, canvas.height);
  };
  return (
    <div className="App">
      <Script src="https://unpkg.com/ml5@0.1.1/dist/ml5.min.js" />
      <header className="App-header">
        <Webcam
          ref={webcamRef}
          style={{
            position: 'absolute',
            marginLeft: 'auto',
            marginRight: 'auto',
            left: 0,
            right: 0,
            textAlign: 'center',
            zindex: 9,
            width: 640,
            height: 480,
          }}
        />
        <canvas
          ref={canvasRef}
          style={{
            position: 'absolute',
            marginLeft: 'auto',
            marginRight: 'auto',
            left: 0,
            right: 0,
            textAlign: 'center',
            zindex: 9,
            width: 640,
            height: 480,
          }}
        />
      </header>
    </div>
  );
}
