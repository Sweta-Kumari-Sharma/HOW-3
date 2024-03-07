declare module 'react-image-magnify' {
    import React from 'react';
  
    export interface ReactImageMagnifyProps {
      smallImage: {
        alt: string;
        src: string;
        isFluidWidth?: boolean;
        width?: number;
        height?: number;
      };
      largeImage: {
        src: string;
        width?: number;
        height?: number;
      };
      isHintEnabled?: boolean;
    }
  
    const ReactImageMagnify: React.FC<ReactImageMagnifyProps>;
  
    export default ReactImageMagnify;
  }
  