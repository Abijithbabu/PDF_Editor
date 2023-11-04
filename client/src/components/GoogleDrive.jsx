import  { useEffect } from 'react';
import useDrivePicker from 'react-google-drive-picker'


function App() {
  const [openPicker, authResponse] = useDrivePicker();  
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
      multiselect: true,
      // customViews: customViewsArray, // custom view
      callbackFunction: (data) => {
        if (data.action === 'cancel') {
          console.log('User clicked cancel/close button')
        }
        console.log(data)
      },
    })
  }

useEffect(() => {
    console.log(window.location.protocol + '//' + window.location.host)
    handleOpenPicker()
}, [])
  
  return (
    <>

    </>
  );
}

export default App;