import React from 'react';
import Icon from '@console/bluemix-components-react/dist/components/Icon';
// import Dropdown from '@console/bluemix-components-react/dist/components/Dropdown';
// import DropdownItem from '@console/bluemix-components-react/dist/components/DropdownItem';
import Page from '../internal/Page';
import Packages from '../../package.json';

class ComponentStatus extends React.Component {
  renderItems = (currentItem, readyIcon, underReviewIcon, deprecatedIcon, notApplicableIcon) => {
    let status;
    if (currentItem.status === 0) {
      status = readyIcon;
    } else if (currentItem.status === 1) {
      status = underReviewIcon;
    } else if (currentItem.status === 2) {
      status = deprecatedIcon;
    } else {
      status = notApplicableIcon;
    }
    return (
      <tr key={currentItem.item}>
        <td>{currentItem.item}</td>
        <td>{currentItem.added}</td>
        <td>{status}</td>
      </tr>
    );
  }

  render() {
    const readyIcon = (
      <div className="component-status__icon ready">
        <Icon fill="#fffff" width="8" height="8" name="checkmark" description="ready status" />
      </div>
    );
    const underReviewIcon = (
      <div className="component-status__icon under-review">
        <span>!</span>
      </div>
    );
    const deprecatedIcon = (
      <div className="component-status__icon deprecated">
        <span>/</span>
      </div>
    );
    const notApplicableIcon = (
      <div className="component-status__icon not-applicable">
        <span>-</span>
      </div>
    );
    const currentVersion = `Current version: ${Packages.dependencies['@console/bluemix-components']} (March 13, 2017)`;
    const componentStatus = require('../data/component-status.json'); // eslint-disable-line
    const content = (
      <div className="page component-status-page">
        <div className="component-status">
          {/*<Dropdown className="bx--global-light-ui component-status__dropdown" value="7.0.0">
            <DropdownItem itemText="7.0.0" value="7.0.0" />
          </Dropdown>*/}
          <ul className="component-status__icon-list">
            <li>
              {readyIcon}
              <p>Ready</p>
            </li>
            <li>
              {underReviewIcon}
              <p>Under review</p>
            </li>
            <li>
              {deprecatedIcon}
              <p>Deprecated</p>
            </li>
            <li>
              {notApplicableIcon}
              <p>Not applicable</p>
            </li>
          </ul>
        </div>
        <table>
          <thead>
            <tr>
              <th>Item</th>
              <th>Added</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(componentStatus.items).map(item => {
              return this.renderItems(componentStatus.items[item], readyIcon, underReviewIcon, deprecatedIcon, notApplicableIcon);
            })}
          </tbody>
        </table>
        <div className="component-status__description">
          <h2>Tag descriptions</h2>
            <table>
              <thead>
                <tr>
                  <th>Tag</th>
                  <th>Name</th>
                  <th>Definitions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{readyIcon}</td>
                  <td>Ready</td>
                  <td>The component is dev and design ready.</td>
                </tr>
                <tr>
                  <td>{underReviewIcon}</td>
                  <td>Under review</td>
                  <td>Indicates that a component’s design, code, or usage is being re-examined. This means in the near future either changes are coming to the component or it will be deprecated for a new version.</td>
                </tr>
                <tr>
                  <td>{deprecatedIcon}</td>
                  <td>Deprecated</td>
                  <td>Deprecated components have either been completely replaced by new components or are no longer being supported in the component library.</td>
                </tr>
                <tr>
                  <td>{notApplicableIcon}</td>
                  <td>Not applicable</td>
                  <td>Component was not available in this version of the library</td>
                </tr>
                <tr>
                  <td>
                    <span className="bx--tag bx--tag--community">New</span>
                  </td>
                  <td></td>
                  <td>This component is brand new to our library.</td>
                </tr>
                <tr>
                  <td>
                    <span className="bx--tag bx--tag--third-party">Updated</span>
                  </td>
                  <td></td>
                  <td>Applied only to existing components after they have been under review, tweaked, and re-released to the design system site.</td>
                </tr>
              </tbody>
            </table>
        </div>
      </div>
    );
    return (
      <Page label={currentVersion} title="Component Status" content={content}>
        {content}
      </Page>
    );
  }
}

export default ComponentStatus;