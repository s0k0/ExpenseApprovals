import React from 'react';
import { render } from '@testing-library/react';
import { mount } from 'enzyme'
import ApprovalSchema from './ApprovalSchema';

const users = [
  {
    id: "USR1",
    first_name: "Eugene",
    last_name: "Tran",
    email: "eugene.tran@spendesk.com"
  },
  {
    id: "USR2",
    first_name: "Ralph",
    last_name: "Romero",
    email: "ralph.romero@spendesk.com"
  },
  {
    id: "USR3",
    first_name: "Tiffany",
    last_name: "Frazier",
    email: "tiffany.frazier@spendesk.com"
  },
  {
    id: "USR4",
    first_name: "Sandra",
    last_name: "Reed",
    email: "sandra.reed@spendesk.com"
  },
  {
    id: "USR5",
    first_name: "Jason",
    last_name: "Casey",
    email: "jason.casey@spendesk.com"
  },
  {
    id: "USR6",
    first_name: "Stacy",
    last_name: "Smith",
    email: "stacy.smith@spendesk.com"
  },
  {
    id: "USR7",
    first_name: "Andy",
    last_name: "Bishop",
    email: "andy.bishop@spendesk.com"
  }
]


const teams = [
  {
    id: "TEAM1",
    name: "Marketing",
    users: [
      "USR1",
      "USR3"
    ],
    approvals: []
  },
  {
    id: "TEAM2",
    name: "Product & Engineering",
    users: [
      "USR2",
      "USR4",
      "USR5",
      "USR6",
      "USR7"
    ],
    approvals: []
  }
]

describe('ApprovalSchema component', () => {

  test('renders empty message when no data', () => {
    const { getByText } = render(<ApprovalSchema />);
    const empty = getByText('No data loaded.');
    expect(empty).toBeInTheDocument();
  });

  //TODO: mock state and edit approvals
 /*  test('renders component when data set', () => {
    const wrapper = mount(<ApprovalSchema />);
    wrapper.setState({ user: users });
    wrapper.setState({ teams: teams });
  }); */

});