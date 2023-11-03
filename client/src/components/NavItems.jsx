
import { AddToDrive, BorderStyle, Dashboard, PictureAsPdf } from "@mui/icons-material";

export const items = [
  {
    title: 'Dashboard',
    path: '/',
    icon: <Dashboard/>
  },
  {
    title: 'Editor',
    path: '/editor',
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
];