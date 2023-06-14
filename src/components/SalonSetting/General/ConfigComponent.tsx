import { Button } from '@mui/material';
import React, { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

interface Props {
  typeConfig: string;
  configName: string;
}
export const ConfigComponent = ({ typeConfig, configName }: Props) => {
  const [showAll, setShowAll] = useState<boolean>(false);
  return (
    <div className="mb-2">
      <Button
        variant="outlined"
        onClick={() => setShowAll(!showAll)}
        endIcon={
          !showAll ? (
            <AddIcon className="h-8 w-8 rounded border border-mango-primary-blue bg-mango-primary-blue text-white" />
          ) : (
            <RemoveIcon className="h-8 w-8 rounded bg-mango-gray-light-1 text-mango-text-gray-2" />
          )
        }
        aria-valuetext={typeConfig}
        className={`cursor-pointer border ${
          showAll ? 'rounded-[5px] rounded-b-none' : 'rounded-[6px]'
        } min-h-[64px] w-full justify-between !border-mango-text-gray-1 bg-white text-xl font-bold capitalize text-50`}
      >
        {configName}
      </Button>
      {showAll && (
        <div className=" h-auto w-full rounded-b-[6px] border border-t-0 !border-mango-text-gray-1 bg-white p-4">
          Content {configName}
        </div>
      )}
    </div>
  );
};
