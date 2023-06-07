import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';
import WorkIcon from '@mui/icons-material/Work';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';

const data = [
  {
    title: 'Person 1',
    icon: <ImageIcon />,
    name: 'harry potter',
    nickName: 'potter',
  },
  {
    title: 'Person 2',
    icon: <WorkIcon />,
    name: 'harry kane',
    nickName: 'kane',
  },
  {
    title: 'Person 3',
    icon: <ImageIcon />,
    name: 'harry maguire',
    nickName: 'maguire',
  },
  {
    title: 'Person 4',
    icon: <BeachAccessIcon />,
    name: 'Hermione Granger',
    nickName: 'Granger',
  },
];

function ListView() {
  return (
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      {data.map((item, index) => (
        <ListItem key={`${item.title}${index}`}>
          <ListItemAvatar>
            <Avatar>{item.icon}</Avatar>
          </ListItemAvatar>
          <ListItemText primary={`${item.name}`} secondary={item.nickName} />
        </ListItem>
      ))}
    </List>
  );
}
export default ListView;
