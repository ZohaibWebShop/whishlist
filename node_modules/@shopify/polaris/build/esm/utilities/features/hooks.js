import { useContext } from 'react';
import { FeaturesContext } from './context.js';

function useFeatures() {
  const features = useContext(FeaturesContext);
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

export { UseFeatures, useFeatures };
