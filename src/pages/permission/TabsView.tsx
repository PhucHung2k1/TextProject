import * as React from 'react';
import { Tabs, Tab, Box, Typography } from '@mui/material';
import { setActiveTab } from '@/store/permission/permissionSlice';
import { useAppDispatch } from '@/store/hook';
import CollapseCustom from '@/pages/permission/CollapseCustom';

const TabsData = [
  {
    id: 1000,
    title: 'Profile',
  },
  {
    id: 1002,

    title: 'Permissions all',
  },
  {
    id: 1003,
    title: `role's permissions`,
  },
  {
    id: 1004,
    title: 'All roles',
  },
];

type TabsViewProps = {
  ChildrenComponent: Function[];
};

const Aihi = () => {
  return (
    <div className=" h-full w-full">
      <p className=" text-center">Empty</p>
    </div>
  );
};

const TabsView = ({ ChildrenComponent }: TabsViewProps) => {
  const dispatch = useAppDispatch();
  const [value, setValue] = React.useState(TabsData[0].id);
  const ChangeTabFn = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    dispatch(setActiveTab(newValue));
  };
  const RenderedChild = ChildrenComponent[0];
  return (
    <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
      <Tabs value={value} onChange={ChangeTabFn} centered>
        {TabsData.map((_, i) => {
          return (
            <Tab
              label={`${_.title}`}
              key={`${_.id}_id`}
              value={_.id}
              classes={<p>hihi</p>}
            />
          );
        })}
      </Tabs>
      <p>{value}</p>
      {value === 1000 && (
        <Box sx={{ p: 3 }}>
          {RenderedChild && <RenderedChild />}
          {/* <Typography variant="h5">Tab 1 Content</Typography> */}
          <Typography variant="p">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
            finibus odio eget orci bibendum, ac hendrerit mi porta. Nullam
            volutpat libero tempus leo lacinia ornare. In hac habitasse platea
            dictumst. Pellentesque facilisis ex eget vulputate tincidunt.
            Curabitur fringilla ultrices commodo.
          </Typography>
        </Box>
      )}
      {value !== 1000 && (
        <Box sx={{ p: 3 }}>
          {/* <Typography variant="h5">Tab 1 Content</Typography> */}
          {ChildrenComponent.length &&
            ChildrenComponent.map((_, index) => {
              return <CollapseCustom Child={_} />;
            })}
        </Box>
      )}
    </Box>
  );
};

export default TabsView;
