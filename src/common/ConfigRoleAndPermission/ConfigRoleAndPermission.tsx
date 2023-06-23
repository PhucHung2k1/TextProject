import { Checkbox, FormControlLabel } from '@mui/material';
import React, { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import TreeView from '@mui/lab/TreeView';
import TreeItem from '@mui/lab/TreeItem';
import type { IPermissionChild } from '@/services/permission.services/permission.interface';
import { useAppSelector } from '@/store/hook';

interface Props {
  configName: string;
  permissionAllByName: IPermissionChild[];
  setListAddedPermissions: Function;
  setListRemovedPermissions: Function;
}
export const ConfigRoleAndPermission = ({
  configName,
  permissionAllByName,
  setListAddedPermissions,
  setListRemovedPermissions,
}: Props) => {
  const listPermissionCustomByIdRedux = useAppSelector(
    (state) => state.customerRoleSlice.listPermissionCustomById
  );

  const [showAll, setShowAll] = useState<boolean>(false);
  const handleCheckBox = (value: boolean, id: string) => {
    const checkExist = listPermissionCustomByIdRedux.some(
      (item) => item.Id === id
    );

    if (!checkExist) {
      if (value) {
        setListAddedPermissions((prev: any) => [...prev, id]);
      } else {
        setListAddedPermissions((prev: any) =>
          prev.filter((item: string) => item !== id)
        );
      }
    } else if (value) {
      setListRemovedPermissions((prev: any) => [...prev, id]);
    } else {
      setListRemovedPermissions((prev: any) =>
        prev.filter((item: string) => item !== id)
      );
    }
  };
  return (
    <div className="mb-2">
      <div
        className={` flex items-center justify-between border ${
          showAll ? 'rounded-[5px] rounded-b-none' : 'rounded-[6px]'
        } min-h-[64px] w-full justify-between !border-border-light bg-white px-4 text-xl font-bold capitalize text-50`}
      >
        <div className="px-4">
          <FormControlLabel
            // control={<Switch />}
            control={<div />}
            label={<p className=" text-base font-bold">{configName}</p>}
          />
        </div>

        {!showAll ? (
          <AddIcon
            onClick={() => setShowAll(!showAll)}
            className="h-8 w-8 cursor-pointer rounded border border-cyan-50 bg-cyan-50 text-text-primary-dark"
          />
        ) : (
          <RemoveIcon
            onClick={() => setShowAll(!showAll)}
            className="h-8 w-8 cursor-pointer rounded border-cyan-50 bg-cyan-50 text-text-primary-dark"
          />
        )}
      </div>

      {showAll && (
        <div className=" h-auto w-full rounded-b-[6px] border border-t-0 !border-mango-text-gray-1 bg-white">
          <TreeView>
            {Array.isArray(permissionAllByName) &&
              permissionAllByName?.map((item) => {
                const checked = listPermissionCustomByIdRedux.some(
                  (permission) => permission.Id === item.Id
                );

                return (
                  <TreeItem
                    key={item.Id}
                    nodeId={item.Id}
                    label={
                      <FormControlLabel
                        sx={{
                          '&.MuiCheckbox-root': {
                            color: '#404044',
                            background: '#404044',
                          },
                          '&.Mui-checked': {
                            color: '#404044',
                          },
                        }}
                        control={
                          <Checkbox
                            color="default"
                            defaultChecked={checked}
                            // checked={checked}
                            onChange={(e) =>
                              handleCheckBox(e.target.checked, item.Id)
                            }
                          />
                        }
                        label={item.Name}
                      />
                    }
                  />
                );
              })}
          </TreeView>
        </div>
      )}
    </div>
  );
};
