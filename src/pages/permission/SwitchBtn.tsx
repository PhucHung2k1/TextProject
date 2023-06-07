import React from 'react';
import type { PermissionItem } from '@/services/permission.services/permission.interface';
import { useAppDispatch } from '@/store/hook';
import { setPermissionList } from '@/store/permission/permissionSlice';
import { Switch } from '@mui/material';
import Cookies from 'js-cookie';

type swProps = {
  permissionList: PermissionItem[];
  item: PermissionItem;
  setCollapseAnchor: Function;
};

const SwitchBtn = ({ permissionList, item, setCollapseAnchor }: swProps) => {
  const dispatch = useAppDispatch();
  const onChange = (checked: boolean) => {
    const newList = permissionList.map((ele: PermissionItem) => {
      if (ele.name === item.name) return { ...item, value: checked };
      return ele;
    });
    setCollapseAnchor(true);
    dispatch(setPermissionList(newList));
    Cookies.set('permissionList', JSON.stringify(newList));
  };
  return (
    <div className="flex h-full w-full items-center justify-end">
      <Switch
        edge="end"
        onChange={() => onChange(!item.value)}
        checked={item.value}
        inputProps={{
          'aria-labelledby': 'switch-list-label-bluetooth',
        }}
      />
    </div>
  );
};

export default SwitchBtn;
