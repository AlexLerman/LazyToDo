'use strict';

import React, {
    Navigator
} from 'react-native';

const buildStyleInterpolator = require('buildStyleInterpolator');

// var NoTransition = {
//     opacity: {
//         from: 1,
//         to: 1,
//         min: 1,
//         max: 1,
//         type: 'linear',
//         extrapolate: false,
//         round: 100
//     }
// };

var NoTransition = {
  opacity: {
    value: 1.0,
    type: 'constant',
  }
};

const Transitions = {
    none: {
        ...Navigator.SceneConfigs.FadeAndroid,
        gestures: null,
        defaultTransitionVelocity: 1000,
        animationInterpolators: {
            into: buildStyleInterpolator(NoTransition),
            out: buildStyleInterpolator(NoTransition)
        }
    }
};

export default Transitions;
