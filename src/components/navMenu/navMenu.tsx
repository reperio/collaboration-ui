import React, { CSSProperties } from "react";
import { Navbar } from "@reperio/ui-components";
import { LinkContainer } from "react-router-bootstrap";
import { NavItem } from "react-bootstrap";
import { State } from "../../store/state";
import { Dispatch, connect } from "react-redux";
import { bindActionCreators } from "redux";

export interface NavMenuProps { }

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapActionsToProps>;
type AllProps = NavMenuProps & StateProps & DispatchProps;

export class NavMenu extends React.Component<AllProps>{
    render() {
        return (
            <div className="r-nav-menu left-nav">
                <Navbar applicationName="Collaboration">
                    <LinkContainer to="/home">
                        <NavItem>
                            Home
                    </NavItem>
                    </LinkContainer>
                    {this.props.authSession.isAuthenticated ?
                        <LinkContainer to="/private">
                            <NavItem>
                                Private
                        </NavItem>
                        </LinkContainer>
                        : null
                    }
                </Navbar>
            </div>
        )
    };
}

function mapStateToProps(state: State) {
    return {
        authSession: state.authSession,
        permissions: state.authSession.userPermissions,
        location: (state as any).router.location.pathname,
    };
}

function mapActionsToProps(dispatch: Dispatch<State>) {
    return {
        actions: bindActionCreators({}, dispatch)
    }
}

export const ConnectedNavMenu = connect<StateProps, DispatchProps, NavMenuProps>(mapStateToProps, mapActionsToProps)(NavMenu);