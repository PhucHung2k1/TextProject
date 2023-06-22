import { ConfigRoleAndPermission } from '@/common/ConfigRoleAndPermission/ConfigRoleAndPermission';
import { useAppSelector } from '@/store/hook';
import { arrCategory } from './listCategory';

const SetAccessibility = () => {
  const permissionAll = useAppSelector(
    (state) => state.permissionSlice.permissionAll
  );

  return (
    <div className=" w-full overflow-auto pt-8">
      {arrCategory.map((category) => {
        return (
          <ConfigRoleAndPermission
            key={category.name}
            configName={category.title}
            permissionAll={permissionAll[category.name]}
          />
        );
      })}
    </div>
  );
};

export default SetAccessibility;
