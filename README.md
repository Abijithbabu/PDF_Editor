# PDF_Editor
React application that allows users to upload a PDF file and re-arrange or extract certain pages from the PDF to create a new PDF.
Site live at : https://pdf-editor-murex.vercel.app/
(live site is facing some issuses with storing files, may be restrictions from hosted platform) 

--> How to start ?
create a new folder and open git from terminal or bash
then paste this command "git clone https://github.com/Abijithbabu/PDF_Editor.git"
now project is cloned to your system

-->Installing Dependencies
from terminal navigate to client
  $ cd ./client/
  $ yarn 
  $ yarn run dev
now your client is running in port 5173, now navigate to server
  $ cd ./server/
  $ yarn 
  $ yarn start
Hurray, now open browser "http://localhost:5173/" to use the app.
note : if installation failed with yarn you can do with npm 
  $ npm i
  $ npm start for server 
  $ npm run dev for client

![image](https://github.com/Abijithbabu/PDF_Editor/assets/109859615/2e8d88a0-29f2-4bf5-b6f7-d77754dd0d57)
This is the landing page of Application where you can add new files or select from your previous works.

![image](https://github.com/Abijithbabu/PDF_Editor/assets/109859615/6b5965b9-552d-46ff-93c8-b6ce8e314840)
This app is protected with authentication, you can login to it from login button on side navbar, it also supports google login.

![image](https://github.com/Abijithbabu/PDF_Editor/assets/109859615/7135fd09-eeb2-436a-b204-2767adee9274)
Editor allows you to click and remove or drag and drop pages from workspace to bin and vice versa or inside workspace to re-arrange.
also you can see the preview of each page on the right side.

![image](https://github.com/Abijithbabu/PDF_Editor/assets/109859615/599977f9-890c-485e-b3cc-c6a61864a87c)
After editing, click on the export button to generate pdf with name you prefer.

![image](https://github.com/Abijithbabu/PDF_Editor/assets/109859615/a5a9da43-4a34-464c-8411-e06562df55bb)
Here you can see all your files, by clicking you can either view or edit that pdf
