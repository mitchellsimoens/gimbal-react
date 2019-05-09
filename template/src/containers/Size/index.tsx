import React from 'react';
import Table from '../../components/Table';
import { Attributes } from '../../../typings';

const Size = ({ data }: Attributes) => <Table data={data} labelText="File" valueText="Size" />;

export default Size;
