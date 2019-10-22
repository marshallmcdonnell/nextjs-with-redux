import React from "react";
import { connect } from "react-redux";
import { startClock, serverRenderClock } from "../store";
import Examples from "../components/examples";
import { JsonForms } from "@jsonforms/react";
import schema from "../schemas/schema";
import uischema from "../schemas/uischema";
import { getSchema, Actions } from "@jsonforms/core";

class Index extends React.Component {
  static getInitialProps({ reduxStore, req }) {
    const isServer = !!req;
    // DISPATCH ACTIONS HERE ONLY WITH `reduxStore.dispatch`
    reduxStore.dispatch(serverRenderClock(isServer));
    console.log("reduxStore:", reduxStore.getState());

    var myschemas = getSchema(reduxStore.getState());
    console.log("Myschemas:", myschemas);
    /*if (myschemas.hasOwnProperty("properties")) {
      myschemas.properties["path"] = schema;
    } else {
      // Initialize store
      const initSchema = {
        type: "object",
        properties: {
          path: myschemas
        }
      };
      reduxStore.dispatch(Actions.init({}, initSchema));
    }
    */

    return { reduxStore };
  }

  constructor(props) {
    super(props);

    const data = {
      name: "Send email to Adrian",
      description: "Confirm if you have passed the subject\nHereby ...",
      done: true,
      recurrence: "Daily",
      rating: 3
    };

    this.store = props.reduxStore;

    this.display = <JsonForms schema={schema} path="path" />;

    this.handleButtonClick = this.handleButtonClick.bind(this);
  }

  componentDidMount() {
    // DISPATCH ACTIONS HERE FROM `mapDispatchToProps`
    // TO TICK THE CLOCK
    this.timer = setInterval(() => this.props.startClock(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  handleButtonClick() {
    console.log("Redux store:", this.store);
  }

  render() {
    return (
      <div>
        <Examples />
        <button onClick={this.handleButtonClick}>Click for store info</button>
        {this.display}
      </div>
    );
  }
}
const mapDispatchToProps = { startClock };
export default connect(
  null,
  mapDispatchToProps
)(Index);
