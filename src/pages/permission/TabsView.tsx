// import * as React from 'react';

// const Aihi = () => {
//   return (
//     <div className=" h-full w-full">
//       <p className=" text-center">Empty</p>
//     </div>
//   );
// };

// const TabsView = ({ ChildrenComponent }: TabsViewProps) => {
//   const dispatch = useAppDispatch();
//   const [value, setValue] = React.useState(TabsData?.[0]?.id);
//   const ChangeTabFn = (event: React.SyntheticEvent, newValue: number) => {
//     console.log('🚀 ~ file: TabsView.tsx:43 ~ ChangeTabFn ~ event:', event);
//     setValue(newValue);
//     dispatch(setActiveTab(newValue));
//   };
//   const RenderedChild = ChildrenComponent[0];
//   return (
//     <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
//       <Tabs value={value} onChange={ChangeTabFn} centered>
//         {TabsData.map((_, i) => {
//           console.log('🚀 ~ file: TabsView.tsx:51 ~ {TabsData.map ~ i:', i);
//           return (
//             <Tab
//               label={`${_.title}`}
//               key={`${_.id}_id`}
//               value={_.id}
//               classes={<p>hihi</p>}
//             />
//           );
//         })}
//       </Tabs>
//       <p>{value}</p>
//       {value === 1000 && (
//         <Box sx={{ p: 3 }}>
//           {RenderedChild && <RenderedChild />}
//           {/* <Typography variant="h5">Tab 1 Content</Typography> */}
//           <Typography>
//             Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
//             finibus odio eget orci bibendum, ac hendrerit mi porta. Nullam
//             volutpat libero tempus leo lacinia ornare. In hac habitasse platea
//             dictumst. Pellentesque facilisis ex eget vulputate tincidunt.
//             Curabitur fringilla ultrices commodo.
//           </Typography>
//         </Box>
//       )}
//       {value !== 1000 && (
//         <Box sx={{ p: 3 }}>
//           {/* <Typography variant="h5">Tab 1 Content</Typography> */}
//           {ChildrenComponent.length &&
//             ChildrenComponent.map((_, index) => {
//               console.log(
//                 '🚀 ~ file: TabsView.tsx:81 ~ {TabsData.map ~ index:',
//                 index
//               );
//               // eslint-disable-next-line react/no-array-index-key
//               return <CollapseCustom Child={_} key={index} />;
//             })}
//         </Box>
//       )}
//     </Box>
//   );
// };

// export default TabsView;
import React from 'react';

const TabsView = () => {
  return <div>TabsView</div>;
};

export default TabsView;
