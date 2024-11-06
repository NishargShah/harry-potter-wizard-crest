import constants from '@/constants';

import type { Component } from '@/types';

interface ErrorProps {
  message?: string;
}

const Error: Component<ErrorProps> = ({ message }) => <p>{message ?? constants.TECHNICAL_ERROR}</p>;

export default Error;
