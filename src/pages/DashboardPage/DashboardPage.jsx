import { useState } from 'react';
import './DashboardPage.scss';
import Navigation from '../../components/Navigation/Navigation';


import Main from '../../components/Main/Main';

const DashboardPage = () => {
  const [activeTab, setActiveTab] = useState('users'); 

  

  return (
    <div className="dashboard-container">
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="main">
        <div className="details">
          <Main activeTab={activeTab} /> 
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
