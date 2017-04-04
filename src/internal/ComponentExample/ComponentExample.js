import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import classnames from 'classnames';
import CodeExample from '../CodeExample/CodeExample';
import svgSprite from 'raw!../../assets/bluemix-icons.svg'; // eslint-disable-line

class ComponentExample extends Component {
  static propTypes = {
    htmlFile: PropTypes.string,
    component: PropTypes.string,
    variation: PropTypes.string
  }

  render() {
    const {
      htmlFile,
      component,
      variation,
    } = this.props;

    const classNames = classnames({
      'component-example__live--rendered': true,
      [`${component}`]: true,
    });

    const lightUIclassnames = classnames({
      'component-example': true,
      'bx--global-light-ui': component === 'tabs'
    });

    const componentLink = (component === 'detail-page-header') ?
      `/components/${variation}/live` :
      `/components/${component}/live`;

    return (
      <div className={lightUIclassnames}>
        <div className="svg--sprite" aria-hidden="true" dangerouslySetInnerHTML={{ __html: svgSprite }} />
        <div className="component-example__live">
          <div className={classNames}>
            <div dangerouslySetInnerHTML={{ __html: htmlFile }} />
          </div>
          <Link
            className="component-example__view-full-render"
            to={componentLink}
          >
            View full render
          </Link>
        </div>
        <CodeExample htmlFile={htmlFile} />
      </div>
    );
  }
}

export default ComponentExample;
