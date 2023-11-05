import * as React from 'react';
import useDrivePicker from 'react-google-drive-picker'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';


function App() {
  const [openPicker, authResponse] = useDrivePicker();
  const navigate = useNavigate()
  const dispatch = useDispatch()
  // const customViewsArray = [new google.picker.DocsView()]; // custom view
  const handleOpenPicker = () => {
    openPicker({
      clientId: "935019407967-lo70id2odmnnahp9a7md43d077669inu.apps.googleusercontent.com",
      developerKey: "AIzaSyB-hxB6hOdhIdpWlnWnWk5xpjRsEwG4po0",
      viewId: "DOCS",
      // token: token, // pass oauth token in case you already have one
      showUploadView: true,
      showUploadFolders: true,
      supportDrives: true,
      // customViews: customViewsArray, // custom view
      accept: ['application/pdf'],
      callbackFunction: (data) => {
          const selectedFiles = data.docs || [];
          dispatch({ type: "dispatch_data", payload: selectedFiles })
          navigate('/editor')
      },
    })
  }

  return (
    <>
      <div>
        <button onClick={() => handleOpenPicker()}>Select Files from Drive</button>
      </div>
    </>
  );
}

export default App;