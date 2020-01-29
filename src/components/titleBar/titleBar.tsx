import React from "react";
import { ApplicationMenuItem, TitleBar as ReperioTitleBar } from "@reperio/ui-components";
import { State } from "../../store/state";
import { bindActionCreators, Dispatch } from "redux";
import { connect } from "react-redux";
import { TitleBarHeader } from "./titleBarHeader";
import { logout, selectOrganization, getUserOrganizations } from "../../actions/authSessionActions";
import { Organization } from "@reperio/core-connector";

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapActionsToProps>;
type AllProps = StateProps & DispatchProps;

export class TitleBar extends React.Component<AllProps> {
    logout() {
        this.props.actions.logout();
    }

    getUserOrganizations() {
        const user = this.props.authSession.isAuthenticated ? this.props.authSession.user : null;
        if (user) {
            this.props.actions.getUserOrganizations(user);
        }
    }

    onSelectOrganization(organization: Organization) {
        this.props.actions.selectOrganization(organization, true);
    }

    render() {
        const profile = this.props.authSession.isAuthenticated ? {
            initials: `${this.props.authSession.user.firstName.charAt(0).toUpperCase()}${this.props.authSession.user.lastName.charAt(0).toUpperCase()}`,
            name: `${this.props.authSession.user.firstName} ${this.props.authSession.user.lastName}`,
            email: `${this.props.authSession.user.primaryEmailAddress}`,
            onLogout: () => this.logout()
        } : null;

        if (!this.props.authSession.organizations) {
            this.getUserOrganizations();
        }

        const selectedOrganization = this.props.authSession.isAuthenticated ? this.props.authSession.selectedOrganization : null;

        return (
            <>
                <ReperioTitleBar
                    title={<TitleBarHeader />}
                    isAuthenticated={this.props.authSession.isAuthenticated}
                    profile={profile}
                    organizations={[]}
                    selectedOrganization={null}
                    onSelectOrganization={this.onSelectOrganization.bind(this)}
                    applicationMenuItems={[
                        <ApplicationMenuItem key="1" name="Example1" label="Example" />,
                        <ApplicationMenuItem key="2" name="Exmaple2" label="Example 2" />,
                        <ApplicationMenuItem key="3" name="Nic Cage" image="https://images-na.ssl-images-amazon.com/images/I/61Wo915nuTL._SX425_.jpg" />,
                    ]}
                />
            </>
        );
    }
}

function mapStateToProps(state: State) {
    return {
        authSession: state.authSession,
        location: (state as any).router.location.pathname // hack to make this component update when route changes
    };
}

function mapActionsToProps(dispatch: Dispatch<State>) {
    return {
        actions: bindActionCreators({ logout, selectOrganization, getUserOrganizations }, dispatch)
    };
}

export const ConnectedTitleBar = connect<StateProps, DispatchProps, {}>(mapStateToProps, mapActionsToProps)(TitleBar);