import React, { Component, PropTypes } from 'react';
import reactMixin                      from 'react-mixin';
import { ListenerMixin }               from 'reflux';
import Mozaik                          from 'mozaik/browser';
import MergeRequestItem                          from './MergeRequest';


class MergeRequests extends Component {
    constructor(props) {
        super(props);

        this.state = {
            mergeRequests:  [],
            groups:  [],
            query: {}
        };
    }

    getApiRequest() {
        const { groups, query } = this.props;

        console.log(query)

        return {
            id:     `gitlab.groupMergeRequests.${ groups }`,
            params: { groups, query }
        };
    }

    onApiData({ groups, mergeRequests }) {

        console.log(mergeRequests.flat(1))
        console.log([].concat.apply([], mergeRequests))
        this.setState({ groups, mergeRequests: [].concat.apply([], mergeRequests) });
    }

    render() {
        const { groups, mergeRequests } = this.state;

        return (
            <div>
                <div className="widget__header">
                    MergeRequests
                    <span className="widget__header__count">
                        {mergeRequests.length}
                    </span>
                    <i className="fa fa-code-fork" />
                </div>
                <div className="widget__body">
                    {mergeRequests.map(mr => (<MergeRequestItem mergeRequest={mr}/>))}
                </div>
            </div>
        );
    }
}

MergeRequests.propTypes = {
    groups: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]).isRequired
};

reactMixin(MergeRequests.prototype, ListenerMixin);
reactMixin(MergeRequests.prototype, Mozaik.Mixin.ApiConsumer);


export default MergeRequests;
