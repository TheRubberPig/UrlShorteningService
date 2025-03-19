import React from 'react';

const ResultDisplay = ({ shortUrl }) => {
  if (!shortUrl) {
    return null; // Don't display anything if shortUrl is not available
  }

  return (
    <div>
      URL: {shortUrl}
    </div>
  );
};

export default ResultDisplay;