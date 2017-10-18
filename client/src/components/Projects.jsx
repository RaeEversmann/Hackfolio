import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Grommet Components
import Tiles from 'grommet/components/Tiles';
import Tip from 'grommet/components/Tip';
import Box from 'grommet/components/Box';
import Button from 'grommet/components/Button';

// Custom Components
import ProjectCard from './ProjectCard';
import AddProject from './AddProject';
import ProfileBox from './ProfileBox';
import * as UserAction from '../actions/UserActions';
import AddProjectTile from './AddProjectTile';
import ReorderProjects from './ReorderProjects';

import '../styles/Projects.scss';

class Projects extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hideProjectModal: true,
      hideReorderModal: true,
      help: false
    };

    this.toggleProjectModal = this.toggleProjectModal.bind(this);
    this.toggleReorderModal = this.toggleReorderModal.bind(this);
  }
  componentWillMount() {
    setTimeout(() => {
      this.setState({
        help: true
      });
    }, 500);
  }

  toggleProjectModal() {
    this.setState({
      hideProjectModal: !this.state.hideProjectModal
    });
  }

  toggleReorderModal() {
    this.setState({
      hideReorderModal: !this.state.hideReorderModal
    });
  }

  render() {
    const projects = this.props.userProfile.projects.map((project, index) => {
      const i = index;
      return (
        <ProjectCard key={i} project={project} />
      );
    });
    return (
      <div className="Projects">
        <Box
          align="end"
        >
          <Button
            primary
            onClick={this.toggleReorderModal}
            label="Reorder Projects"
          />
        </Box>
        <Tiles
          flush={false}
          justify="around"
        >
          <ProfileBox />
          {projects}
          <AddProjectTile toggleProjectModal={this.toggleProjectModal} />
        </Tiles>
        <AddProject
          toggleProjectModal={this.toggleProjectModal}
          hideProjectModal={this.state.hideProjectModal}
        />
        <ReorderProjects
          toggleReorderModal={this.toggleReorderModal}
          hideReorderModal={this.state.hideReorderModal}
        />
        {this.props.help === 'Project' && this.state.help ?
          <Tip
            target="AddProjectBtn"
            onClose={this.props.displayHelp}
          >
            You can add projects to show off here
          </Tip> : <div />
        }
      </div>
    );
  }
}

Projects.defaultProps = {
  userProfile: {},
  help: 'off',
  displayHelp: () => {}
};

Projects.propTypes = {
  userProfile: PropTypes.shape({ projects: PropTypes.array }),
  help: PropTypes.string,
  displayHelp: PropTypes.func
};

function mapStateToProps(state) {
  return {
    userProfile: state.userProfile,
    help: state.help.text
  };
}

function mapDispatchToProps(dispatch) {
  return {
    displayHelp: () => { dispatch(UserAction.help('off')); }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Projects);
