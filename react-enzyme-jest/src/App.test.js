import React from "react";
import ReactDOM from "react-dom";
import App, { Link } from "./App";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import toJson from "enzyme-to-json";

configure({ adapter: new Adapter() });

describe("<App/>", () => {
  const wrapper = shallow(<App />);
  it("h1 contains correct text", () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find("h1").text()).toBe("Welcome to React");
  });

  it("matches the snapshot", () => {
    const tree = shallow(<App />);
    expect(toJson(tree)).toMatchSnapshot();
  });
});

describe("<Link/>", () => {
  it("link component accepts address prop", () => {
    const warraper = shallow(<Link address="www.google.com" />);
    expect(warraper.instance().props.address).toBe("www.google.com");
  });

  it("a tag node renders href correctly", () => {
    const warraper = shallow(<Link address="www.google.com" />);
    expect(warraper.props().href).toBe("www.google.com");
  });
});
