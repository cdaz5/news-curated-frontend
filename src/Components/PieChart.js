import React, {Component} from "react"
import PieChart from "react-svg-piechart"

export default class PieOhMy extends Component {
    constructor() {
        super()

        this.state = {
            expandedSector: null,
        }

        this.handleMouseEnterOnSector = this.handleMouseEnterOnSector.bind(this)
    }

    handleMouseEnterOnSector(sector) {
        this.setState({expandedSector: sector})
    }

    render() {
        const {expandedSector} = this.state

        return (
            <div>
                <PieChart
                    lineWidth={20}
                    data={ this.props.data }
                    expandedSector={expandedSector}
                    onSectorHover={this.handleMouseEnterOnSector}
                    expandOnHover
                    shrinkOnTouchEnd
                />
                <div className='pieChart'>
                {
                    this.props.data.map((element, i) => (
                        <div key={i}>
                            <span style={{background: element.color}}></span>
                            <span style={{fontSize: this.state.expandedSector === i ? 'xx-large' : null}}>
                                {element.label} : {element.value}
                            </span>
                        </div>
                    ))
                }
                </div>
            </div>
        )
    }
}
