import * as React from 'react';
import PropTypes from 'prop-types';

function LanguagesNav({ selected, onUpdateLanguage }) {
  const languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python'];

  return (
    <select
      className="languages-nav"
      value={selected}
      onChange={(e) => onUpdateLanguage(e.target.value)}
    >
      {languages.map((language) => (
        <option key={language}>{language}</option>
      ))}
    </select>
  );
}

LanguagesNav.propTypes = {
  selected: PropTypes.string.isRequired,
  onUpdateLanguage: PropTypes.func.isRequired,
};

export default class Popular extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedLanguage: 'All',
    };

    this.updateLanguage = (language) => {
      this.setState({
        selectedLanguage: language,
      });
    };
  }
  render() {
    return (
      <main>
        <LanguagesNav
          selected={this.state.selectedLanguage}
          onUpdateLanguage={this.updateLanguage}
        />
        {JSON.stringify(this.state, null, 2)}
      </main>
    );
  }
}
