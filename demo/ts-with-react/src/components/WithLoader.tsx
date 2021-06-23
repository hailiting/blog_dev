import React from "react";
import axios from "axios";
interface ILoaderState {
  data: any;
  isLoading: boolean;
}
interface ILoaderProps {
  data: any;
}
const WithLoader = <P extends ILoaderState>(WrappedComponent: React.ComponentType<P>, url: string) => {
  return class LoaderComponent extends React.Component<Partial<ILoaderProps>, ILoaderState>{
    constructor(props: any) {
      super(props);
      this.state = {
        data: null,
        isLoading: false,
      }
    }
    componentDidMount() {
      this.setState({
        isLoading: true,
      })
      axios.get(url).then((result: any) => {
        this.setState({
          data: result.data,
          isLoading: false,
        })
      })
    }
    render() {
      const { data, isLoading } = this.state;
      return (
        <>
          {
            (isLoading || !data) ? <p>data is Loading</p> :
              <WrappedComponent {...this.props as P} data={data} />
          }
        </>
      )
    }
  }
}
export default WithLoader;