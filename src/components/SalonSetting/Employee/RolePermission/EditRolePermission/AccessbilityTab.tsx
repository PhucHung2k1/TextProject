import { ConfigRoleAndPermission } from '@/common/ConfigRoleAndPermission/ConfigRoleAndPermission';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import { useEffect, useState } from 'react';
import { setAddRemoveMultiRoleIds } from '@/store/customerRole/customerRoleSlice';
import { arrCategory } from '../listCategory';
import { Button, Grid, Stack, Divider } from '@mui/material';

interface AccessbilityTabProps {
  handleCloseDrawer: any;
}
const AccessbilityTab: React.FC<AccessbilityTabProps> = ({
  handleCloseDrawer,
}) => {
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
      <Grid xs={12} item>
        <Divider />
      </Grid>
      <Grid xs={12} item className="mt-4">
        <Stack direction="row" spacing={2}>
          <Grid xs={6} item>
            <Button
              type="submit"
              className="h-12 w-[354px] border-mango-gray-light-3 text-[16px] font-bold capitalize text-mango-text-gray-2 hover:border-mango-gray-light-3 "
              variant="outlined"
              onClick={handleCloseDrawer}
            >
              CANCEL
            </Button>
          </Grid>
          <Grid xs={6} item>
            <Button
              className="flex h-12 w-full cursor-pointer items-center justify-center rounded-[4px] bg-primary-main text-base  font-semibold  uppercase text-white hover:bg-primary-main"
              variant="contained"
              type="submit"
            >
              Save
            </Button>
          </Grid>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default AccessbilityTab;
