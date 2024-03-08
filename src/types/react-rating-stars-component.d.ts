declare module 'react-rating-stars-component' {
    import React from 'react';
  
    export interface RatingProps {
      value: number;
      count?: number;
      size?: number;
      edit?: boolean;
      activeColor?: string;
      onChange?: (newValue: number) => void;
    }
  
    const Rating: React.FC<RatingProps>;
  
    export default Rating;
  }
  