import React from 'react';
import './ApprovalSchema.css';

class ApprovalSchema extends React.Component {
  constructor(props) {
      super(props)
      this.state = {
        teams: [],
        users: [],
        selectedTeam : {},
      }
      this.handleTeamChange = this.handleTeamChange.bind(this);
  }

  async componentDidMount() {
    //TODO: put this into main app component
    //enable cors via heroku
    const source = 'https://cors-anywhere.herokuapp.com/https://s3-eu-west-1.amazonaws.com/spx-development/contents'
    const users = await fetch(`${source}/users`)
    const teams = await fetch(`${source}/teams`)
    const jsonUsers = await users.json();
    const jsonTeams = await teams.json();
    this.setState({ users: jsonUsers})
    this.setState({ teams: jsonTeams})
  };

  handleTeamChange (team) {
    this.setState({ selectedTeam: team})
  }

  findUserbyId (id) {
    return this.state.users.find( _ => _.id === id) 
  }

  renderApprovalSchema (team) {
    return (
        <div className="approval-schema">
          <h3>Set up approvers</h3>
          <div>Who can approve for team {team.name}?</div>
          <div className="controls">
              <button className="secondary-action" onClick={() => this.handleTeamChange({})}>Cancel</button>  
              <button className="primary-action" onClick={() => this.handleTeamChange({})}>Save Approval Flow</button>
          </div>
        </div>
    )
  }

  renderUserAndApprovers (team) {
    const approversOfTeam = []
    const usersOfTeam = team.users.map( _ => this.findUserbyId(_)).splice(0,3)
    return (
      <React.Fragment>
         <div className="team-title"> 
            Team {team.name} 
             <button className="primary-action" onClick={() => this.handleTeamChange(team)}>Edit Approvals</button>
          </div>
        <div>
            Users: { team.users.length > 3 ? <span className="total-users">(3 out of {team.users.length})</span> : null} 
          { usersOfTeam.map( _ => <ul key={_.id}>{`${_.first_name} ${_.last_name}`}</ul>) }
          </div>
          <div>
          Approvers:
          { approversOfTeam.length > 0 
            ? approversOfTeam.map( _ => <ul key={_.id}>{`${_.first_name} ${_.last_name} `}</ul>) 
            : <ul>No approver yet</ul> }  
        </div>  
      </React.Fragment>
    )
  }

  renderTeam (team) {
    const isSelected = this.state.selectedTeam.name === team.name
    return (
      <div className="team" key={team.name}>
          { isSelected ? this.renderApprovalSchema(team) : this.renderUserAndApprovers(team)}    
      </div>
    )
  }

  render (){
    return (
      <div className="approval-manager">
        { this.state.teams.length ? this.state.teams.map( team => this.renderTeam(team)) : <span> No data loaded.</span> }
      </div>
    );
  }
}

export default ApprovalSchema;
