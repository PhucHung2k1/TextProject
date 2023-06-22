import { ConfigRoleAndPermission } from '@/common/ConfigRoleAndPermission/ConfigRoleAndPermission';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import { arrCategory } from './listCategory';
import { useEffect, useState } from 'react';
import { setAddRemoveMultiRoleIds } from '@/store/customerRole/customerRoleSlice';

const SetAccessibility = () => {
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
    <div className=" w-full overflow-auto pt-8">
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
    </div>
  );
};

export default SetAccessibility;
