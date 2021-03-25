import React from 'react';
import { PrivateRoute } from '../_routes/PrivateRoute'

class Layout extends Component {
    constructor(props) {
        super(props);
        this.state = ({ isToggleClass: false });

        if ((props !== undefined && props.user !== null && props.user !== undefined) || (userCookie !== null)) {
            validUser = true;
            user = (props === undefined ||  props.user === undefined || props.user.user === null || props.user.user === undefined) ? (userCookie === null ?
                history.push('/login') : userCookie) : props;
        }
        else {
            history.push('/login');
        }
    }
    render() {
        return(
            <>
                <div className="wrapper">
                    <nav id="app-aside" className={this.state.isToggleClass ? "app-aside has-open" : "app-aside"}>
                        <LayoutLeftMenu  isToggleClass={this.state.isToggleClass} onToggle={this.onToggle}/>
                    </nav>
                </div>
                <div id="content">
                    <Router history={history}>
                    <>
                        <Switch>
                            <PrivateRoute path="/NewQuest" component={NewQuest} />
                            <PrivateRoute path="/" component={home}></PrivateRoute>
                        </Switch>
                    </>
                    </Router>
                </div>
                <Footer />
            </>
        )
    }
}

export default Layout;