import React from 'react'
import { Route, Switch } from "react-router-dom";

const TitleBarHeaderDisplay: React.SFC<{}> = (props) => (<div>{props.children}</div>);

const TitleBarHeader = () => (
    <Switch>
        <Route path="/home" component={() => <TitleBarHeaderDisplay>Collaboration</TitleBarHeaderDisplay>} />
        <Route path="/home" component={() => <TitleBarHeaderDisplay>Home</TitleBarHeaderDisplay>} />
        <Route path="/private" component={() => <TitleBarHeaderDisplay>Private</TitleBarHeaderDisplay>} />
    </Switch>
);

export { TitleBarHeader };