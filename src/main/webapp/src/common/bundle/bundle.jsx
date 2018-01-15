import React,{Component} from 'react'
require('es6-promise').polyfill();

export default class Bundle extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         mod: null
    //     };
    // }

    state = {
        mod: null
    }

    componentWillMount() {
        this.load(this.props)
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.load !== this.props.load) {
            this.load(nextProps)
        }
    }

    load(props) {
        this.setState({
            mod: null
        });
        // props.load((mod) => {
        //     this.setState({
        //         mod: mod.default ? mod.default : mod
        //     });
        // });

        //注意这里，使用Promise对象; mod.default导出默认
        props.load().then((mod) => {
            this.setState({
                mod: mod.default ? mod.default : mod
            });
        });
    }

    render() {
        return this.state.mod ? this.props.children(this.state.mod) : null;
    }
}
