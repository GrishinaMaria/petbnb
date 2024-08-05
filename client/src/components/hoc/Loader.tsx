import React from 'react';
import Spinner from '../../widgets/Spinner';

export default function Loader({ children, isLoading }) {
  return isLoading ? <Spinner /> : children;
}
