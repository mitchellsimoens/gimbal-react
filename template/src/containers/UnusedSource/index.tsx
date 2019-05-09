import React from 'react';
import Table from '../../components/Table';
import { Attributes } from '../../../typings';

const UnusedSource = ({ data }: Attributes) => <Table data={data} labelText="File" valueText="% Unused" />;

export default UnusedSource;
