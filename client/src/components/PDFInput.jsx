import React, { useEffect, useState } from 'react';
import Dropzone from 'dropzone';

import 'dropzone/dist/dropzone.css'; // Import the Dropzone CSS
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Alert, Typography } from '@mui/material';

const PDFInput = () => {
let myDropzone;
const navigate = useNavigate()
const dispatch = useDispatch()

useEffect(() => {
// Initialize Dropzone with options
myDropzone = new Dropzone('#my-dropzone', {
 url: '/EditPDF', // Replace with the actual upload URL
 paramName: 'file', // The name to use for the file upload
 acceptedFiles: '.pdf',
 accept: function (file, done) {
   if (file.size === 0) {
    done('Folder uploads are not allowed. Please select individual files.');
   } else {
    dispatch({ type: "dispatch_data", payload: file })
    navigate('/editor')
    done();
   }
 },
});

// Attach event handlers if needed
myDropzone.on('addedfile', (file) => {
  console.log(`File added: ${file.name}`);
});

// Clean up the Dropzone instance on component unmount
return () => {
 myDropzone.destroy();
};
}, []);

return (
 <div>
    <Alert severity="info"><Typography variant='caption'>
        Click here to select files or Drag files to start editing 
    </Typography> </Alert>
  <form className="dropzone" id="my-dropzone">
  </form>
 </div>
);
};

export default PDFInput;
