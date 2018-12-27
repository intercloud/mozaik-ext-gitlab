import React, { Component, PropTypes } from 'react';
import reactMixin                      from 'react-mixin';
import { ListenerMixin }               from 'reflux';
import Mozaik                          from 'mozaik/browser';


class PipelinesHistory extends Component {
    constructor(props) {
        super(props);

        this.state = {
            project: null,
            pipelines:  []
        };
    }

    getApiRequest() {
        const { project } = this.props;

        return {
            id:     `gitlab.projectPipelines.${project}`,
            params: { project }
        };
    }

    onApiData({ project, pipelines }) {
        this.setState({ project, pipelines });
    }

    render() {
        const { project, pipelines } = this.state;

        return (
            <div>
                <div className="widget__header">
                    pipelines history
                    <i className="fa fa-bars" />
                </div>
                <div className="widget__body">
                    {JSON.stringify(pipelines)}
                    {pipelines[0].status}
                </div>
            </div>
        );
    }
}

PipelinesHistory.displayName = 'PipelinesHistory';

PipelinesHistory.propTypes = {
    project: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]).isRequired
};

reactMixin(PipelinesHistory.prototype, ListenerMixin);
reactMixin(PipelinesHistory.prototype, Mozaik.Mixin.ApiConsumer);


export default PipelinesHistory;
