import React from 'react';
import {Image} from 'react-native';

export interface ImageProps {
  url: string | number;
  style: {};
}
const ImageComponent: React.FC<ImageProps> = ({url, style}: ImageProps) => {
  if (typeof url === 'number') {
    return <Image source={url} style={style} />;
  } else {
    return <Image source={{uri: url}} style={style} />;
  }
};

export default ImageComponent;
