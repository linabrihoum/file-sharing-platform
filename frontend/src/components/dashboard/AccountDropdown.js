import React from 'react';
import {
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';

export default class AccountDropdown extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                    Account
                </DropdownToggle>
                <DropdownMenu right>
                    <DropdownItem>
                        Account Options
                    </DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem>
                        Sign Out
                    </DropdownItem>
                </DropdownMenu>
            </UncontrolledDropdown>
        );
    }
}