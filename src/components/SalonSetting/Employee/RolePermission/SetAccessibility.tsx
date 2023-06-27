import { ConfigRoleAndPermission } from '@/common/ConfigRoleAndPermission/ConfigRoleAndPermission';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import { arrCategory } from './listCategory';
import { useEffect, useState } from 'react';
import { setAddRemoveMultiRoleIds } from '@/store/customerRole/customerRoleSlice';
import { Box } from '@mui/material';

const SetAccessibility = () => {
  const dispatch = useAppDispatch();

  const [listRemovedPermissions, setListRemovedPermissions] = useState<
    string[]
  >([]);
  const listPermissionCustomByIdRedux = useAppSelector(
    (state) => state.customerRoleSlice.listPermissionCustomById
  ).map((permission) => permission.Id);
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>(
    listPermissionCustomByIdRedux
  );
  const permissionAll = useAppSelector(
    (state) => state.permissionSlice.permissionAll
  );

  useEffect(() => {
    // Set Payload for add remove to redux
    const removeListId = listPermissionCustomByIdRedux.filter(
      (item) => !selectedPermissions.includes(item)
    );
    setListRemovedPermissions(removeListId);
    dispatch(
      setAddRemoveMultiRoleIds({
        AddedPermissions: selectedPermissions,
        RemovedPermissions: listRemovedPermissions,
      })
    );
  }, [
    JSON.stringify(selectedPermissions),
    JSON.stringify(listRemovedPermissions),
  ]);

  return (
    <Box className="h-full w-full">
      {arrCategory.map((category) => {
        return (
          <ConfigRoleAndPermission
            key={category.name}
            configName={category.title}
            permissionAllByName={permissionAll[category.name]}
            selectedPermissions={selectedPermissions}
            setSelectedPermissions={setSelectedPermissions}
          />
        );
      })}
    </Box>
  );
};

export default SetAccessibility;
