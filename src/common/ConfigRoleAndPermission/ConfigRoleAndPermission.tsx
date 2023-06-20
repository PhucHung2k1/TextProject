import { Button, Checkbox, FormControlLabel, Switch } from '@mui/material';
import React, { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import TreeView from '@mui/lab/TreeView';
import TreeItem from '@mui/lab/TreeItem';

interface Props {
  typeConfig: string;
  configName: string;
}
export const ConfigRoleAndPermission = ({ typeConfig, configName }: Props) => {
  const [showAll, setShowAll] = useState<boolean>(false);
  return (
    <div className="mb-2">
      <div
        className={` flex items-center justify-between border ${
          showAll ? 'rounded-[5px] rounded-b-none' : 'rounded-[6px]'
        } min-h-[64px] w-full justify-between !border-mango-text-gray-1 bg-white px-4 text-xl font-bold capitalize text-50`}
      >
        <div>
          <FormControlLabel
            control={<Switch />}
            label={<p className=" text-base font-bold">{configName}</p>}
          />
        </div>

        <Button
          onClick={() => setShowAll(!showAll)}
          endIcon={
            !showAll ? (
              <AddIcon className="h-8 w-8 rounded border border-mango-primary-blue bg-mango-primary-blue text-white" />
            ) : (
              <RemoveIcon className="h-8 w-8 rounded bg-mango-gray-light-1 text-mango-text-gray-2" />
            )
          }
          aria-valuetext={typeConfig}
        />
      </div>

      {showAll && (
        <div className=" h-auto w-full rounded-b-[6px] border border-t-0 !border-mango-text-gray-1 bg-white p-4">
          <TreeView>
            <TreeItem
              nodeId="1"
              label={
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label="Label"
                />
              }
            />
            <TreeItem
              nodeId="1"
              label={
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label="Label"
                />
              }
            >
              <TreeItem
                nodeId="2"
                label={
                  <FormControlLabel
                    control={<Checkbox defaultChecked />}
                    label="Label"
                  />
                }
              />
            </TreeItem>
            <TreeItem
              nodeId="1"
              label={
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label="Label"
                />
              }
            >
              <TreeItem
                nodeId="2"
                label={
                  <FormControlLabel
                    control={<Checkbox defaultChecked />}
                    label="Label"
                  />
                }
              />
            </TreeItem>
          </TreeView>
        </div>
      )}
    </div>
  );
};
