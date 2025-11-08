import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/header';
import { Form } from './components/form';
import { Topics } from './components/topics';
import { Benefits } from './components/benefits';
import { How } from './components/how';
import { Examples } from './components/examples';
import { FAQ } from './components/faq';
import { Footer } from './components/footer';
import { Results } from './components/result';

export const App: React.FC = () => {
  return (
    <Router>
      <div className="app">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/results" element={<ResultsPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

const HomePage: React.FC = () => {
  return (
    <>
      <Form />
      <Topics />
      <Benefits />
      <How />
      <Examples />
      <FAQ />
    </>
  );
};

const ResultsPage: React.FC = () => {
  return (
    <div className="results-page">
      <Results />
    </div>
  );
};