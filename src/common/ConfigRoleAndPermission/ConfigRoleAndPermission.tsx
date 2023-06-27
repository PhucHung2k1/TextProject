import { Checkbox, FormControlLabel } from '@mui/material';
import React, { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import TreeView from '@mui/lab/TreeView';
import TreeItem from '@mui/lab/TreeItem';
import type { IPermissionChild } from '@/services/permission.services/permission.interface';
import { sxCheckBox } from '@/utils/helper/styles';

interface Props {
  configName: string;
  permissionAllByName: IPermissionChild[];

  selectedPermissions: string[];
  setSelectedPermissions: Function;
}
export const ConfigRoleAndPermission = ({
  configName,
  permissionAllByName,

  selectedPermissions,
  setSelectedPermissions,
}: Props) => {
  const [showAll, setShowAll] = useState<boolean>(false);
  const handleCheckBox = (idPermission: string) => {
    if (selectedPermissions.includes(idPermission)) {
      const updatedSelectedEmployees = selectedPermissions.filter(
        (id) => id !== idPermission
      );
      setSelectedPermissions(updatedSelectedEmployees);
    } else {
      setSelectedPermissions([...selectedPermissions, idPermission]);
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
                const checked = selectedPermissions.some(
                  (permission) => permission === item.Id
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
                            sx={sxCheckBox}
                            // defaultChecked={checked}
                            checked={checked}
                            onChange={() => handleCheckBox(item.Id)}
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
