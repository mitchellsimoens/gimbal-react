import React, { Context, createContext, useState } from 'react';
import report from '../data/gimbal.json';

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
const DataContext: Context<any> = createContext([{}, Function])

export const DataProvider = ({ children }: { children?: React.ReactNode }) => {
  const [data] = useState(report);

  return <DataContext.Provider value={data}>{children}</DataContext.Provider>
};

export default DataContext;
