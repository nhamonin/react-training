import * as React from 'react';

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
    const languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python'];

    return (
      <main>
        <select
          onChange={(e) => this.updateLanguage(e.target.value)}
          selected={this.state.selectedLanguage}
        >
          {languages.map((language) => (
            <option key={language}>{language}</option>
          ))}
        </select>
        {JSON.stringify(this.state, null, 2)}
      </main>
    );
  }
}
