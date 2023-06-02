import React from "react";

interface IMainState {
}

export class Main extends React.Component<any, IMainState> {
  private _unsubscribe: any;

  constructor(props: any) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  render() {
    return (
      <>
      </>
    );
  }
}
