// import React, { useState, useEffect } from 'react';
// // const { Panel } = Collapse;
// // import SwitchBtn from '@/pages/permission/SwitchBtn';
// import List from '@/pages/permission/List';
// import TabsView from '@/pages/permission/TabsView';
// // import Button from '@/pages/permission/Button';
// import CustomForm from '@/pages/permission/CustomForm';
// import { useAppDispatch, useAppSelector } from '@/store/hook';
// import { setPermissionList } from '@/store/permission/permissionSlice';
// import SwitchBtn from './permission/SwitchBtn';

// const initData = [
//   {
//     id: 101,
//     name: 'per 1',
//     value: true,
//   },
//   {
//     id: 102,
//     name: 'per 2',
//     value: true,
//   },
//   {
//     id: 103,
//     name: 'per 3',
//     value: false,
//   },
//   {
//     id: 104,
//     name: 'per 4',
//     value: true,
//   },
//   {
//     id: 105,
//     name: 'per 5',
//     value: true,
//   },
//   {
//     id: 106,
//     name: 'per 6',
//     value: false,
//   },
//   {
//     id: 107,
//     name: 'per 7',
//     value: true,
//   },
//   {
//     id: 108,
//     name: 'per 8',
//     value: false,
//   },
// ];
// function PermissionPage() {
//   const dispatch = useAppDispatch();
//   const { activeTab, permissionList } = useAppSelector(
//     (state) => state.permissionSlice
//   );
//   const [collapseAnchor, setCollapseAnchor] = useState(false);
//   console.log(
//     '🚀 ~ file: permission.tsx:60 ~ PermissionPage ~ collapseAnchor:',
//     collapseAnchor
//   );
//   // const [permissionList, setPermissionList] = useState(initData);
//   useEffect(() => {
//     dispatch(setPermissionList(initData));
//     // dispatch(getAllPermission());
//   }, []);

//   console.log({ activeTab });
//   // eslint-disable-next-line react/no-unstable-nested-components
//   const RenderList = () => {
//     return (
//       <div className="h-full w-full columns-2xs">
//         {permissionList.map((item, index) => {
//           return (
//             <div
//               className="grid grid-flow-col grid-cols-4 border-b-2 border-b-zinc-300"
//               // eslint-disable-next-line react/no-array-index-key
//               key={index}
//             >
//               <div className="col-span-3 items-center">
//                 <h1 className="text-xl font-bold text-blue-500 sm:text-lg ">
//                   Permission {index + 1}
//                 </h1>
//               </div>
//               <div className="col-span-1 h-full w-full">
//                 <SwitchBtn
//                   permissionList={permissionList}
//                   item={item}
//                   setCollapseAnchor={setCollapseAnchor}
//                 />
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     );
//   };

//   return (
//     <div className="bg-white">
//       {/* <header className="absolute inset-x-0 top-0 z-50"></header> */}
//       <div className="relative isolate px-6 lg:px-8">
//         <div className=" mx-auto bg-slate-50 py-32 sm:py-48 lg:py-10">
//           <div className="grid grid-cols-4">
//             <div className="hidden w-64 sm:mb-8 sm:flex">
//               <div className="w-full">
//                 <div className="text-gray-60 h-10 px-3 pt-3 text-sm leading-6">
//                   <h1 className=" font-bold text-gray-900 sm:text-xl ">
//                     Employee
//                   </h1>
//                 </div>
//                 <div className=" border-b-2 border-b-zinc-300" />
//                 <List />
//               </div>
//             </div>
//             <div className="col-span-3 hidden sm:mb-8 sm:flex">
//               <div className=" w-full">
//                 <div className="text-gray-60 relative h-10 px-3 pt-3 text-sm leading-6">
//                   <h1 className=" text-center font-bold tracking-tight text-gray-900 sm:text-xl">
//                     Permission
//                   </h1>
//                 </div>
//                 <div className=" w-full border-b-2 border-b-zinc-300" />
//                 <TabsView
//                   ChildrenComponent={
//                     activeTab === 1000
//                       ? [
//                           // eslint-disable-next-line react/no-unstable-nested-components
//                           () => (
//                             <div className=" px-3">
//                               <CustomForm />
//                             </div>
//                           ),
//                         ]
//                       : [
//                           // eslint-disable-next-line react/no-unstable-nested-components
//                           () => {
//                             return (
//                               <div className=" px-3">
//                                 <RenderList />
//                                 {/* <Button title="buy now" /> */}
//                               </div>
//                             );
//                           },
//                           // eslint-disable-next-line react/no-unstable-nested-components
//                           () => {
//                             return (
//                               <div className=" px-3">
//                                 <RenderList />
//                                 {/* <Button title="buy now" /> */}
//                               </div>
//                             );
//                           },
//                         ]
//                   }
//                 />
//               </div>
//             </div>
//           </div>
//           <div className="text-center">
//             <p className="mt-6 text-lg leading-8 text-gray-600">
//               Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui
//               lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat
//               fugiat aliqua.
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default PermissionPage;
import React from 'react';

const permission = () => {
  return <div>permission</div>;
};

export default permission;
