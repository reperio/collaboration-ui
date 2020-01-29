import React from 'react';
import { connect } from "react-redux";
import { State } from "../../store/state";
import { bindActionCreators, Dispatch } from "redux";
import { Wrapper } from "@reperio/ui-components";

interface HomeContainerProps { }

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapActionsToProps>;
type AllProps = HomeContainerProps & StateProps & DispatchProps;

export class HomeContainer extends React.Component<AllProps> {
    render() {
        return (
            <Wrapper flexColumnDirection={true}>
                <p>home</p>
            </Wrapper>
        );
    }
}

function mapStateToProps(state: State) {
    return {
        authSession: state.authSession,
    };
}

function mapActionsToProps(dispatch: Dispatch<State>) {
    const actionList = {
    };
    return {
        actions: bindActionCreators(actionList, dispatch)
    };
}

export const ConnectedHomeContainer = connect<StateProps, DispatchProps, HomeContainerProps>(mapStateToProps, mapActionsToProps)(HomeContainer);