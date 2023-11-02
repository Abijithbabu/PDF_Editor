
import { AddToDrive, BorderStyle, Dashboard, Logout, PictureAsPdf } from "@mui/icons-material";

export const items = [
  {
    title: 'Dashboard',
    path: '/',
    icon: <Dashboard/>
  },
  {
    title: 'Editor',
    path: '/EditPDF',
    icon: <BorderStyle/>
  },
  {
    title: 'My Files',
    path: '/files',
    icon: <PictureAsPdf/>
  },
  {
    title: 'Drive',
    path: '/drive',
    icon: <AddToDrive/>
  },
  {
    title: 'Logout',
    path: '/logout',
    icon: <Logout/>
  }
];