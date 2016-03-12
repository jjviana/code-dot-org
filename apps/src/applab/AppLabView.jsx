/** @file Top-level view for App Lab */
'use strict';

var connect = require('react-redux').connect;
var PlaySpaceHeader = require('./PlaySpaceHeader.jsx');
var ProtectedStatefulDiv = require('../templates/ProtectedStatefulDiv.jsx');
var ConnectedStudioAppWrapper = require('./ConnectedStudioAppWrapper.jsx');

/**
 * Top-level React wrapper for App Lab.
 */
var AppLabView = React.createClass({
  propTypes: {
    isEditingProject: React.PropTypes.bool.isRequired,
    isReadOnlyWorkspace: React.PropTypes.bool.isRequired,

    screenIds: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
    onViewDataButton: React.PropTypes.func.isRequired,
    onScreenCreate: React.PropTypes.func.isRequired,

    renderCodeWorkspace: React.PropTypes.func.isRequired,
    renderVisualizationColumn: React.PropTypes.func.isRequired,
    onMount: React.PropTypes.func.isRequired
  },

  componentDidMount: function () {
    this.props.onMount();
  },

  render: function () {
    var playSpaceHeader;
    if (!this.props.isReadOnlyWorkspace) {
      playSpaceHeader = <PlaySpaceHeader
          isEditingProject={this.props.isEditingProject}
          screenIds={this.props.screenIds}
          onViewDataButton={this.props.onViewDataButton}
          onScreenCreate={this.props.onScreenCreate} />;
    }

    return (
      <ConnectedStudioAppWrapper>
        <div id="visualizationColumn">
          {playSpaceHeader}
          <ProtectedStatefulDiv renderContents={this.props.renderVisualizationColumn} />
        </div>
        <ProtectedStatefulDiv id="visualizationResizeBar" className="fa fa-ellipsis-v" />
        <ProtectedStatefulDiv id="codeWorkspace">
          <ProtectedStatefulDiv id="codeWorkspaceWrapper" renderContents={this.props.renderCodeWorkspace}/>
          {!this.props.isReadOnlyWorkspace && <ProtectedStatefulDiv id="designWorkspace" style={{display: 'none'}} />}
        </ProtectedStatefulDiv>
      </ConnectedStudioAppWrapper>
    );
  }
});
module.exports = connect(function propsFromState(state) {
  return {
    isReadOnlyWorkspace: state.level.isReadOnlyWorkspace
  };
})(AppLabView);
