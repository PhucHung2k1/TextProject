import { ConfigRoleAndPermission } from '@/common/ConfigRoleAndPermission/ConfigRoleAndPermission';
import { useAppSelector } from '@/store/hook';
import { arrCategory } from './listCategory';
import { useState } from 'react';
import type { IAddRemoveMultiRole } from '@/services/customerRole.service/customerRole.interface';

const SetAccessibility = () => {
  const [listPermission, setListPermission] = useState<IAddRemoveMultiRole>({
    AddedPermissions: [],
    RemovedPermissions: [],
  });

  const permissionAll = useAppSelector(
    (state) => state.permissionSlice.permissionAll
  );
  console.log('listPermission', listPermission);

  return (
    <div className=" w-full overflow-auto pt-8">
      {arrCategory.map((category) => {
        return (
          <ConfigRoleAndPermission
            key={category.name}
            configName={category.title}
            permissionAll={permissionAll[category.name]}
            setListPermission={setListPermission}
          />
        );
      })}
    </div>
  );
};

export default SetAccessibility;
