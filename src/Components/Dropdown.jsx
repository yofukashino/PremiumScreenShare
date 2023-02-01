import { common, components } from "replugged";
const { React } = common;
const { Text, Divider } = components;
import { Select } from "../lib/requiredModules.jsx";
export class Dropdown extends React.Component {
  render() {
    return (
      <div>
        <div
          {...{
            style: {
              padding: "0px 0px 10px 0px",
            },
          }}>
          <Text.H3>{this.props.name}</Text.H3>
        </div>
        <Select {...this.props} />
        <div
          {...{
            style: {
              padding: "10px 0px 0px 0px",
            },
          }}>
          <Text.Normal>{this.props.note}</Text.Normal>
        </div>
        <Divider
          {...{
            style: {
              padding: "10px 0px 20px 0px",
            },
          }}
        />
      </div>
    );
  }
}
