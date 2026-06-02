import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Button from '../components/Button';
import { getAllApplications, deleteApplication } from '../utils/localStorage';

const HomePage = () => {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const apps = getAllApplications();
    setApplications(apps);
  }, []);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this application?')) {
      deleteApplication(id);
      setApplications(getAllApplications());
      alert('Application deleted successfully');
    }
  };

  return (
    <>
      <Header />
      <div className="container-main">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Applications</h1>
          <Link to="/new-application">
            <Button type="button" variant="success">
              + New Application
            </Button>
          </Link>
        </div>

        {applications.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 mb-4">No applications yet.</p>
            <Link to="/new-application">
              <Button type="button" variant="primary">
                Create Your First Application
              </Button>
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-lg shadow">
              <thead className="bg-gray-100 border-b">
                <tr>
                  <th className="p-4 text-left font-semibold">Name</th>
                  <th className="p-4 text-left font-semibold">Email</th>
                  <th className="p-4 text-left font-semibold">Mobile</th>
                  <th className="p-4 text-left font-semibold">Date</th>
                  <th className="p-4 text-left font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {applications.map((app) => (
                  <tr key={app.id} className="border-b hover:bg-gray-50">
                    <td className="p-4 font-semibold">{app.fullName}</td>
                    <td className="p-4">{app.email}</td>
                    <td className="p-4">{app.mobile}</td>
                    <td className="p-4">{new Date(app.createdAt).toLocaleDateString()}</td>
                    <td className="p-4 flex gap-2">
                      <Link to={`/view-application/${app.id}`}>
                        <Button type="button" variant="secondary" className="text-sm px-3 py-1">
                          View
                        </Button>
                      </Link>
                      <button
                        onClick={() => handleDelete(app.id)}
                        className="btn-danger text-sm px-3 py-1"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
};

export default HomePage;
