import React, { useState } from 'react';
import { GrCheckbox } from '@react-icons/all-files/gr/GrCheckbox';
import { GrCheckboxSelected } from '@react-icons/all-files/gr/GrCheckboxSelected';

export type SizeUnit = 'MB' | 'GB' | 'TB';
export interface FileSize {
  value: number;
  unit: SizeUnit;
}

export interface LibraryProps {
  name: string;
  path: string;
  size: FileSize;
}

export default function Library({ name, path, size }: LibraryProps) {
  const [selected, setSelected] = useState(false);

  return (
    <button type="button" onClick={() => setSelected(!selected)}>
      <div className="flex flex-row rounded overflow-hidden transition hover:shadow-md">
        <div className="flex flex-col h-auto text-white items-center justify-center flex-[1.5] bg-blue-600">
          <h1 className="font-semibold text-2xl">{size.value}</h1>
          <h2 className="text-sm font-medium">{size.unit}</h2>
        </div>

        <div className="flex flex-row border border-l-0 flex-[10]">
          <div className="flex-[9] px-6 py-4 text-center">
            <h1 className="text-lg font-semibold">{name}</h1>
            <p className="text-xs text-gray-500">{path}</p>
          </div>

          <div className="flex-[1.5] text-2xl flex flex-col items-center justify-center">
            {selected ? <GrCheckboxSelected /> : <GrCheckbox />}
          </div>
        </div>
      </div>
    </button>
  );
}
