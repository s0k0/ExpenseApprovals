import React from 'react';
import axios from "axios";
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

  componentDidMount() {
      this.getData('teams') 
      this.getData('users') 
  };

  getData = (attribute) => {
    axios
      .get(
          //cors enabled: https://cors-anywhere.herokuapp.com/
          `https://cors-anywhere.herokuapp.com/https://s3-eu-west-1.amazonaws.com/spx-development/contents/${attribute}`
      )
      .then(response => {
          this.setState({ [attribute]: response.data })
      })
      .catch(error => {
          console.log(`Error Occured when Fetching ${attribute}`, error.message)
      });
  }

  handleTeamChange (event) {
    const value = event.target.value
    this.setState({ selectedTeam: this.state.teams.find( _ => _.name === value)})
  }

  findUserbyId (id) {
    return this.state.users.find( _ => _.id === id)
  }
  renderTeamSelector () {
    return (
      <React.Fragment>
        <label>Select a team:</label>
        <select 
          className="select-team" 
          value={this.state.selectedTeam} 
          onChange={this.handleTeamChange}>
          { this.state.teams.map( _ => <option key={_.id}>{_.name}</option>) }
      </select>
     </React.Fragment>
    )
  }

  renderTeam (team) {
    const usersOfTeam = team.users.map( _ => this.findUserbyId(_)).splice(0,3)
    return (
      <React.Fragment>
          <h1> Team {team.name}</h1>
          { usersOfTeam.map( _ => <div key={_.id}>{ `${_.first_name} ${_.last_name}`}</div>) }
      </React.Fragment>
    )
  }

  render (){
    const team = this.state.selectedTeam

    return (
      <div className="approval-schema">
        { this.renderTeamSelector() }
        { team.name ? this.renderTeam(team) : null }
      </div>
    );
  }
}

export default ApprovalSchema;
