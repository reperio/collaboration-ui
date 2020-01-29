import React from 'react';
import { bindActionCreators, Dispatch } from "redux";
import { connect } from "react-redux";
import { AuthConnector } from "@reperio/core-connector";

import { State } from "../../store/state";
import { coreAuthUiIFrameURL } from "../../config";
import { setLoggedInUser } from "../../actions/authSessionActions";
import { ConnectedNavMenu } from "../navMenu/navMenu";
import { ConnectedTitleBar } from "../titleBar/titleBar";
import { Routes } from "../routes/routes";
import { coreApiService } from '../../services/coreApiService';
import { BlockingComponent } from '@reperio/ui-components';

interface AppContainerProps { }
type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapActionsToProps>;
type AllProps = AppContainerProps & StateProps & DispatchProps;

export class AppContainer extends React.Component<AllProps> {
    render() {
        return (
            <AuthConnector url={coreAuthUiIFrameURL}
                reperioCoreConnector={coreApiService}
                setLoggedInUser={user => this.props.actions.setLoggedInUser(user, true)}
                redirectToLogin={false}>
                <BlockingComponent readyToLoad={this.props.authSession.isAuthInitialized}>
                    <div className="app-main">
                        <ConnectedNavMenu />
                        <div className="page-container">
                            <ConnectedTitleBar />
                            <div className="app-content">
                                <div className="r-wrapper-container">
                                    <Routes />
                                </div>
                            </div>
                        </div>
                    </div>
                </BlockingComponent>
            </AuthConnector>
        );
    }
}

function mapStateToProps(state: State) {
    return {
        authSession: state.authSession,
        location: (state as any).router.location.pathname, // hack to make this component update when route changes
        devicesDropdownOpen: true
    };
}

function mapActionsToProps(dispatch: Dispatch<State>) {
    return {
        actions: bindActionCreators({ setLoggedInUser }, dispatch)
    }
}

export const ConnectedAppContainer = connect<StateProps, DispatchProps, AppContainerProps>(mapStateToProps, mapActionsToProps)(AppContainer);