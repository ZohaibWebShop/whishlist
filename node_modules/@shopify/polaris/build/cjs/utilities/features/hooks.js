'use strict';

var React = require('react');
var context = require('./context.js');

function useFeatures() {
  const features = React.useContext(context.FeaturesContext);
  if (!features) {
    throw new Error('No Features were provided.');
  }
  return features;
}

/**
 * Temporary child render prop for accessing features in class components.
 */
function UseFeatures(props) {
  const features = useFeatures();
  return props.children(features);
}

exports.UseFeatures = UseFeatures;
exports.useFeatures = useFeatures;
