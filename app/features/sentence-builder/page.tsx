import React from 'react';
import SentenceBuilder from './components/SentenceBuilder';

const SentenceBuilderPage = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Sentence Builder</h1>
      <SentenceBuilder />
    </div>
  );
};

export default SentenceBuilderPage;
