import NavBar from './NavBar';
import './Styles/Dashboard.css'; 

const Dashboard = () => {
  // This would come from your Redux store in a real implementation
  const userName = "Enock"; 

  return (
    <div className="dashboard-container">
      <NavBar />
      <main className="content-area">
        <h1 className="welcome-header">Welcome back, {userName}!</h1>
        <p className="welcome-text">
          This is your central hub. From here you can explore discussions, join events, and connect with your community.
        </p>
        
        <div className="dashboard-widgets">
            {/* 
              You can add more components here like:
              - A summary of recent notifications.
              - Quick links to the hubs you've joined.
              - A calendar of upcoming events.
            */}
        </div>
      </main>
    </div>
  );
}

export default Dashboard;