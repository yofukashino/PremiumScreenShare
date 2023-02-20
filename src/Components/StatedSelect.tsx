import { common, components } from "replugged";
import * as Utils from "../lib/utils";
import * as Types from "../types";
const { React } = common;
const { SelectItem } = components;

class StatedSelectWithProps extends React.Component {
  props: Types.StatedSelectItemProps;
  state: {
    value: string;
  };
}
export class StatedSelectItem extends StatedSelectWithProps {
  constructor(props: Types.StatedSelectItemProps) {
    super(props);
    this.state = { value: props.value };
  }
  render() {
    return (
      <SelectItem
        {...{
          onChange: (value) => {
            this.setState({ value });
            this.props.onChange(value);
          },
          value: this.state.value,
          ...Utils.filterOutObjectKey(this.props, ["onChange", "value", "title"]),
        }}>
        {this.props.title}
      </SelectItem>
    );
  }
}
