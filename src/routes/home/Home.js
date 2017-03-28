/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Home.css';
import MarkdownEditor from '../../components/MarkdownEditor'

class Home extends React.Component {
  static propTypes = {
    news: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.string.isRequired,
      link: PropTypes.string.isRequired,
      content: PropTypes.string,
    })),
  };


  render() {
    return (
      <div className={s.root}>
        <div className={s.container}>
          <h1>Codex</h1>
          <MarkdownEditor/>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Home);