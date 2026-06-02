import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import Button from '../components/Button';
import { getApplicationById } from '../utils/localStorage';

const ViewApplicationPage = () => {
  const { id } = useParams();
  const [application, setApplication] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const app = getApplicationById(id);
    if (app) {
      setApplication(app);
    } else {
      setError('Application not found');
    }
  }, [id]);

  const handlePrint = () => {
    window.print();
  };

  if (error) {
    return (
      <>
        <Header />
        <div className="container-main text-center py-12">
          <p className="text-red-600">Error: {error}</p>
        </div>
      </>
    );
  }

  if (!application) {
    return (
      <>
        <Header />
        <div className="container-main text-center py-12">
          <p>Application not found</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="container-main">
        <div className="mb-6 flex gap-4 no-print">
          <Button onClick={handlePrint} variant="secondary">
            🖨️ Print
          </Button>
        </div>

        {/* Personal Details */}
        <div className="card mb-8">
          <h2 className="text-2xl font-bold mb-6 pb-4 border-b">Personal Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-gray-600 text-sm">Full Name</p>
              <p className="text-lg font-semibold">{application.fullName}</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm">Father Name</p>
              <p className="text-lg font-semibold">{application.fatherName}</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm">Gender</p>
              <p className="text-lg font-semibold">{application.gender}</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm">Date of Birth</p>
              <p className="text-lg font-semibold">{application.dob}</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm">Nationality</p>
              <p className="text-lg font-semibold">{application.nationality}</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm">Religion</p>
              <p className="text-lg font-semibold">{application.religion}</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm">Community</p>
              <p className="text-lg font-semibold">{application.community}</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm">Mobile</p>
              <p className="text-lg font-semibold">{application.mobile}</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm">Email</p>
              <p className="text-lg font-semibold">{application.email}</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm">PAN</p>
              <p className="text-lg font-semibold">{application.pan}</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm">Aadhaar</p>
              <p className="text-lg font-semibold">{application.aadhaar}</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm">Submitted on</p>
              <p className="text-lg font-semibold">{new Date(application.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewApplicationPage;
