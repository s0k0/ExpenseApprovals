import React from 'react';
import { render } from '@testing-library/react';
import ApprovalSchema from './ApprovalSchema';


describe('ApprovalSchema component', () => {

  test('renders empty message when no data', () => {
    const { getByText } = render(<ApprovalSchema />);
    const empty = getByText('No data loaded.');
    expect(empty).toBeInTheDocument();
  });

  //TODO: set mock data and check rendering and edit mode
  
});