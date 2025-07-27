import React, { useState } from 'react';
import { Card, Input, Button, Menubar, MenubarMenu, MenubarTrigger } from './ui';

const Dashboard = () => {
  const [articles, setArticles] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [formData, setFormData] = useState({
    email: '',
    headline: '',
    summary: '',
    investmentTip: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    setArticles([...articles, formData]);
    setFormData({ email: '', headline: '', summary: '', investmentTip: '' });
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-1/4 bg-gray-100 p-4">
        <h2 className="text-lg font-bold mb-4">Your Articles</h2>
        <ul>
          {articles.map((article, index) => (
            <li
              key={index}
              className="cursor-pointer hover:bg-gray-200 p-2 rounded"
              onClick={() => setSelectedArticle(article)}
            >
              {article.headline}
            </li>
          ))}
        </ul>
      </div>

      {/* Main Content */}
      <div className="w-3/4 p-4">
        {selectedArticle ? (
          <div>
            <h2 className="text-xl font-bold mb-2">{selectedArticle.headline}</h2>
            <p className="mb-4">{selectedArticle.summary}</p>
            <p className="italic">Investment Tip: {selectedArticle.investmentTip}</p>
          </div>
        ) : (
          <div>
            <h2 className="text-lg font-bold mb-4">Add New Article</h2>
            <div className="space-y-4">
              <Input
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Your Email"
              />
              <Input
                name="headline"
                value={formData.headline}
                onChange={handleInputChange}
                placeholder="Headline"
              />
              <Input
                name="summary"
                value={formData.summary}
                onChange={handleInputChange}
                placeholder="Summary"
              />
              <Input
                name="investmentTip"
                value={formData.investmentTip}
                onChange={handleInputChange}
                placeholder="Investment Tip"
              />
              <Button onClick={handleSubmit}>Submit</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
