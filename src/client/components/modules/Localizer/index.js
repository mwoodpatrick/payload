import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import Arrow from '../../graphics/Arrow';
import qs from 'qs';

import './index.scss';

const mapState = state => ({
  config: state.common.config,
  locale: state.common.locale,
  searchParams: state.common.searchParams
})

class Localizer extends Component {

  constructor() {
    super();

    this.state = {
      active: false
    }
  }

  toggleActive = () =>
    this.setState({ active: !this.state.active })

  render() {
    let locales = [];

    if (this.props.config && this.props.config.localization) locales = this.props.config.localization.locales;

    if (locales.length <= 1) return null;

    return (
      <div className={`localizer${this.state.active ? ' active' : ''}`}>
        <button onClick={this.toggleActive} className="current-locale">
          <Arrow />{this.props.locale}
        </button>
        <ul>
          {locales.map((locale, i) => {

            if (locale === this.props.locale) return null;

            const newParams = {
              ...this.props.searchParams,
              locale
            };

            const search = qs.stringify(newParams);

            return (
              <li key={i}>
                <Link to={{ search }} onClick={this.toggleActive}>
                  {locale}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    )
  }
}

export default withRouter(connect(mapState)(Localizer));