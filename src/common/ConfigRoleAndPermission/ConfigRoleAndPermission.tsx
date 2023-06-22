import { Checkbox, FormControlLabel } from '@mui/material';
import React, { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import TreeView from '@mui/lab/TreeView';
import TreeItem from '@mui/lab/TreeItem';
import type { IPermissionChild } from '@/services/permission.services/permission.interface';

interface Props {
  configName: string;
  permissionAll: IPermissionChild[];
}
export const ConfigRoleAndPermission = ({
  configName,
  permissionAll,
}: Props) => {
  const [showAll, setShowAll] = useState<boolean>(false);

  return (
    <div className="mb-2">
      <div
        className={` flex items-center justify-between border ${
          showAll ? 'rounded-[5px] rounded-b-none' : 'rounded-[6px]'
        } min-h-[64px] w-full justify-between !border-mango-text-gray-1 bg-white px-4 text-xl font-bold capitalize text-50`}
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
            className="h-8 w-8 cursor-pointer rounded border border-mango-primary-blue bg-mango-primary-blue text-white"
          />
        ) : (
          <RemoveIcon
            onClick={() => setShowAll(!showAll)}
            className="h-8  w-8 cursor-pointer rounded bg-mango-gray-light-1 text-mango-text-gray-2"
          />
        )}
      </div>

      {showAll && (
        <div className=" h-auto w-full rounded-b-[6px] border border-t-0 !border-mango-text-gray-1 bg-white">
          <TreeView>
            {Array.isArray(permissionAll) &&
              permissionAll?.map((item) => (
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
                      control={<Checkbox defaultChecked color="default" />}
                      label={item.Name}
                    />
                  }
                />
              ))}
          </TreeView>
        </div>
      )}
    </div>
  );
};
