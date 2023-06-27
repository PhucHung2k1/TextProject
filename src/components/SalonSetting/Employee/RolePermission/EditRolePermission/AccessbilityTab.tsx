import { ConfigRoleAndPermission } from '@/common/ConfigRoleAndPermission/ConfigRoleAndPermission';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import { useEffect, useState } from 'react';
import { setAddRemoveMultiRoleIds } from '@/store/customerRole/customerRoleSlice';
import { arrCategory } from '../listCategory';
import { Grid } from '@mui/material';

const AccessabilityTab = () => {
  const dispatch = useAppDispatch();

  const [listAddedPermissions, setListAddedPermissions] = useState<string[]>(
    []
  );
  const [listRemovedPermissions, setListRemovedPermissions] = useState<
    string[]
  >([]);

  const permissionAll = useAppSelector(
    (state) => state.permissionSlice.permissionAll
  );

  useEffect(() => {
    dispatch(
      setAddRemoveMultiRoleIds({
        AddedPermissions: listAddedPermissions,
        RemovedPermissions: listRemovedPermissions,
      })
    );
  }, [
    JSON.stringify(listAddedPermissions),
    JSON.stringify(listRemovedPermissions),
  ]);

  return (
    <Grid container spacing={2} className=" mt-4 bg-white">
      <Grid xs={12} item>
        {arrCategory.map((category) => {
          return (
            <ConfigRoleAndPermission
              key={category.name}
              configName={category.title}
              permissionAllByName={permissionAll[category.name]}
              setListAddedPermissions={setListAddedPermissions}
              setListRemovedPermissions={setListRemovedPermissions}
            />
          );
        })}
      </Grid>
    </Grid>
  );
};

export default AccessabilityTab;
