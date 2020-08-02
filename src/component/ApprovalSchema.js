import React from 'react';
import './ApprovalSchema.css';

class ApprovalSchema extends React.Component {
  constructor(props) {
      super(props)
      this.state = {
        teams: [],
        users: [],
        selectedTeam : {},
        currentStep: {},
        error: { status: false, message: ''}
      }
  }

  async componentDidMount() {
    //TODO: put data fetch this into main app component
    //enable cors via heroku
    const source = 'https://cors-anywhere.herokuapp.com/https://s3-eu-west-1.amazonaws.com/spx-development/contents'
    const usersData = await fetch(`${source}/users`)
    const teamsData = await fetch(`${source}/teams`)
    const jsonUsers = await usersData.json();
    const jsonTeams = await teamsData.json();
    this.setState({ users: jsonUsers})
    const cachedTeams = localStorage.getItem('teams')
    if(cachedTeams) {
      this.setState({ teams: JSON.parse(cachedTeams)})
    } else {
      this.setState({ teams: jsonTeams.map( _ =>{
        _.approvals = []
        return _
      }).sort((a,b) => { return a.name > b.name ? -1 : 1 }) })
    }
  };

  selectTeam (team) {
    this.setState({ selectedTeam: team})
  }
  
  selectApproval (step) {
    this.setState({ currentStep: step})
  }

  async updateTeams (newTeam) {
    await this.setState({ teams:  this.state.teams.filter( _ => _.id !== newTeam.id).concat(newTeam) })
    this.clearEdits()
    localStorage.setItem('teams', JSON.stringify(this.state.teams));
  }

  saveEdits () {
    if(!this.state.currentStep.id) {
      this.clearEdits()
      return
    }
    const team = this.state.selectedTeam
    const newTeam = { 
      ...team, 
      approvals: team.approvals.filter( _ => _.id !== this.state.currentStep.id).concat([this.state.currentStep])
    }
    this.updateTeams(newTeam)
  }


  deleteApproval (step) {
    const team = this.state.selectedTeam
    const newTeam = { 
      ...team,
      approvals: team.approvals.filter( _ => _.id !== step.id)
    }
    this.updateTeams(newTeam)
  }

  editApproval (value, attribute) {
    //TODO: add minimum validation (lower < upper, unique aprover, non-intersecting boundaries)
    if(value < 0) {
      return
    }
    const updatedStep = { ...this.state.currentStep, [attribute]: value  }
    this.setState({ currentStep: updatedStep})
  }

  clearEdits () {
    this.selectTeam({})
    this.setState({ currentStep: {}})
  }

  findUserbyId (id) {
    return this.state.users.find( _ => _.id === id) 
  }

  renderApproval (step) {
    const approver = this.findUserbyId(step.approver)
    return (
      <div className="approval-review" key={step.id}>
        <span>
        {`${approver.first_name} ${approver.last_name}`}: {step.lower} - {step.upper} € 
        </span>
          <button className="primary-action" onClick={() => { this.selectApproval(step) }}>Edit</button>
          <button className="secondary-action" onClick={() => { this.deleteApproval(step) }}>Delete</button>
      </div>
    )
  }

  renderEditApproval () {
    const step = this.state.currentStep
    const unavailableApprover = this.state.selectedTeam.approvals.map( _ => _.approver)
    const options = this.state.users.filter( _ => !unavailableApprover.includes(_.id))
    return (
      <React.Fragment>
        <div className="approval-create">
            <span className="edit-field">
              Approver: <select
                value={step.approver}  
                defaultValue={step.approver}
                onChange={(e) => this.editApproval(e.target.value, 'approver')}
              >
                {options.map( _ => 
                  <option 
                    key={_.id} 
                    value={_.id}>{`${_.first_name} ${_.last_name}`}
                  </option>
                )}
              </select>
            </span>
            <span className="edit-field">
              From : <input 
                type="number"
                min="0"  
                value={step.lower}  
                onChange={(e) => this.editApproval(e.target.value, 'lower')}/> €
            </span>
            <span className="edit-field">
            To:
            <input 
              type="number" 
              min={step.lower}
              value={step.upper}  
              onChange={(e) => this.editApproval(e.target.value, 'upper')}/>
            €
            </span>
        </div>
        {this.state.error.status === true ? <div className="error">{this.state.error.message}</div> : null}
      </React.Fragment>
    )
  }

  renderApprovalStepList() {
    const team = this.state.selectedTeam 
    const newStep = { 
      id: `${team.name}-${team.approvals.length}`, 
      approver: this.state.users[0].id, 
      upper: 1000,
      lower: 100 
    }
    return (
      <React.Fragment>
        {team.approvals.filter( _ => _.id !== this.state.currentStep.id).map( _ => this.renderApproval(_))}
        {this.state.currentStep.id  ? 
          this.renderEditApproval(newStep) :  
          <div className="add-step" onClick={() => { this.selectApproval(newStep)}}>
                + Add a threshold
          </div>
        }
    </React.Fragment>
    )
  }

  renderApprovalSchema (team) {
    return (
      <React.Fragment>
          <div className="title">
            Set up approvers 
            <button className="close-action" onClick={() => this.selectTeam({})}>X</button>
          </div>
          <div>Who can approve request of the team {team.name}?</div>
          {this.renderApprovalStepList()}
          <div className="controls">
              <button className="secondary-action" onClick={() => this.clearEdits()}>Cancel</button>  
              <button className="primary-action" onClick={() => this.saveEdits()}>Save Approval Flow</button>
          </div>
      </React.Fragment>
    )
  }

  renderUserAndApprovers (team) {
    const approversOfTeam = team.approvals.map( _ => this.findUserbyId(_.approver))
    const usersOfTeam = team.users.map( _ => this.findUserbyId(_)).splice(0,3)
    return (
      <React.Fragment>
         <div className="title"> 
            Team {team.name} 
             <button className="primary-action" onClick={() => this.selectTeam(team)}>Edit</button>
         </div>
         <div>
            Users: { team.users.length > 3 ? <span className="total-users">(3 out of {team.users.length})</span> : null} 
          { usersOfTeam.map( _ => <ul key={_.id}>{`${_.first_name} ${_.last_name}`}</ul>) }
          </div>
          <div>
            Approvers:
            { approversOfTeam.map( _ => <ul key={_.id}>{`${_.first_name} ${_.last_name}`}</ul>) }
            { team.approvals.length === 0 ? <ul>No approver yet</ul> : null}  
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
    const teams = this.state.teams.sort((a,b) => { return a.name > b.name ? -1 : 1})
    return (
      <div className="approval-manager">
        { teams.length ? teams.map( team => this.renderTeam(team)) : <span> No data loaded.</span> }
      </div>
    );
  }
}

export default ApprovalSchema;
